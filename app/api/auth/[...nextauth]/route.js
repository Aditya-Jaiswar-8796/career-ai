import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import connectDB from "@/db/db"
import User from "@/models/user.model"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await connectDB();
        const { email, password } = credentials;

        const user = await User.findOne({ email })

        if (!user) {
          return {message:"User not found"};
        }
        const isValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isValid) {
          return {message:"invalid detaile"}; 
        }
        console.log(user);

        return user;
      }
    }),
  ], callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github" || account.provider === "google") {
        await connectDB();

        if (!user.email) return false;

        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
          });
        }
      }

      return true;
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }