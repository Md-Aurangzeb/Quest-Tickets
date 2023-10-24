import nodemailer from "nodemailer";
import "dotenv/config"
import { error } from "console";

console.log(process.env.SMTP_MAIL+"    "+process.env.SMTP_PASSWORD);

const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
})
const mailOption = ({
    from: process.env.SMTP_MAIL,
    to:email,
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

