import checkUserInfo from "../controllers/checkUserInfo.js"
import otp from "../controllers/otp.js"

const web = (app) => {
    app.post('/checkbasicInfo', checkUserInfo().ckeckBasicInfo)
    app.post('/checkpanaadher', checkUserInfo().checkPanAadher)
    app.post('/checkpass', checkUserInfo().checkPassword)
    app.post('/sendotp', otp().sendOtp)
    app.post('/verifyuser', otp().verifyOtp)
}

export default web
