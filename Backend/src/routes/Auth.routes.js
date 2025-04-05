import { Router } from "express";
import { AuthController } from "../controllers/Auth.Controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const AuthRouter = Router();

// Register route
AuthRouter.post("/register", AuthController.registerUser);

// Login route
AuthRouter.post("/login", AuthController.loginUser);

// Logout route
AuthRouter.get("/logout", AuthController.logout);

// Protected route
AuthRouter.get("/protected", authenticate, AuthController.protectedRoute);

//VerifY Route
AuthRouter.get("/verify",authenticate, verify);

export default AuthRouter;


