import mongoose, { mongo } from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please Enter your Email Address"],
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minlength: [6, "Password Must Be Atleast 6 characters"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
