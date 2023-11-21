import { User } from '../models/signupModel.js'
const checkUserInfo = () => {
    return {
        async ckeckBasicInfo(req, res) {
            try {
                const { email, phone } = req.body
                const findEmail = await User.findOne({ email: email })

                if (findEmail != null) {
                    return res.status(403).send("Email Already Exist.")
                }

                const findPhone = await User.findOne({ phone: phone })

                if (findPhone != null) {
                    return res.status(403).send("Phone Already Exist.")
                }

                return res.status(200).send("ok")
            } catch (error) {
                res.status(500).send("Internal server error" + error)
            }
        },
        async checkPanAadher(req, res) {
            try {
                const { pan, adhar } = req.body
                const findPan = await User.findOne({ pan: pan })
                if (findPan != null) {
                    return res.status(403).send("Invalid Pan.")
                }
                const findAdhar = await User.findOne({ adhar: adhar })
                if (findAdhar != null || adhar.length != 12) {
                    return res.status(403).send("Invalid Aadher.")
                }

                return res.status(200).send("ok")
            } catch (error) {
                res.status(500).send("Internal server error" + error)
            }
        },
        checkPassword(req, res) {
            try {
                const { password, cPassword } = req.body
                const strongPassTrue = password.search(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
                if (strongPassTrue) {
                    return res.status(400).send("Chose a strong Password!")
                }

                if (password!=cPassword) {
                    return res.status(400).send("Password not Matched.")
                }

                return res.status(200).send("ok")
            } catch (error) {
                res.status(500).send("Internal server error" + error)
            }
        }
    }
}

export default checkUserInfo
