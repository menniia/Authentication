import bcrypt from "bcryptjs";
import { UserModel } from "../models/signUpSchema.js";

export const loginUser = async (req, res, next) => {
    try {
        const { userEmail, password } = req.body;

        if (!userEmail || !password) {
            return res.status(400).json({ message: "Enter all credentials" })
        }

        const userDetails = await UserModel.findOne({ userEmail });

        if (userDetails && (await bcrypt.compare(password, userDetails.password))) {

            // request user data
            req.session.user = {
                _id: userDetails._id,
                userEmail: userDetails.userEmail
            }

            // respond with user data
            return res.status(201).json({
                _id: userDetails._id,
                userEmail: userDetails.userEmail
            });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        next(error);
    }
}
