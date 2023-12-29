import {Router} from "express";
import authController from "../controllers/auth.js";

const router = Router();

router.post('/register', authController.postRegister);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/refresh-token', authController.postRefreshToken)

export {router as authenticationRoutes};