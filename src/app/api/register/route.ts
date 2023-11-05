import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  let { email, password } = await req.json();
  email = email.toUpperCase();
  const name = email;
  let hashedPassword = "";
  await connectMongoDB();
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const userExist1 = await User.findOne({
    email: email,
  }).select("email");

  if (userExist1) {
    console.log("user existed");

    return NextResponse.json(
      { message: "Email already in use" },
      { status: 201 }
    );
  } else {
    console.log("user created");
    User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  }
}
