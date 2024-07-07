import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config"
import expressOasGenerator from "express-oas-generator";
import signUpRouter from "./routers/signUpRouter.js";
import loginRouter from "./routers/loginRouter.js";

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
app.use(signUpRouter);
app.use(loginRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => {
    res.redirect("/api-docs/");
});

const port = process.env.PORT || 5678;

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});


//$2a$10$GheLD3KO3Kd5cClHzusQ7.lh9GCsKW2yXWi0WutB.XbgjKAaa8B2m
//userPassword
