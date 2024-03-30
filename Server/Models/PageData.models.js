import mongoose,{Schema} from 'mongoose';
const pageSchema =new Schema({
    pageName: {
        type: String,
        required: true,
    },
    pageViews: {
        type: Number,
        required: true,
        default: 0,
    },
    avgTimeOnPage: {
        type: Number,
        required: true,
        default: 0,
    }
})
const Page = mongoose.model('Page', pageSchema);
export default Page;