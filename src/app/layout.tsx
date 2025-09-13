import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PINKY SHOPCO BY GUS - META Page Reports",
  description: "Comprehensive META page reports dashboard with violations tracking - September 13, 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}