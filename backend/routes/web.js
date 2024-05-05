import card from "../controllers/card.js"
import checkUserInfo from "../controllers/checkUserInfo.js"
import login from "../controllers/login.js"
import otp from "../controllers/otp.js"
import machine from "../controllers/machine.js"
import razorpay from "../controllers/razorpay.js"
import transaction from "../controllers/transaction.js"

const web = (app) => {
    app.post('/checkbasicInfo', checkUserInfo().ckeckBasicInfo)
    app.post('/checkpanaadher', checkUserInfo().checkPanAadher)
    app.post('/checkpass', checkUserInfo().checkPassword)
    app.post('/sendotp', otp().sendOtp)
    app.post('/verifyuser', otp().verifyOtp)
    app.post('/login', login().loginUser)
    app.post('/login/verify', login().verifyLogin)
    app.post('/card/get', card().GetCardNumber)
    app.post('/card/recharge', card().rechargeCard)
    app.post('/card/control', card().cardControl)
    app.post('/api/v1/transaction/history', transaction().history)

    /* *******************Machime Route******************** */
    app.post('/api/v1/machine/login', machine().login)
    app.post('/api/v1/machine/signup', machine().signUp)
    app.get('/api/v1/userinfo', machine().deductMoneyFromUser)

    /**********************Payment Getway****************** */
    app.post('/api/v1/payment/initiate', razorpay().order)
    app.post('/api/v1/payment/validate', razorpay().validate)
}

export default web
