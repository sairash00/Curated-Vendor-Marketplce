import { uploadImage, deleteImage } from "../utils/imagekit.js";
import Product from "../database/model/product.model.js"
import Vendor from "../database/model/vendor.model.js";
import { isValidObjectId } from "mongoose";


// create a new Proect

export const createProduct = async (req, res) => {
    try {
        const {name, description, quantity, price, category} = req.body
        const img = req.file.buffer

        if(Object.values({name, description, quantity, price, category, img}).some(values => values == null)) {
            return res.status(400).json({
                success: false,
                error: "All product details are required"
            })}
        
        const vendorId = req.vendor._id
        if(!vendorId) return res.status(404).json({
            success: false,
            message: "Couldn't get vendor information"
        })


        const {fileId, url} = await uploadImage(img)

        if(!fileId || !url) return res.status(500).json({
            success: false,
            message: "Failed uploading images please try again later"
        })

        

        const product = await Product.create({
            name,
            description,
            quantity,
            price,
            category,
            vendorId,
            image:[{
                id: fileId,
                url
            }]
        })

        if(!product) return res.status(500).json({
            success: false,
            message: "Failed creating product"
        })

        const vendor = await Vendor.findByIdAndUpdate(vendorId, {
            $addToSet: {products: product._id}
        })

        if(!vendor) {
            await Product.findByIdAndDelete(product._id)
            await deleteImage(fileId)
            return res.status(500).json({
                success: false,
                message: "Failed updating vendor product list"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product created successfully",
            product
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {name, description, category, price, quantity, productId} = req.body
        const img = req.file.fileBuffer
        const vendorId = req.vendor._id

        if(!productId || !isValidObjectId(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product id"
            })
        }
        
        if(!vendorId) return res.status(400).json({
            success: false,
            message: "Couldn't get vendor information"
        })

        const product = await Product.findById(productId)

        if(!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        if(name) product.name = name
        if(description) product.description = description
        if(category) product.category = category
        if(price) product.price = price
        if(quantity) product.quantity = quantity
        if(img) {
            promise.all(product.image.map( async (image) => await deleteImage(image.id)))
            const {fileId, url} = await uploadImage(img)
            if(!fileId ||!url) return res.status(500).json({
                success: false,
                message: "Failed uploading images please try again later"
            })
            product.image[{
                id: fileId,
                url
            }]
        }


        await product.save()
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const deleteProduct = async (req,res) => {
    try {
        
        const productId = req.params.id
        const vendorId = req.vendor._id

        if(!productId || !vendorId || !isValidObjectId(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product id or vendor id"
            })
        }

        const vendor = await Vendor.findByIdAndUpdate(vendorId, {
            $pull: {products: productId}
        })

        if(!vendor) return res.status(500).json({
            success: false,
            message: "Failed updating vendor product list"
        })

        const product = await Product.findOneAndDelete({
            _id: productId
        }).select("image")

        if(!product) return res.status(500).json({
            success: false,
            message: "Product not found"
        })

        await Promise.all(
            product.image.map(async (image) => {
                const deletedImage = await deleteImage(image.id);
                if (!deletedImage) {
                    throw new Error("Failed deleting product images");
                }
            })
        );

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const getVendorProducts = async (req, res) => {
    try {
        const vendorId = req.vendor._id
        if(!vendorId) return res.status(400).json({
            success: false,
            message: "Couldn't get vendor information"
        })

        const products = await Product.find({vendorId})

        if(!products || products.length === 0) return res.status(404).json({
            success: false,
            message: "No products found"
        })

        return res.status(200).json({
            success: true,
            message: "Products found successfully",
            products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        
        const productId = req.params.id

        if(!productId || !isValidObjectId(productId)) return res.status(400).json({
            success: false,
            message: "Invalid product id"
        })

        const product = await Product.findById(productId)

        if(!product) return res.status(404).json({
            success: false,
            message: "Product not found"
        })

        return res.status(200).json({
            success: true,
            message: "Product found successfully",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProductByCategory = async (req,res) => {
    try {
        
        const category = req.params.category

        if(!category) return res.status(400).json({
            success: false,
            message: "Invalid category"
        })

        const products = await Product.find({category})

        if(!products || products.length === 0) return res.status(404).json({
            success: false,
            message: "No products found in this category"
        })

        return res.status(200).json({
            success: true,
            message: "Products found successfully",
            products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}