import User from "../database/model/user.model.js";
import Vendor from "../database/model/vendor.model.js";
import { uploadImage, deleteImage } from "../utils/imagekit";


// upload user profile Image
export const uploadUserProfile = async (req,res) => {
    try {
       const img = req.file.buffer
       const userId = req.user.id

       if(!img) return res.status(400).json({
        success: false,
        message: "Image is required"
       })

       const uploadedImage = await uploadImage(img)

       if(!uploadedImage) return res.status(500).json({
        success: false,
        message: "Couldn't upload image"
       })

       const user = await User.findByIdAndUpdate(userId, {
        profileImage: {
            id: uploadedImage.fileId,
            url: uploadedImage.url
        }
       })

       if(!user) {
        await deleteImage(uploadedImage.fileId)
        return res.status(500).json({
            success: false,
            message: "Couldn't upload image"
        })
       }

       return res.status(200).json({
        success: true,
        message: "Profile image updated successfully"
       })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// upload Vendor profile Image
export const uploadVendorProfile = async (req,res) => {
    try {
       const img = req.file.buffer
       const userId = req.vendor.id

       if(!img) return res.status(400).json({
        success: false,
        message: "Image is required"
       })

       const uploadedImage = await uploadImage(img)

       if(!uploadedImage) return res.status(500).json({
        success: false,
        message: "Couldn't upload image"
       })

       const user = await Vendor.findByIdAndUpdate(userId, {
        profileImage: {
            id: uploadedImage.fileId,
            url: uploadedImage.url
        }
       })

       if(!user) {
        await deleteImage(uploadedImage.fileId)
        return res.status(500).json({
            success: false,
            message: "Couldn't upload image"
        })
       }

       return res.status(200).json({
        success: true,
        message: "Profile image updated successfully"
       })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
