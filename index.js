import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config"
import userRouter from "./routers/userRouter.js";
import expressOasGenerator from "express-oas-generator";

// connect to database
await mongoose.connect(process.env.MONGO_URL);

const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["user"],
    mongooseModels: mongoose.modelNames()
})

// apply middleware
app.use(express.json());

// trust first proxy
app.set("trust proxy", 1);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

// use routes
app.use(userRouter);
expressOasGenerator.handleRequests();
app.use((req, res) => {
    res.redirect("/api-docs/");
});

const port = process.env.PORT || 5678;

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});
