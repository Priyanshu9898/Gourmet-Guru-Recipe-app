import mongoose, { mongo } from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, "Please Enter Title of Recipe"],
  },

  description: {
    type: String,
    required: [true, "Please Enter description of Recipe"],
  },

  ingredients: {
    type: [String],
    required: [true, "Please Enter ingredients for Recipe"],
  },
  
  steps: {
    type: String,
    type: [String],
    required: [true, "Please Enter steps for Recipe"],
  },
  images: {
    type: [String]
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
