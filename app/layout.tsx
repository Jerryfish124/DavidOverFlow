import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "OverFlow",
  description:
    "A re-imagined stack overflow clone with a focus on" +
    " community. Explore questions, answers, and users. Ask questions and" +
    " get answers. Or Generate them with AI! Earn reputation and badges. Vote" +
    " and" +
    " comment on" +
    " questions and answers. Join the community today!",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: "primary-gradient",
            footerActionLink: "primary-text-gradient hover:text-primary-500",
          },
        }}
      >
        <ThemeProvider>
          <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
            {children}
          </body>
        </ThemeProvider>
      </ClerkProvider>
    </html>
  );
}
