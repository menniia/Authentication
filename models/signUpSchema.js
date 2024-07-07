import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    userEmail: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

export const UserModel = model("signup", userSchema);