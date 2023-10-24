import express from "express";
import {AddUser ,getUser} from "../controllers/users.js";
const router = express.Router();

router.post("/signup",AddUser)
router.post("/login",getUser)


export default router;



// s1->signup an email provider that allows you to send transcational email (smtp & api) send in blue
// s2-> install nodemailer in express and set up transport where you login using send in view Credential (smtp & api)
// s3-> create a end point where a user can request verification code 
// s4-> for the verification code create a randdom stirng using crypto library, store verification token in database that contains email we want to verify and verification code 
// s5-> and add a expire time for token after some time 
// s6-> use nodemailer send mail function to send email to the user that contains this verification code 
// s7-> and when user tries to signup check email verification token with this email address and this secrect verification code stored in datavase 
