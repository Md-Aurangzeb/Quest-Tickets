import mongoose from "mongoose";

const cardInfo = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    cardNumber: { type: String, required: true, unique: true },
    cardValidity: { type: String, required: true },
    cvv: { type: String, required: true },
    domesticUse:{type:Boolean,default:false},
    InternationalUse:{type:Boolean,default:false},
    overLimitUse:{type:Boolean,default:false},
    autoDebitUse:{type:Boolean,default:false},
    block:{type:Boolean,default:false},
    amount: { type: Number, default: 0 }
})
export default mongoose.model('cardInfo', cardInfo);