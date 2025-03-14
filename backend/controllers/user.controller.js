import User from '../database/model/user.model.js'
import {hashPassword, comparePassword} from '../utils/bcrypt.js'
import {encryptToken, decryptToken} from '../utils/jwt.js'


// Handling User Registration
export const registerUser = async (req, res) => {
    try {
        const {email, password, name, address, phone} = req.body

        if(Object.values({email, password, name, address, phone}).some(values => values == null)){
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            })
        }

        const existingUser = await User.findOne({email}).select("email")

        if(existingUser) return res.status(400).json({
            success: false,
            message: "User already exists"
        })

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            address,
            phone
        })

        if(!user) return res.status(400).json({
            success: false,
            error: error.message
        })

        user.password = undefined

        const token = encryptToken({email: user.email, id: user._id})
        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: false,
            sameSite: "none",
            httpOnly: false
        }

        return res
        .status(200)
        .cookie("accessToken",token,cookieOptions)
        .json({
            success: true,
            message: "User registered successfully",
            user
        })
        

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// handling user Login
export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body

        if(Object.values({email, password}).some(values => values == null)){
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            })
        }

        const user = await User.findOne({email});

        if(!user) return res.status(401).json({
            success: false,
            message: "User does not exist"
        })

        const isPasswordMatch = await comparePassword(password, user.password);
        user.password = undefined

        if(!isPasswordMatch) return res.status(401).json({
            success: false,
            message: "Incorrect Password"
        })

        const token = encryptToken({email: user.email, id: user._id})
        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: false,
            sameSite: "none",
            httpOnly: false
        }

        return res
        .status(200)
        .cookie("accessToken", token, cookieOptions)
        .json({
            success: true,
            message: "User logged in successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// handling getting user info
export const getUserInfo = async (req, res) => {
    try {
        
        const userId = req.user.id
        if(!userId) return res.status(404).json({
            success: false,
            message: "Couldn't get user information"
        })

        const user  = await User.findById(userId).select("-password")
        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// handling user logout
export const logout = (req, res) => {
    try {
        res.clearCookie("accessToken")
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
export const deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user.id
        if(!userId) return res.status(404).json({
            success: false,
            message: "Couldn't delete user account"
        })

        const user = await User.findByIdAndDelete(userId)

        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const updateUserProfile = async (req, res) => {
    try {

        const {email, username, password, address, phone} = req.body
        const userId = req.user.id

        if(!userId) return res.status(404).json({ 
            success: false,
            message: "Couldn't update user profile"
        })

        const user = await User.findById(userId).select("-password")

        if(!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        if(email) user.email = email
        if(user) user.user = user
        if(password) user.password = await hashPassword(password)
        if(address) user.address = address
        if(phone) user.phone = parseInt(phone)

        await user.save()

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}