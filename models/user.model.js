import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

export default userModel