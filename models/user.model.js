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
        enum: ['seeker', 'recruiter', 'user'],
        default: 'seeker',
        required: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
})

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

export default userModel