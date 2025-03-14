import User from '../database/model/user.model.js'
import Vendor from '../database/model/vendor.model.js'
import { decryptToken } from '../utils/jwt.js'

// authenticate function for user authentication
export const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken || accessToken === "") return res.status(400).json({
            success: false,
            message: "Please login first "
        })

        const data = decryptToken(accessToken)
        

        if(!data) return res.status(400).json({
            success: false,
            message: "Invalid token"
        })

        const user = await User.findById(data.id).select("-password")

        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:  error.message
        })
    }
}

// authenticate function for Vendor authentication
export const authenticateVendor = async (req, res, next) => {
    try {
        const accessToken = req.cookies.vendorAccessToken
        if(!accessToken || accessToken === "") return res.status(400).json({
            success: false,
            message: "Please login first "
        })

        const data = decryptToken(accessToken)
        
        if(!data) return res.status(400).json({
            success: false,
            message: "Invalid token"
        })

        const vendor = await Vendor.findById(data.id).select("-password")

        if(!vendor) return res.status(404).json({
            success: false,
            message: "Vendor not found"
        })

        req.vendor = vendor
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:  error.message
        })
    }
}