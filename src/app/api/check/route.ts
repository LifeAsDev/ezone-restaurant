import { NextResponse } from "next/server";

import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";

export async function POST(req: Request) {
  const { email } = await req.json();

  await connectMongoDB();
  const data = await User.findOne({ email: email.toUpperCase() });
  let imageUrl, phone, cart;

  if (data.imageUrl !== undefined) {
    imageUrl = data.imageUrl;
  } else {
    imageUrl = null;
  }
  if (data.cart !== undefined) {
    cart = data.cart;
  } else {
    cart = null;
  }
  if (data.phone !== undefined) {
    phone = data.phone;
  } else {
    phone = "";
  }
  return NextResponse.json(
    {
      message: "Users get",
      imageUrl,
      cart,
      phone,
    },
    { status: 201 }
  );
}
