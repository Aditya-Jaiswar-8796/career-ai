
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import mongoose from "mongoose"
import connectDB from "@/db/db"
import User from "@/models/user.model"
import Profile from "@/models/profile.model"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import bcrypt from "bcrypt"

export async function GET(req) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  await connectDB()

  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    )
  }

  const profile = await getOrCreateProfile(user)

  return NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role }, profile })
}

async function getOrCreateProfile(user) {
  let profile = null

  if (user.profile && mongoose.isValidObjectId(user.profile)) {
    profile = await Profile.findById(user.profile)
  }

  if (!profile) {
    profile = await Profile.findOne({ user: user._id })
    if (profile) {
      user.profile = profile._id
      await user.save()
    }
  }

  if (!profile) {
    try {
      profile = await Profile.create({ user: user._id })
      user.profile = profile._id
      await user.save()
    } catch (error) {
      if (error.code === 11000) {
        profile = await Profile.findOne({ user: user._id })
        if (profile) {
          user.profile = profile._id
          await user.save()
        }
      } else {
        throw error
      }
    }
  }

  return profile
}

export async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  await connectDB()

  const body = await req.json()
  const { resumeJson, profileUpdates, userUpdates, passwordChange } = body

  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    )
  }

  const profile = await getOrCreateProfile(user)

  if (resumeJson) {
    profile.resumeJsonResults.push(resumeJson)
  }

  if (profileUpdates && typeof profileUpdates === "object") {
    Object.assign(profile, profileUpdates)
  }

  if (userUpdates && typeof userUpdates === "object") {
    if (userUpdates.name) {
      user.name = userUpdates.name
    }
    await user.save()
  }

  if (passwordChange && typeof passwordChange === "object") {
    const { currentPassword, newPassword } = passwordChange
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "Current and new password are required" }, { status: 400 })
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Current password is incorrect" }, { status: 401 })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
  }

  await profile.save()

  return NextResponse.json({ success: true, profile })
}
