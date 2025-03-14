import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'delivering', 'delivered', 'cancelled']
    },
    paymentMethod: {
        type: String,
        default: 'COD'
    }
},{
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema)
export default Order