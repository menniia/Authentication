import { Router } from "express";
import { loginUser } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/login", loginUser);

export default loginRouter;