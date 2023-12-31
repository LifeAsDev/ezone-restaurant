import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      console.log(account?.provider);
      if (account?.provider === "google") {
        const { email } = user;

        await connectMongoDB();

        const userExist1 = await User.findOne({
          email: email?.toUpperCase(),
        }).select("email name");

        if (userExist1) {
          console.log("user existed logging");

          return true;
        } else {
          console.log("user created");

          User.create({
            name: email?.toUpperCase(),
            email: email?.toUpperCase(),
            password: " ",
          });
          return true;
        }
      } else {
        return true;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        password: {
          label: "Password",
          type: "password",
        },
        email: {
          label: "Email",
          type: "text",
        },
      },

      async authorize(credentials) {
        await connectMongoDB();
        const user =
          credentials?.email !== " "
            ? await User.findOne({
                email: credentials?.email.toUpperCase(),
              })
            : null;

        if (!user) {
          console.log("Invalid Email");
          throw new Error("Invalid Email");
        }

        if (
          user.password !== " " &&
          (await compare(credentials!.password, user.password))
        ) {
          console.log("sesion iniciada");
          return user;
        } else {
          console.log("Invalid Password");
          throw new Error("Invalid Password");
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
