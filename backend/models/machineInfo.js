import mongoose from "mongoose";

const machineInfo = new mongoose.Schema({
    machineId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})
export default mongoose.model('machineInfo', machineInfo);