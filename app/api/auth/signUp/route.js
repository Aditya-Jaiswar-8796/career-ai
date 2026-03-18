import { NextResponse } from "next/server";
import user from "@/models/user.model";
import connectDB from "@/db/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password } = body;

    console.log(body)
    const userExists = await user.findOne({ email });
    if (userExists) {
      return NextResponse.json({
        success: false,
        message: "User Already Exists",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10)


    const User = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      user: { name: User.name, email: User.email, id: User._id },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}