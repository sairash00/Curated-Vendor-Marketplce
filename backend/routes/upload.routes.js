import express from 'express'
import { authenticate, authenticateVendor } from '../middlewares/authentication.middleware'
import { uploadUserProfile, uploadVendorProfile } from '../controllers/upload.controller'

const router = express.Router()

// all the routing will be handled here

router.route("/user").post(authenticate, uploadUserProfile)
router.route("/vendor").post(authenticateVendor, uploadVendorProfile)


export default router