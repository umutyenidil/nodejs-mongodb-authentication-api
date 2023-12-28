import {Router} from "express";
import authenticationController from "../controllers/authentication.js";

const router = Router();

router.post('/register', authenticationController.postRegister);

router.post('/login', authenticationController.postLogin);

router.post('/logout', authenticationController.postLogout);

router.post('/refresh-token', authenticationController.postRefreshToken)

export {router as authenticationRoutes};