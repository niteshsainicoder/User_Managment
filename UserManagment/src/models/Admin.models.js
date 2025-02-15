import mongoose, { Schema } from "mongoose";

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export const AdminSchema = mongoose.model("Admin", User);