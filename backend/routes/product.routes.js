import express from 'express'
import { authenticateVendor } from '../middlewares/authentication.middleware.js'
import { createProduct, deleteProduct, getProductByCategory, getProductById, getVendorProducts, updateProduct } from '../controllers/product.controller.js'
import upload from '../middlewares/multer.middleware.js'

const router = express.Router()

// all the routing will be handled here

router.route("/create").post(authenticateVendor, upload.single("image"), createProduct)
router.route("/update").post(authenticateVendor, upload.single("image"), updateProduct)
router.route("/delete/:id").post(authenticateVendor, deleteProduct)
router.route("/getAllProducts").get(authenticateVendor, getVendorProducts)
router.route("/getProductById/:id").get(authenticateVendor, getProductById)
router.route("/getProductsByCategory/:category").get(authenticateVendor, getProductByCategory)



export default router