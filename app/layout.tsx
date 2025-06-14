import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
 
} from '@clerk/nextjs'

const poppins = Poppins({
 subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});



export const metadata: Metadata = {
  title: "Evisto",
  description: "Evisto is the platform for event management, where you can create, manage, and promote your events seamlessly.",
  icons: {
    icon: "/assets/images/logo5.png",
  }
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={poppins.variable}
      >
        
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
