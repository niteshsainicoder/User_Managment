import mongoose, { Schema } from "mongoose";

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String,  default: "Labour" } 
}, { timestamps: true });

export const UserSchema = mongoose.model("User", User);