import mongoose from "mongoose";

const cardInfo = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    cardNumber: { type: String, required: true, unique: true },
    cardValidity: { type: String, required: true },
    cvv: { type: String, required: true },
    amount: { type: Number, default: 0 }
})
export default mongoose.model('cardInfo', cardInfo);