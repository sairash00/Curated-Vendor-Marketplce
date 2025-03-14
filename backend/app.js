import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// importing routes
import userRoute from './routes/user.routes.js'
import vendorRoute from './routes/vendor.routes.js'
import productRoute from './routes/product.routes.js'

const app = express()

// CORS setup
app.use(cors({
    origin: "http://localhost:5173",
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


// export the app file
export default app