import { Router } from "express";
import { AuthController } from "../controllers/Auth.Controller";
import { authenticateToken } from "../middlewares/authMiddleware";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

// Register route
router.post("/register", AuthController.registerUser);

// Login route
router.post("/login", AuthController.loginUser);

// Logout route
router.post("/logout", AuthController.logout);

// Protected route
router.get("/protected", authenticate, AuthController.protectedRoute);

export default router;
