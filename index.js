import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config"
import userRouter from "./routers/userRouter.js";

// connect to database
await mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());

// trust first proxy
app.set("trust proxy", 1);

app.use(
    session({
        secret: "something else",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

// use routes
app.use(userRouter);

const port = process.env.PORT || 5678;

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});
