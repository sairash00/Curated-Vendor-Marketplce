import express from 'express'
import { deleteAccount, getVendorInfo, loginVendor, logout, registerVendor, updateProfile } from '../controllers/vendor.controller.js'
import { authenticateVendor } from '../middlewares/authentication.middleware.js'

const router = express.Router()

// all the routing will be handled here
router.route("/register").post(registerVendor)
router.route("/login").post(loginVendor)
router.route("/getDetails").get(authenticateVendor, getVendorInfo)
router.route("/logout").post(authenticateVendor, logout)
router.route("/delete").post(authenticateVendor, deleteAccount)
router.route("/update").post(authenticateVendor, updateProfile)



export default router