import express from "express";
import { getAllUsers, loginController, registerController, logoutController } from "../controllers/userController.js";

const router = express.Router();


// Login routes
router.route("/login").post(loginController);

// Register routes
router.route("/register").post(registerController);

// Logout routes
router.route("/logout").get(logoutController);

// Get All Users routes
router.route("/allUsers").get(getAllUsers);

// Get User detail routes
router.route("/user/:id").get(getAllUsers);

export default router;