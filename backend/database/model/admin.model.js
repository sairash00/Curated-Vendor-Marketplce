import mongoose from ' mongoose'

const adminSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    }
},{timestamps: true})


const Admin = mongoose.model("Admin", adminSchema)
export default Admin