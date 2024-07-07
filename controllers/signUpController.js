import { UserModel } from "../models/signUpSchema.js"
import bcrypt from "bcryptjs";

export const addNewUser = async (req, res, next) => {
    try {
        const { userName, userEmail, password } = req.body;

        if (!userName || !userEmail || !password) {
            return res.status(400).json({ message: "Enter all fields" });
        }

        const accurateEmail = userEmail.includes("@");
        if (!accurateEmail) {
            return res.status(400).json({ message: "Enter correct email" });
        }

        // to check if user data is already in the database
        const existingUser = await UserModel.findOne({ userEmail });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists, try signing in" });
        }

        // create hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user with hashed password
        const newUser = await UserModel.create({
            userName,
            userEmail,
            password: hashedPassword,
        });

        if (!newUser) {
            throw new Error("Failed to create new user");
        }

        // setting session data
        req.session.user = {
            _id: newUser._id,
            userName: newUser.userName,
            userEmail: newUser.userEmail,
        };

        // response
        res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            userEmail: newUser.userEmail,
        });
    } catch (error) {
        next(error);
    }
};
