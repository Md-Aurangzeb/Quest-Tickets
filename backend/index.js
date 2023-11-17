import express from "express";
import bodyParser from "body-parser";
import "dotenv/config"
import routeRoute from "./routes/users.js"
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import web from "./routes/web.js";
import cors from 'cors'


const app = express();
app.use(cors())


//connect with MongoDB
app.use(bodyParser.json());
const uri = "mongodb+srv://" + process.env.USER_ID + ":" + process.env.USER_PASSWORD + "@questtickets.sj8r05q.mongodb.net";
mongoose.connect(uri + "/userDB").then(() => {
    console.log("database connected successfully.")
}).catch(err => console.log(err));


//Router
app.get("/", async (req, res) => {
    res.send("home page")
})
app.use("/users", routeRoute);
web(app)

//Server Lintening
app.listen(process.env.PORT, () => {
    console.log(`server is live at http://localhost:${process.env.PORT}`);
})