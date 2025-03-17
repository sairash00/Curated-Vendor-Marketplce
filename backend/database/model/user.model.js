import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profileImage: {
        id: {
            type: String,
            
        },
        url: {
            type: String,
        }
    },
    address: {
        type: String,
        required: true
    }, 
    phone: {
        type: Number,
        required: true
    }, 
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

}, {timestamps: true})

const User = mongoose.model('User', userSchema);
export default User