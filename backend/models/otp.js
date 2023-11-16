import mongoose from "mongoose";

const otp = mongoose.Schema({
    otp: { type: Number, require: true },
    email: { type: String, require: true },
    status: { type: String, require: true },
    time: { type: Date, default: Date().now }
})

export default mongoose.model('OTP', otp)