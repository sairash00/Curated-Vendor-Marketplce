 import Cart from "../database/model/cart.model.js"
 import User from "../database/model/user.model.js"
 import Vendor from "../database/model/vendor.model.js"
 import Order from "../database/model/order.model.js"


 // place order controller
 export const placeOrder = async (req,res) => {
    try {
        const userId = req.user.id
        
        const cartItems = await Cart.find({user: userId}).populate("product", "vendorId price name")
        if( !cartItems ||cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            })
        }

        // separating cart items by vendor -------- Main logic
        const vendorCartMap = {}
        cartItems.forEach(item => {
            const vendorId = item.product.vendorId.toString();
            if(!vendorCartMap[vendorId]) {
                vendorCartMap[vendorId] = []
            }
            vendorCartMap[vendorId].push(item);
        })

        // creating all the possibles order from the cart items
        const createdOrders = [];

        for(const vendorId in vendorCartMap){
            const vendorItems = vendorCartMap[vendorId];
            // mapping through each cart items for current specific vendor
            const orderItems = vendorItems.map((item) => {
                return {
                    product: item.product._id,
                    quantity: item.quantity,
                };
            });

            const newOrder = await Order.create({
                user: userId,
                vendor: vendorId,
                items: orderItems,
                status: "pending"
            })

            if(!newOrder) return res.status(500).json({
                success: false,
                message: "Failed creating order"
            })

            await Vendor.findByIdAndUpdate(vendorId, {
                $push: {
                    orders: newOrder._id
                }
            })
            await User.findByIdAndUpdate(userId,{
                $push: {
                    orders: newOrder._id
                }
            })

            createdOrders.push(newOrder)
        }

        // clearing the cart
        await Cart.deleteMany({user: userId})

        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            orders: createdOrders
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
 }

 // cancel order controller
 export const cancelOrder = async (req, res) =>{
    try {
        const orderId = req.params.id
        if (!orderId) return res.status(400).json({
            success: false,
            message: "Order id is required"
        })

        const order = await Order.findById(orderId).select("status")

        if(!order) return res.status(404).json({
            success: false,
            message: "Order not found"
        })

        if(order.status === "delivering" || order.status === "delivered") return res.status(400).json({
            success: false,
            message: "Order cannot be cancelled now"
        })

        order.status = "cancelled"
        await order.save()

        return res.status(200).json({
            success: true,
            message: "Order has been cancelled"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
 }

 // get user orders for user
 export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id
        if(!userId) return res.status(400).json({
            success: false,
            message: "User id is required"
        })

        const user = await User.findById(userId)
        .populate("orders", "vendor items status")
        .populate("orders.vendor", "businessName")
        .populate("orders.items.product", "name price category")

        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders: user.orders
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
 }

 // get vendor orders for vendor
 export const getVendorOrders = async (req, res) => {
    try {
        const vendorId = req.vendor.id
        if(!vendorId) return res.status(400).json({
            success: false,
            message: "Vendor id is required"
        })

        const vendor = await Vendor.findById(vendorId)
        .populate("orders", "user items status")
        .populate("orders.user")
        .populate("orders.items.product", "name price category")

        if(!vendor) return res.status(404).json({
            success: false,
            message: "Vendor not found"
        })

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders: vendor.orders
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
 }

 // remove cancelled orders for vendors
export const removeCancelledOrdersForVendors = async (req, res) => {
    try {
        const orderId = req.params.id
        const vendorId = req.vendor.id

        if(!orderId) return res.status(400).json({
            success: false,
            message: "Order ID is required"
        })

        const order = await Order.findById(orderId).select("status user")

        if(!order) return res.status(404).json({
            success: false,
            message: 'Order not found'
        })

        if(order.status !== "cancelled") return res.status(400).json({
            success: false,
            message: "Order cannot be removed"
        })

        const user = await Vendor.findById(vendorId).select("orders")

        if (!user) return res.status(500).json({
            success: false,
            message: "Couldn't remove order"
        })

        if (!user.orders.includes(orderId)) return res.status(400).json({
            success: false,
            message: "Order not found in vendor's orders"
        })

        user.orders.pull(orderId)
        await user.save()

        await Vendor.findByIdAndUpdate(vendorId, {
            $pull: {orders: orderId}
        })

        await Order.findByIdAndDelete(orderId)

        return res.status(200).json({
            success: false,
            message: "Order removed successfully"
        })
        

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//remove cancelled orders for user
export const removeCancelledOrders = async (req, res) => {
    try {
        const orderId = req.params.id
        const userId = req.user.id

        if(!orderId) return res.status(400).json({
            success: false,
            message: "Order ID is required"
        })

        const order = await Order.findById(orderId)

        if(!order) return res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    
        if(order.status !== "cancelled") return res.status(400).json({
            success: false,
            message: "Order cannot be removed",
        })

        const user = await User.findById(userId).select("orders")

        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        if(!user.orders.includes(orderId)) return res.status(400).json({
            success: false,
            message: "Order not found in user's orders"
        })

        user.orders.pull(orderId)
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Order removed successfully"
        })
        // the order is not deleted as the order detail will be required for the analytics pusposes
        // for the vendor even if it not required for that purpose it will be deleted when the vendor
        // removes the cancelled orders.

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const updateOrderStatus = async(req, res) => {
    try {
        const {status, orderId} = req.body

        if(!status || !orderId) return res.status(400).json({
            success: false,
            message: "Status and OrderId is required"
        })

        if(status !== "processing" && status !== "delivering" && status !== "delivered") return res.status(400).json({
            success: false,
            message: "Invalid status"
        })

        const order = await Order.findById(orderId).select("status");

        if(!order) return res.status(404).json({
            success: false,
            message: "Order not found"
        })

        if( status === "processing") order.status = "processing";
        if( status === "delivering") order.status = "delivering";
        if( status === "delivered") order.status = "delivered";
        
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}