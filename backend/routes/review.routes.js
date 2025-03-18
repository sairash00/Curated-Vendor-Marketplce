import express from 'express';
import { addReview, deleteReview, getVendorReviews, updateReview } from '../controllers/review.controller.js';
import { authenticate } from '../middlewares/authentication.middleware.js';


const router = express.Router();

router.route("/add").post(authenticate, addReview)
router.route("/remove").post(authenticate, deleteReview)
router.route("/update").post(authenticate, updateReview)
router.route("/getAllReviews/:vendorId").get(authenticate, getVendorReviews)

export default router