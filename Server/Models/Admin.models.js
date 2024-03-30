import mongoose, { Schema } from "mongoose";
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    googleId:{
        type:String,
    }
}, { timestamps: true })

const Admin = mongoose.model('Admin', adminSchema)
export default Admin;