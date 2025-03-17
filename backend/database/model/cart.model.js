import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },

},{timestamps: true})


const Cart = mongoose.model('Cart', cartSchema);
export default Cart;