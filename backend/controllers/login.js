import { User } from '../models/signupModel.js'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import otpModel from '../models/otp.js'

const login = () => {
    const requestOtp = async (email) => {
        let OTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        })

        const findOtp = await otpModel.findOne({ email: email })

        if (findOtp === null) {
            const newOtp = new otpModel({
                email: email,
                otp: OTP,
                status: 'Login',
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
        async loginUser(req, res) {
            try {
                const { email, password } = req.body
                const findUser = await User.findOne({ email: email })
                if (findUser == null) {
                    return res.status(403).send("Ivalid Credintials")
                }

                const passMach = bcrypt.compareSync(password, findUser.password)
                if (!passMach) {
                    return res.status(403).send("Ivalid Credintials")
                }

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
                    subject: "OTP For Login",
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
                res.status(500).send("internal sever err" + error);
            }
        },
        async verifyLogin(req, res) {
            try {
                const { otp, email } = req.body
                const findOtp = await otpModel.findOne({ email: email })
                if (findOtp == null) {
                    return res.status(403).send("Access Denied")
                }

                if (findOtp.otp != otp) {
                    return res.status(403).send("Invalid OTP")
                }

                await otpModel.deleteOne({ email: email })
                const getUser = await User.findOne({ email: email })
                const id = { userId: getUser._id }
                const jwtToken = jwt.sign(id, process.env.SECTRE_KEY)
                userInfo = {
                    jwtToken: jwtToken,
                    userName: getUser.name
                }
                res.status(200).send(jwtToken)


            } catch (error) {
                res.status(500).send("internal sever err" + error);
            }
        }
    }
}

export default login
