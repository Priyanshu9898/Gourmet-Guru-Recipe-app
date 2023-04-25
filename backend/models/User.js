import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required : [true, "Please Enter your name"]
    },

    email:{
        type: String,
        required : [true, "Please Enter your Email Address"],
        unique : true,
        validate : validator.isEmail,
    },

    password:{
        type: String,
        required : [true, "Please Enter your Password"],
        minlength : [6, "Password Must Be Atleast 6 characters"],
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },

    recipes: {
        type: Array,
        ref: "recipe",
        default: [],
    },


    createdAt: {
        type:Date,
        default: Date.now,
    },
});


const User = mongoose.model("User", userSchema);

export default User;
