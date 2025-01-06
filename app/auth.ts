import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { getSchemaModel } from "../database";
import dbConnect from "../lib/dbconnect";
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [Google ,Github],
    callbacks: {
        async jwt({ token, user }) {

        if (user) { 
          token.id = user.id
        }
        return token
      },
        async session({ session }) {
          await dbConnect()
          const sessionUser = await getSchemaModel('userschema')!.findOne({email : session.user.email})
          session.user.id = sessionUser._id.toString()
          return session
      },
        async signIn({ user }) {
          const { email, name, image } = user;
          try {
            const res = await fetch(`${baseUrl}/api/create/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                name,
                image,
              }),
            });
        
            if (!res.ok) {
              console.error("Failed to create user:", await res.json());
              return true;
            }
            return true;
          } catch (error) {
            console.error("Sign-in error:", error);
            return false;
          }
        }
      }
    })