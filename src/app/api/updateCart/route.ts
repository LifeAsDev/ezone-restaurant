import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const { email, cart } = await req.json();
  await connectMongoDB();
  const data = await User.findOneAndUpdate(
    {
      email: email.toUpperCase(),
    },
    { cart },
    { new: true }
  );
  return NextResponse.json({ message: "Users update" }, { status: 201 });
}
