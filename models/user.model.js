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
    role:{
        type: String,
        enum: ['seeker', 'recruiter'],
        default: 'seeker',
        required: true,
    }
})

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

export default userModel