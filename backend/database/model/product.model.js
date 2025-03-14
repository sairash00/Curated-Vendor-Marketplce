import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    image: [{
        id: {
            type : String,
        },
        url: {
            type: String
        }
    }],
    category: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

const Product =  mongoose.model('Product', productSchema);
export default Product