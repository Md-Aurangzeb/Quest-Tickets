import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    adhar: { type: String, required: true },
    pan: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    password: { type: String, required: true }
})
export const User = new mongoose.model('User', userSchema);