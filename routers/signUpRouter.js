import { Router } from "express";
import { addNewUser } from "../controllers/signUpController.js";


const signUpRouter = Router()

signUpRouter.post("/signup", addNewUser);
signUpRouter.get("/")

export default signUpRouter;