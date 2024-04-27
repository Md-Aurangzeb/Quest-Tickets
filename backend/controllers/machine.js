import machineInfoModel from '../models/machineInfo.js'
import cardModel from '../models/card.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
