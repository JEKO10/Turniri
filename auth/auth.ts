import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import db from "@/prisma/db";

import authConfig from "../auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  ...authConfig,
});
