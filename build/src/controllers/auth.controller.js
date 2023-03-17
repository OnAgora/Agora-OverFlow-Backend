"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyEmailHandler = exports.logoutUserHandler = exports.refreshAccessTokenHandler = exports.loginUserHandler = exports.registerUserHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = require("../services/user.service");
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("config"));
const appError_1 = __importDefault(require("../utilities/appError"));
const connectRedis_1 = __importDefault(require("../utilities/connectRedis"));
const jwt_1 = require("../utilities/jwt");
const email_1 = __importDefault(require("../utilities/email"));
const cookiesOptions = {
    httpOnly: true,
    sameSite: 'lax',
};
if (process.env.NODE_ENV === 'production')
    cookiesOptions.secure = true;
const accessTokenCookieOptions = Object.assign(Object.assign({}, cookiesOptions), { expires: new Date(Date.now() + config_1.default.get('accessTokenExpiresIn') * 60 * 1000), maxAge: config_1.default.get('accessTokenExpiresIn') * 60 * 1000 });
const refreshTokenCookieOptions = Object.assign(Object.assign({}, cookiesOptions), { expires: new Date(Date.now() + config_1.default.get('refreshTokenExpiresIn') * 60 * 1000), maxAge: config_1.default.get('refreshTokenExpiresIn') * 60 * 1000 });
const registerUserHandler = (req, // The Request interface of ExpressJs is generic so I provided it with the inferred type of the registerUserSchema to assist Typescript to give us better IntelliSense.
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 12);
        const verifyCode = crypto_1.default.randomBytes(32).toString('hex');
        const verificationCode = crypto_1.default
            .createHash('sha256')
            .update(verifyCode)
            .digest('hex');
        const user = yield (0, user_service_1.createUser)({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            verificationCode,
        });
        // Redirecting the browser to the new endpoint
        const redirectUrl = `${config_1.default.get('origin')}/api/auth/verifyemail/${verifyCode}`; // Change Origin to app's url for production.
        try {
            yield new email_1.default(user, redirectUrl).sendVerificationCode();
            yield (0, user_service_1.updateUser)({ id: user.id }, { verificationCode });
            res.status(201).json({
                status: 'success',
                message: 'An email with a verification code has been sent to your email',
            });
        }
        catch (error) {
            console.log(error);
            yield (0, user_service_1.updateUser)({ id: user.id }, { verificationCode: null });
            return res.status(500).json({
                status: 'error',
                message: 'There was an error sending email, please try again',
            });
        }
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Email already exist, please use another email address',
                });
            }
        }
        next(err);
    }
});
exports.registerUserHandler = registerUserHandler;
const loginUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_service_1.findUniqueUser)({ email: email.toLowerCase() }, { id: true, email: true, verified: true, password: true });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        // Check if user is verified
        if (!user.verified) {
            return next(new appError_1.default(401, 'You are not verified, please verify your email to login'));
        }
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        // Sign Tokens
        const { access_token, refresh_token } = yield (0, user_service_1.signTokens)(user);
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        res.cookie('logged_in', true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUserHandler = loginUserHandler;
const refreshAccessTokenHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refresh_token = req.cookies.refresh_token;
        const message = 'Could not refresh access token';
        if (!refresh_token) {
            return next(new appError_1.default(403, message));
        }
        // Validate refresh token
        const decoded = (0, jwt_1.verifyJwt)(refresh_token, 'refreshTokenPublicKey');
        if (!decoded) {
            return next(new appError_1.default(403, message));
        }
        // Check if user has a valid session
        const session = yield connectRedis_1.default.get(decoded.sub);
        if (!session) {
            return next(new appError_1.default(403, message));
        }
        // Check if user still exist
        const user = yield (0, user_service_1.findUniqueUser)({ id: JSON.parse(session).id });
        if (!user) {
            return next(new appError_1.default(403, message));
        }
        // Sign new access token
        const access_token = (0, jwt_1.signJwt)({ sub: user.id }, 'accessTokenPrivateKey', {
            expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`,
        });
        //  Add Cookies
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('logged_in', true, Object.assign(Object.assign({}, accessTokenCookieOptions), { httpOnly: false }));
        //  Send response
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
function logout(res) {
    res.cookie('access_token', '', { maxAge: -1 });
    res.cookie('refresh_token', '', { maxAge: -1 });
    res.cookie('logged_in', '', { maxAge: -1 });
}
const logoutUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectRedis_1.default.del(res.locals.user.id);
        logout(res);
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logoutUserHandler = logoutUserHandler;
// To verify the verification code, we need to define a controller that will validate
// the code and update the user’s credentials in the PostgreSQL database.
const verifyEmailHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convert the code to a hashed one with the crypto module.
        const verificationCode = crypto_1.default
            .createHash('sha256')
            .update(req.params.verificationCode)
            .digest('hex');
        //  Query to find the user belonging to the hashed verification code.
        //  Update the verified column to true and verificationCode to null if the user exists in the database.
        const user = yield (0, user_service_1.updateUser)({ verificationCode }, { verified: true, verificationCode: null }, { email: true });
        // If the user doesn’t exist in the database then it means the verification code provided is invalid.
        if (!user) {
            return next(new appError_1.default(401, 'Could not verify email'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Email verified successfully',
        });
    }
    catch (err) {
        if (err.code === 'P2025') {
            return res.status(403).json({
                status: 'fail',
                message: `Verification code is invalid or user doesn't exist`,
            });
        }
        next(err);
    }
});
exports.verifyEmailHandler = verifyEmailHandler;
const forgotPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the user from the collection using the email from the request body
        // Call the findUser() service to check if a user with that email exists in the database.
        const user = yield (0, user_service_1.findUser)({ email: req.body.email.toLowerCase() });
        const message = 'You will receive a reset email if user with that email exist';
        if (!user) {
            return res.status(200).json({
                status: 'success',
                message,
            });
        }
        if (!user.verified) {
            return res.status(403).json({
                status: 'fail',
                message: 'Account not verified',
            });
        }
        if (user.provider) {
            return res.status(403).json({
                status: 'fail',
                message: 'We found your account. It looks like you registered with a social auth account. Try signing in with social auth.',
            });
        }
        // Generat the password reset token with the Crypto module and hash it.
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const passwordResetToken = crypto_1.default
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        // Stored the hashed password in the database.
        yield (0, user_service_1.updateUser)({ id: user.id }, {
            passwordResetToken,
            passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
        }, { email: true });
        try {
            const url = `${config_1.default.get('origin')}/resetPassword/${resetToken}`;
            // Send the unhashed reset token to the user’s email.
            yield new email_1.default(user, url).sendPasswordResetToken();
            res.status(200).json({
                status: 'success',
                message,
            });
        }
        catch (err) {
            yield (0, user_service_1.updateUser)({ id: user.id }, { passwordResetToken: null, passwordResetAt: null }, {});
            return res.status(500).json({
                status: 'error',
                message: 'There was an error sending email',
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
const resetPasswordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract the reset token from the request and hashed it.
        const passwordResetToken = crypto_1.default
            .createHash('sha256')
            .update(req.params.resetToken)
            .digest('hex');
        // Check if a user with that reset token exists in the database.
        const user = yield (0, user_service_1.findUser)({
            passwordResetToken,
            passwordResetAt: new Date(),
        });
        if (!user) {
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid token or token has expired',
            });
        }
        // Hash the new password
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 12);
        // Update the user’s password in the database
        yield (0, user_service_1.updateUser)({
            id: user.id,
        }, {
            // Set the passwordResetToken and passwordResetAt to null to prevent a user from resetting the password twice.
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetAt: null,
        }, { email: true });
        // Log the user out of the application by sending expired cookies.
        logout(res);
        res.status(200).json({
            status: 'success',
            message: 'Password data updated successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
