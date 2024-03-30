import mongoose, { Schema } from 'mongoose';
const deviceTypeSchema = new Schema({
    deviceType: {
        type: String,
        required: true,
    },
    visitors:{
        type:Number,
        required:true,
    }
})
const deviceTypeModels=mongoose.model('DeviceType', deviceTypeSchema);
export default deviceTypeModels;