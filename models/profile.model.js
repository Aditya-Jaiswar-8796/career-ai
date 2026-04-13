import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  headline: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  summary: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: {
    type: [
      {
        title: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    default: [],
  },
  education: {
    type: [
      {
        school: String,
        degree: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    default: [],
  },
  links: {
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
  },
  phone: {
    type: String,
    default: "",
  },
  currentTitle: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  yearsExperience: {
    type: Number,
    default: 0,
  },
  resumeJsonResults: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
}, {
  timestamps: true,
})

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema)

export default Profile
