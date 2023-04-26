import express from "express";
import { loginController, registerController } from "../controllers/userController.js";

const router = express.Router();


// Login routes
router.route("/login").post(loginController);

// Register routes
router.route("/register").post(registerController);

export default router;