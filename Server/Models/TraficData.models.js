import mongoose, { Schema } from 'mongoose';

const trafficDataSchema = new Schema({
    date: {
        type:
            Date, required: true
    },
    pageViews: {
        type: Number,
        required: true
    },
    uniqueVisitors: {
        type: Number,
        required: true
    },
    sessions: {
        type: Number,
        required: true
    },
});

const TrafficData = mongoose.model('TrafficData', trafficDataSchema);

export default TrafficData;