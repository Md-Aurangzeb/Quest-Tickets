import checkUserInfo from "../controllers/checkUserInfo.js"

const web = (app) => {
    app.post('/checkbasicInfo',checkUserInfo().ckeckBasicInfo)
    app.post('/checkpanaadher',checkUserInfo().checkPanAadher)
    app.post('/checkpass',checkUserInfo().checkPassword)
}

export default web
