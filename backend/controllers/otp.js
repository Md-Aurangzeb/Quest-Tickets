import nodemailer from "nodemailer";
import otpGenerator from 'otp-generator'
import otpModel from '../models/otp.js'
import { User } from "../models/signupModel.js";
import bcrypt from "bcrypt";

const otp = () => {

    const requestOtp = async (email) => {
        let OTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        })

        const findOtp = await otpModel.findOne({ email: email })

        if (findOtp === null) {
            const newOtp = new otpModel({
                email: email,
                otp: OTP,
                status: 'New User Request',
            })

            const response = await newOtp.save()
            if (response.otp == OTP) {
                return OTP
            }

        } else {
            return findOtp.otp
        }

    }

    return {
        async sendOtp(req, res) {
            try {

                const { email } = req.body
                const OTP = await requestOtp(email)

                const transpoter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.SMTP_MAIL,
                        pass: process.env.SMTP_PASSWORD
                    }
                })
                const mailOption = ({
                    from: process.env.SMTP_MAIL,
                    to: email,
                    subject: "OTP For Registration",
                    html: `
                <p>Your OTP is <strong>${OTP}</strong></p>
            `
                })

                transpoter.sendMail(mailOption, (err, info) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.status(200).send("mail sent successfully.")
                    }
                })
            } catch (error) {
                res.status(500).send("Internal server Error " + error)
            }


        },
        async verifyOtp(req, res) {
            try {
                const { name, phone, email, age, gender, adhar, pan, address, pincode, password, otp } = req.body;
                const findOtp = await otpModel.findOne({ email: email })
                if (findOtp == null) {
                    return res.status(403).send("Access Denied")
                }

                if (findOtp.otp != otp) {
                    return res.status(400).send("Invalid OTP")
                }

                const findPhone = await User.findOne({ phone: phone })
                const findEmail = await User.findOne({ email: email })
                const findAadher = await User.findOne({ adhar: adhar })
                const findPan = await User.findOne({ pan: pan })
                if (findPhone != null) {
                    return res.status(403).send("Accesss Denied.")
                }

                if (findEmail != null) {
                    return res.status(403).send("Accesss Denied.")
                }

                if (findAadher != null) {
                    return res.status(403).send("Accesss Denied.")
                }

                if (findPan != null) {
                    return res.status(403).send("Accesss Denied.")
                }

                const newUser = new User({
                    name: name,
                    phone: phone,
                    email: email,
                    age: age,
                    gender: gender,
                    adhar: adhar,
                    pan: pan,
                    address: address,
                    pincode: pincode,
                    password: bcrypt.hashSync(password, 10)
                })
                newUser.save().then((result) => {
                    res.send("User Created Successfully");
                }).catch((err) => {
                    res.status(500).send("Unable to create User" + err);
                });

            } catch (error) {
                res.status(500).send("Internal server Error " + error)
            }
        }
    }
}

export default otp