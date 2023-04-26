import express from "express";
import deleteRecipeController, { createRecipeController, getRecipeController, updateRecipeController } from "../controllers/recipeController.js";

const router = express.Router();

// Create a Recipe Controller
router.route("/createRecipe").post(createRecipeController);

// Get a Recipe Controller
router.route("/getRecipe/:id").get(getRecipeController);

// Edit a Recipe Controller
router.route("/updateRecipe/:id").put(updateRecipeController);

// Delete a Recipe Controller
router.route("/updateRecipe/:id").delete(deleteRecipeController);

export default router;