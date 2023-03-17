import express from 'express';
import {
  loginUserHandler,
  verifyEmailHandler,
  registerUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  forgotPasswordHandler,
  resetPasswordHandler
} from '../controllers/auth.controller';
import {
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../schemas/user.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';

const router = express.Router();

router.post('/register',
  validate(registerUserSchema),
  registerUserHandler
);

router.post('/login',
  validate(loginUserSchema),
  loginUserHandler
);

router.get('/refresh',
  refreshAccessTokenHandler
);

router.get('/logout',
  deserializeUser,
  requireUser,
  logoutUserHandler
);

// Verify Email Address
router.get(
  '/verifyemail/:verificationCode',
  validate(verifyEmailSchema),
  verifyEmailHandler
);

router.post(
  '/forgotpassword',
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

router.patch(
  '/resetpassword/:resetToken',
  validate(resetPasswordSchema),
  resetPasswordHandler
);

export default router;

