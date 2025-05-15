import type { Metadata } from "next";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Muvo",
  description: "Online OTT Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthContext>
          <ToasterContext />
          {children}
          <Analytics />
          <SpeedInsights />
        </AuthContext>
      </body>
    </html>
  );
}
