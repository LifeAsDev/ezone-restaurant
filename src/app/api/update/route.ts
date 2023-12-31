import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const { phone, imageUrl, email, name } = await req.json();
  await connectMongoDB();
  const data = await User.findOneAndUpdate(
    {
      email: email.toUpperCase(),
    },
    { name, phone, imageUrl },
    { new: true }
  );
  return NextResponse.json(
    { message: "Users update", imageUrl, name },
    { status: 201 }
  );
}
