import { Router } from "express";
import { AuthController, verify } from "../controllers/Auth.Controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.registerUser);
AuthRouter.post("/login", AuthController.loginUser);
AuthRouter.get("/logout", AuthController.logout);
AuthRouter.get("/protected", authenticate, AuthController.protectedRoute);
AuthRouter.get("/verify", authenticate, verify);

export default AuthRouter;
