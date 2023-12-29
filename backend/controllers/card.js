import cardModel from '../models/card.js'
import { User } from "../models/signupModel.js";

const card = () => {
    return {
        async GetCardNumber(req, res) {
            try {
                const { email } = req.body

                if (!email) {
                    return res.status(400).send("All field Required")
                }

                const findUser = await User.findOne({ email })

                if (findUser == null) {
                    return res.status(401).send("Invalid User")
                }

                const getCard = await cardModel.findOne({ userId: findUser._id })

                if (getCard == null) {
                    return res.status(403).send("Card is not Present for this user")
                }

                res.status(200).send(getCard)
            } catch (error) {
                res.status(500).send("Internal server Error " + error)
            }
        },
        async rechargeCard(req, res) {
            try {
                const { email, amount } = req.body

                if (!email || !amount) {
                    return res.status(400).send("Enter a Valid Amount")
                }

                const findUser = await User.findOne({ email })

                if (findUser == null) {
                    return res.status(401).send("Invalid User")
                }

                const getCard = await cardModel.findOne({ userId: findUser._id })

                if (getCard == null) {
                    return res.status(403).send("Card is not Present for this user")
                }

                const pastAmount = getCard.amount

                cardModel.updateOne({ userId: findUser._id }, {
                    $set: {
                        amount: amount + pastAmount
                    }
                }).then(() => {
                    res.status(200).send("Recharge Done Successfully")
                }).catch(err => {
                    res.status(500).send("Internal Server error" + err)
                })


            } catch (error) {
                res.status(500).send("Internal server Error " + error)
            }
        },
        async cardControl(req, res) {
            try {
                const { state, status, email } = req.body


                if (!email || !state) {
                    return res.status(400).send("All field Required")
                }

                const findUser = await User.findOne({ email })

                if (findUser == null) {
                    return res.status(401).send("Invalid User")
                }

                const getCard = await cardModel.findOne({ userId: findUser._id })

                if (getCard == null) {
                    return res.status(403).send("Card is not Present for this user")
                }

                const updateField = {};
                updateField[state] = status;
                const updateQuery = { $set: updateField };


                cardModel.updateOne({ userId: findUser._id }, updateQuery).then(() => {
                    res.status(200).send("Updated Successfully")
                }).catch(err => {
                    res.status(500).send("Internal Server error" + err)
                })

            } catch (error) {
                res.status(500).send("Internal server Error " + error)
            }
        }
    }
}

export default card
