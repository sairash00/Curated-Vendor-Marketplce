import express from 'express'
import { authenticate, authenticateVendor } from '../middlewares/authentication.middleware.js'
import { uploadUserProfile, uploadVendorProfile } from '../controllers/upload.controller.js'
import upload from '../middlewares/multer.middleware.js'

const router = express.Router()

// all the routing will be handled here

router.route("/user").post(upload.single("image"), authenticate, uploadUserProfile)
router.route("/vendor").post(upload.single("image"), authenticateVendor, uploadVendorProfile)


export default router