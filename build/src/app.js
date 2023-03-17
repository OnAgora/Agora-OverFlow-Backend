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
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const delete_routes_1 = __importDefault(require("./routes/delete.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const appError_1 = __importDefault(require("./utilities/appError"));
const client_1 = require("@prisma/client");
//import validateEnv from './utilities/validateEnv';
const app = (0, express_1.default)(), port = process.env.PORT || 8000, prisma = new client_1.PrismaClient();
// The validateEnv.ts ensures that the environment variables you provided
// in the .env have their correct Typescript types
// validateEnv();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // TEMPLATE ENGINE
        app.set('view engine', 'pug');
        app.set('views', `${__dirname}/views`);
        // MIDDLEWARE
        // 1.Body Parser
        app.use(express_1.default.json({ limit: '10kb' }));
        // 2. Cookie Parser
        app.use((0, cookie_parser_1.default)());
        // 2. Cors
        app.use((0, cors_1.default)());
        // ROUTES
        app.use('/api/auth', auth_routes_1.default);
        app.use('/api/users', user_routes_1.default);
        app.use('/api/admin', admin_routes_1.default);
        app.use('/api/delete', delete_routes_1.default);
        // UNHANDLED ROUTES
        app.all('*', (req, res, next) => {
            next(new appError_1.default(404, `Route ${req.originalUrl} not found`));
        });
        // GLOBAL ERROR HANDLER
        app.use((err, req, res, next) => {
            err.status = err.status || 'error';
            err.statusCode = err.statusCode || 500;
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        });
        const port = config_1.default.get('port');
        app.listen(port, () => {
            console.log(`Server on port: ${port}`);
        });
    });
}
bootstrap()
    .catch((err) => {
    throw err;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
