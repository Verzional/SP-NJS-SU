import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ profile, user }) {
      if (!profile?.email) {
        throw new Error("No profile email found");
      }

      if (profile.email.includes("ciputra.ac.id")) {
        if (user && user.id) {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
          });

          if (dbUser) {
            let assignedRole: Role = Role.VIEWER;
            
            if (profile.email === "vgunawan08@student.ciputra.ac.id") {
              assignedRole = Role.TECH;
            }

            await prisma.user.update({
              where: { id: user.id },
              data: { role: assignedRole },
            });
          }
        }
        
        revalidatePath("/dashboard/tech");
        
        return true;
      } else {
        throw new Error("You must use a @ciputra.ac.id email to sign in");
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true },
        });
        token.role = dbUser?.role || Role.VIEWER;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
