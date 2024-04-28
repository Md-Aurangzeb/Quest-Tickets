import machineInfoModel from '../models/machineInfo.js'
import cardModel from '../models/card.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from "nodemailer";
import { User } from '../models/signupModel.js';
import alert from '../Templates/alert.js';

const machine = () => {
    return {
        async login(req, res) {
            try {
                const { machineId, password } = req.body

                const findmachine = await machineInfoModel.findOne({ machineId })

                if (findmachine == null) {
                    return res.status(400).send({
                        message: "Invalid machineId or Password",
                        status: "bad request",
                        code: 400
                    })
                }

                const passMach = bcrypt.compareSync(password, findmachine.password)

                if (!passMach) {
                    return res.status(400).send({
                        message: "Invalid machineId or Password",
                        status: "bad request",
                        code: 400
                    })
                }

                const id = { machinedbId: findmachine._id }
                const jwtToken = jwt.sign(id, process.env.SECTRE_KEY)
                res.status(200).send({
                    token: jwtToken,
                    message: "Jwt Token",
                    status: "ok",
                    code: 200
                })


            } catch (error) {
                return res.status(500).send({
                    message: "" + error,
                    status: "Internal server Error",
                    code: 500
                })
            }
        },
        async signUp(req, res) {
            try {
                const { machineId, password } = req.body

                const findMachine = await machineInfoModel.findOne({ machineId })

                if (findMachine != null) {
                    return res.status(400).send({
                        message: "Machine Id already exists",
                        status: "bad request",
                        code: 400
                    })
                }

                const strongPassTrue = password.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
                if (strongPassTrue) {
                    return res.status(400).send({
                        message: "Chose a strong Password!",
                        status: "bad request",
                        code: 400
                    })
                }

                const machimeInfo = new machineInfoModel({
                    machineId,
                    password: bcrypt.hashSync(password, 10)
                })

                machimeInfo.save().then(() => {
                    return res.status(200).send({
                        message: "Machine Info Addedd Successfully",
                        status: "ok",
                        code: 200
                    })
                }).catch(err => {
                    return res.status(500).send({
                        message: "" + err,
                        status: "Internal Server error",
                        code: 500
                    })
                })

            } catch (error) {
                return res.status(500).send({
                    message: "" + error,
                    status: "Internal server Error",
                    code: 500
                })
            }
        },
        async deductMoneyFromUser(req, res) {
            try {
                const { token, cardno } = req.query
                const getMachineInfo = jwt.decode(token)

                const verifyMachine = await machineInfoModel.findOne({ _id: getMachineInfo.machinedbId })

                if (verifyMachine == null || !verifyMachine) {
                    return res.status(401).send({
                        message: "Unauthorized Machine",
                        status: "Unauthorized",
                        code: 401
                    })
                }


                const cardinfo = await cardModel.findOne({ cardNumber: cardno })

                if (cardinfo == null || !cardinfo) {
                    return res.status(401).send({
                        message: "Unauthorized Card",
                        status: "Unauthorized",
                        code: 401
                    })
                }

                if (cardinfo.domesticUse === false) {
                    return res.status(400).send({
                        message: "Domestic Use Is turned off",
                        status: "bad request",
                        code: 400
                    })
                }

                if (cardinfo.block === true) {
                    return res.status(400).send({
                        message: "Card is blocked",
                        status: "bad request",
                        code: 400
                    })
                }

                if (cardinfo.autoDebitUse === false) {
                    return res.status(400).send({
                        message: "tap to pay is terend Off",
                        status: "bad request",
                        code: 400
                    })
                }


                if (cardinfo.amount < process.env.ticket_cost) {
                    return res.status(400).send({
                        message: "Don't Have enough amount",
                        status: "bad request",
                        code: 400
                    })
                }

                const cardAmount = cardinfo.amount - process.env.ticket_cost

                await cardModel.updateOne({ cardNumber: cardno },
                    {
                        $set: {
                            amount: cardAmount
                        }
                    }
                )

                const getLatestCardInfo = await cardModel.findOne({ cardNumber: cardno })

                /*
                ==============================
                    Get User Details 
                ==============================
                 */

                const findUser = await User.findOne({ _id: cardinfo.userId })


                /*
                =====================================
                    Send Alert to User via Email
                ======================================
                */


                const transpoter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.SMTP_MAIL,
                        pass: process.env.SMTP_PASSWORD
                    }
                })
                const mailOption = ({
                    from: `Quest Card ${process.env.SMTP_MAIL}`,
                    to: findUser.email,
                    subject: `Transaction alert on Quest Card Card no. XXX${cardinfo.cardNumber.substring(cardinfo.cardNumber.length - 4)}`,
                    html: alert(findUser.name, cardinfo.cardNumber.substring(cardinfo.cardNumber.length - 4), process.env.ticket_cost,getLatestCardInfo.amount)
                })

                transpoter.sendMail(mailOption, (err, info) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.status(200).send("mail sent successfully.")
                    }
                })

                res.status(200).send({
                    message: "amount deducted Successfully",
                    status: "Ok",
                    code: 200
                })

            } catch (error) {
                return res.status(500).send({
                    message: "" + error,
                    status: "Internal server Error",
                    code: 500
                })
            }
        }
    }
}

export default machine
