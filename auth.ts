import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

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
        async session({ session , token}) {
          session.user.id = token.id as string
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