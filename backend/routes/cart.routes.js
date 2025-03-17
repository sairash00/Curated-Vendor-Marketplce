import express from 'express'
import { authenticate } from '../middlewares/authentication.middleware.js'
import { addToCart, getCart, removeFromCart, updateCartItems } from '../controllers/cart.controller.js'

const router = express.Router()

// all the routing will be handled here
router.route("/add").post(authenticate, addToCart)
router.route("/remove/:id").post(authenticate, removeFromCart)
router.route("/update").post(authenticate, updateCartItems)
router.route("/get").get(authenticate, getCart)

export default router