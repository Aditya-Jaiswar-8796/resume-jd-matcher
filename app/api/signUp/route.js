import { NextResponse } from "next/server";
import User from "@/models/user.model"
import connectDB from "@/db/db"
export async function POST(req) {
    await connectDB()
    const body = await req.json();

    const { email, password } = body;

    let userExists = await User.findOne({ email });
    if (userExists) {

        return NextResponse.json({
            success: false,
            message: "User Already Exists"
        });
    }
    const user = await User.create({ email, password });

    return NextResponse.json({
        success: true,
        user
    });
}