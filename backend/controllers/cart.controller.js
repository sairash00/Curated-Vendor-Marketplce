import User from "../database/model/user.model.js";
import Product from "../database/model/product.model.js";
import Cart from "../database/model/cart.model.js";

//Add product to cart
export const addToCart = async (req,res) => {
    try {
        const {productId, quantity} = req.body;
        if( productId == null || quantity == null || isNaN(quantity) ) return res.status(400).json({
            success: false,
            message: "Product id and quantity required"
        })

        const product = await Product.findById(productId).select("price");
        if(!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        const user = await User.findById(req.user.id).select("cart");
        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        const cartItems = await Cart.find({user : user._id}).select("product quantity")

        const presentCartItems = cartItems.find((item) => item.product.toString() === productId)

        if(presentCartItems) {
            presentCartItems.quantity += parseInt(quantity) || 1;
            presentCartItems.totalPrice = product.price * presentCartItems.quantity;
            await presentCartItems.save();
            return res.status(200).json({
                success: true,
                message: "Product quantity updated successfully",
                cart: presentCartItems
            })
        }

        const cart = await Cart.create({
            user: req.user.id,
            product: productId,
            quantity: parseInt(quantity) || 1,
            totalPrice: product.price * parseInt(quantity || 1 )
        })

        if(!cart) return res.status(500).json({
            success: false,
            message: "failed to add product to cart"
        })

        user.cart.push(cart._id);
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Product added successfully",
            cart
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//Remove product from cart
export const removeFromCart = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const userId = req.user.id;               

        if (!cartItemId) return res.status(400).json({
            success: false,
            message: "Cart item ID is required" 
        });

        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem) return res.status(404).json({
            success: false,
            message: "Cart item not found"
        });

        const user = await User.findByIdAndUpdate(userId, {
            $pull: { cart: cartItemId }
        });

        if (!user) return res.status(404).json({
            success: false,
            message: "User not found"
        });

        await Cart.findByIdAndDelete(cartItemId);

        return res.status(200).json({
            success: true,
            message: "Cart item was removed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//Update cart items 
export const updateCartItems  = async (req, res) => {
    try {
        const {quantity, id} = req.body
        if(!quantity || isNaN(quantity) || !id) return res.status(400).json({
            success: false,
            message: "Quantity and id required"
        })

        const cartItems = await Cart.findById(id).select("quantity totalPrice");
        if(!cartItems) return res.status(404).json({
            success: false,
            message: "Cart item not found"
        })

        const pricePerProduct = cartItems.totalPrice / cartItems.quantity

        cartItems.quantity = parseInt(quantity || 1) 
        cartItems.totalPrice = pricePerProduct * quantity
        await cartItems.save();

        return res.status(200).json({
            success: true,
            message: "Cart item quantity updated successfully",
            cart: cartItems
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//Get all cart items
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartItems = await Cart.find({ user: userId })
            .populate('product', 'name price')
            .populate('product.vendorId', 'businessName')
            .select('product quantity totalPrice');

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No items found in the cart"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            cart: cartItems
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

