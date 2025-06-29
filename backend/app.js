import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// importing routes
import userRoute from './routes/user.routes.js'
import vendorRoute from './routes/vendor.routes.js'
import productRoute from './routes/product.routes.js'
import cartRoute from './routes/cart.routes.js'
import orderRoute from './routes/order.routes.js'
import uploadRoute from './routes/upload.routes.js'
import reviewRoute from './routes/review.routes.js'

const app = express()

// CORS setup
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// middlewares setup
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


//routes setup
app.use("/api/v1/user", userRoute)
app.use("/api/v1/vendor", vendorRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/order", orderRoute)
app.use("/api/v1/upload", uploadRoute)
app.use("/api/v1/review", reviewRoute)

// export the app file
export default app