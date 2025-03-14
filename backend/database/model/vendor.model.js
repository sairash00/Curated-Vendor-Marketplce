import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    businessName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profileImage: {
        id: {
            type: String,
            
        },
        url:{
            type: String
        }
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
},{
    timestamps: true
})

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;