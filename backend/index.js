import express from "express";
import bodyParser from "body-parser";
import "dotenv/config"
import routeRoute from "./routes/users.js"
import mongoose from "mongoose";
import nodemailer from "nodemailer";
const app=express();
// app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
console.log(process.env.SMTP_MAIL+"    "+process.env.SMTP_PASSWORD);
const uri="mongodb+srv://"+process.env.USER_ID+":"+process.env.USER_PASSWORD+"@questtickets.sj8r05q.mongodb.net";
mongoose.connect(uri+"/userDB").then(()=>console.log("database connected successfully.")).catch(err=>console.log(err));



const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
})
const mailOption = ({
    from: process.env.SMTP_MAIL,
    to: "aurangzebalam896@gmail.com",
    subject: "Admin Login OTP",
    html: `
        <p>Your OTP is <strong>${3453}</strong></p>
    `
})

transpoter.sendMail(mailOption, (err, info) => {
    if (err) {
        console.log(err)
    }
    else{
        console.log("mail sent successfully.")
    }
})


app.get("/",async(req,res)=>{
    res.send("home page")
})
app.use("/users",routeRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is live at http://localhost:${process.env.PORT}`);
})