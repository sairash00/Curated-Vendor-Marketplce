import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating:{
        type: Number,
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{
    timeStamps: true
})

const Review = mongoose.model('Review', reviewSchema);
export default Review