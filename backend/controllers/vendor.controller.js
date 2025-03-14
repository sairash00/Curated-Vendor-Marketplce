import Vendor from '../database/model/vendor.model.js'
import {hashPassword, comparePassword} from '../utils/bcrypt.js'
import {encryptToken} from '../utils/jwt.js'


// Handling Vendor Registration
export const registerVendor = async (req, res) => {
    try {
        const {name , businessName, email, password, address, phone} = req.body

        if(Object.values({email,businessName, password, name, address, phone}).some(values => values == null)){
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            })
        }

        const existingVendor = await Vendor.findOne({email}).select("email")

        if(existingVendor) return res.status(400).json({
            success: false,
            message: "Vendor already exists"
        })

        const hashedPassword = await hashPassword(password);
        const vendor = await Vendor.create({
            email,
            businessName,
            password: hashedPassword,
            name,
            address,
            phone
        })

        if(!vendor) return res.status(400).json({
            success: false,
            error: error.message
        })

        vendor.password = undefined

        const token = encryptToken({email: vendor.email, id: vendor._id})
        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: false,
            sameSite: "none",
            httpOnly: false
        }

        return res
        .status(200)
        .cookie("vendorAccessToken",token,cookieOptions)
        .json({
            success: true,
            message: "Vendor registered successfully",
            vendor
        })
        

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// handling Vendor Login
export const loginVendor = async (req,res) => {
    try {
        const {email, password} = req.body

        if(Object.values({email, password}).some(values => values == null)){
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            })
        }

        const vendor = await Vendor.findOne({email});

        if(!vendor) return res.status(401).json({
            success: false,
            message: "Vendor does not exist"
        })

        const isPasswordMatch = await comparePassword(password, vendor.password);
        vendor.password = undefined

        if(!isPasswordMatch) return res.status(401).json({
            success: false,
            message: "Incorrect Password"
        })

        const token = encryptToken({email: vendor.email, id: vendor._id})
        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: false,
            sameSite: "none",
            httpOnly: false
        }

        return res
        .status(200)
        .cookie("vendorAccessToken", token, cookieOptions)
        .json({
            success: true,
            message: "Vendor logged in successfully",
            vendor
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// handling getting vendor info
export const getVendorInfo = async (req, res) => {
    try {
        
        const vendorId = req.vendor.id
        if(!vendorId) return res.status(404).json({
            success: false,
            message: "Couldn't get Venfor information"
        })

        const vendor  = await Vendor.findById(vendorId).select("-password")
        if(!vendor) return res.status(404).json({
            success: false,
            message: "Vendor not found"
        })

        return res.status(200).json({
            success: true,
            vendor
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// handling vendor logout
export const logout = (req, res) => {
    try {
        res.clearCookie("vendorAccessToken")
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// handling user account deletion
export const deleteAccount = async (req, res) => {
    try {
        const vendorId = req.vendor.id
        if(!vendorId) return res.status(404).json({
            success: false,
            message: "Couldn't delete Vendor account"
        })

        const vendor = await Vendor.findByIdAndDelete(vendorId)

        if(!vendor) return res.status(404).json({
            success: false,
            message: "Vendor not found"
        })

        return res.status(200).json({
            success: true,
            message: "Vendor deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {

        const {email, businessName , name, password, address, phone} = req.body
        const vendorId = req.vendor.id

        if(!vendorId) return res.status(404).json({
            success: false,
            message: "Couldn't update Vendor profile"
        })

        const vendor = await Vendor.findById(vendorId).select("-password")

        if(!vendor) return res.status(404).json({
            success: false,
            message: "Vendor not found"
        })

        if(email) vendor.email = email
        if(businessName) vendor.businessName = businessName
        if(name) vendor.name = name
        if(password) vendor.password = await hashPassword(password)
        if(address) vendor.address = address
        if(phone) vendor.phone = parseInt(phone)

        await vendor.save()

        return res.status(200).json({
            success: true,
            message: "vendor profile updated successfully",
            vendor
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}