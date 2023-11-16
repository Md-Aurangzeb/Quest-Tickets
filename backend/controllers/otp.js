import nodemailer from "nodemailer";
import otpGenerator from 'otp-generator'
import otpModel from '../models/otp.js'

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


        }
    }
}

export default otp