import cardModel from '../models/card.js'

const transaction = () => {
    return {
        async history(req, res) {
            try {
                const { cardNumber } = req.body

                const cardinfo = await cardModel.findOne({ cardNumber })

                if (cardinfo == null || !cardinfo) {
                    return res.status(401).send({
                        message: "Unauthorized Card",
                        status: "Unauthorized",
                        code: 401
                    })
                }

                res.status(200).send({
                    data: cardinfo.cardUse,
                    status: "ok",
                    code: 200,
                    message: "Number of Transaction"
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

export default transaction
