import { NextResponse } from "next/server";

import User from "@/database/user.model";
import dbConnect from "@/lib/dbconnect";
import { getSchema } from "@/lib/validation";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    throw new Error("Internal Server Error", { cause: error });
  }
}

// Create User
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const validatedData = getSchema("UserSchema").safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validatedData.error },
        { status: 400 }
      );
    }

    const { email } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { success: true, message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await User.create(validatedData.data);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
