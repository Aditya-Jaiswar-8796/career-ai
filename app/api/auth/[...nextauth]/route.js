import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/db";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export const authOptions = {
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

      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) return null; // ✅ correct

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) return null; // ✅ correct

        // ✅ IMPORTANT: return clean object
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role, // 👈 include role
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectDB();

        if (!user.email) return false;

        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            role: "user", // ✅ default role
          });
        } else {
          user.role = existingUser.role; // 👈 IMPORTANT
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // ✅ store role
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role; // ✅ expose role
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };