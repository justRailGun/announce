import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import  {ThemeProvider}  from "@/components/Theme"
import {NuqsAdapter} from "nuqs/adapters/next/app";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster"
const Inter = localFont({
  src: "./fonts/InterFont.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});
const SpaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-space-grotesk",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body 
          className={`${Inter.variable} ${SpaceGrotesk.className} antialiased`}
        >
          <ThemeProvider attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NuqsAdapter >
                {children}
              </NuqsAdapter>  
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
