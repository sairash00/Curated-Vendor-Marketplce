import express from 'express'
import { cancelOrder, getUserOrders, getVendorOrders, placeOrder, removeCancelledOrders, removeCancelledOrdersForVendors, updateOrderStatus } from '../controllers/order.controller.js'
import { authenticate, authenticateVendor } from '../middlewares/authentication.middleware.js'

const router = express.Router()

// all the routing will be handled here
router.route("/add").post(authenticate, placeOrder)
router.route("/cancel/:id").post(authenticate, cancelOrder)
router.route("/getUser").get(authenticate, getUserOrders)
router.route("/getVendor").get(authenticateVendor, getVendorOrders)
router.route("/removeUser/:id").post(authenticate, removeCancelledOrders)
router.route("/removeVendor/:id").post(authenticateVendor, removeCancelledOrdersForVendors)
router.route("/update").post(authenticateVendor, updateOrderStatus)


export default router