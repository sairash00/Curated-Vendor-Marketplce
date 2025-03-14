import express from 'express'
import {authenticate} from '../middlewares/authentication.middleware.js'
import { deleteUserAccount, getUserInfo, loginUser, logout, registerUser, updateUserProfile } from '../controllers/user.controller.js'

const router = express.Router()

// all the routing will be handled here
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getUserDetails").get(authenticate, getUserInfo)
router.route("/logout").post(authenticate, logout)
router.route("/deleteUser").post(authenticate, deleteUserAccount)
router.route("/updateUser").post(authenticate, updateUserProfile)

export default router