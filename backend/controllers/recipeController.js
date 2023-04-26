import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

// Create a new Recipe Controller
export const createRecipeController = async (req, res, next) => {
  try {
    const { title, description, ingredients, steps, images, userId } = req.body;

    if (!title || !description || !ingredients || !steps || !images) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User does not exist",
      });
    }

    const newRecipe = await Recipe.create({
      title: title,
      description: description,
      steps: steps,
      ingredients: ingredients,
      images: images,
      user: userId,
    });

    user.recipes.push(newRecipe._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Recipe Created Successfully by, ${user.name}`,
      recipe: newRecipe,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get the recipe Controller
export const getRecipeController = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(409).json({
        success: false,
        message: "Recipe does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      recipe: recipe,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


// Update Recipe Controller
export const updateRecipeController = async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    const { title, description, ingredients, steps, images, userId } = req.body;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(409).json({
        success: false,
        message: "Recipe does not exist",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (recipe.user.id !== user._id) {
      return res.status(409).json({
        success: false,
        message: "User is not authorized",
      });
    }

    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    recipe.images = images;

    await recipe.save();

    return res.status(200).json({
      success: true,
      message: `Recipe Updated Successfully by, ${user.name}`,
      recipe: recipe,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



// Delete Recipe Controller
export default async (req, res, next) => {
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(409).json({
        success: false,
        message: "Recipe does not exist",
      });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(409).json({
        success: false,
        message: "User is not authorized",
      });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User does not exist",
      });
    }

    user.recipes = user.recipes.filter(recipes => recipes._id !== recipe._id);

    console.log(user);

    await user.save();
    await recipe.remove();

    return res.status(200).json({
      success: true,
      message: `Recipe Removed Successfully by`,
    });

  }
  catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};