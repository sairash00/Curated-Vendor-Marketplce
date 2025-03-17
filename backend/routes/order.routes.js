import express from 'express'
import { cancelOrder, getUserOrders, placeOrder, removeCancelledOrders, removeCancelledOrdersForVendors } from '../controllers/order.controller'
import { authenticateVendor } from '../middlewares/authentication.middleware'

const router = express.Router()

// all the routing will be handled here
router.route("/add").post(authenticate, placeOrder)
router.route("/cancel/:id").post(authenticate, cancelOrder)
router.route("/getUser").post(authenticate, getUserOrders)
router.route("/getVendor").post(authenticateVendor, getVendorOrders)
router.route("/removeUser").post(authenticate, removeCancelledOrders)
router.route("/removeVendor").post(authenticateVendor, removeCancelledOrdersForVendors)



export default router