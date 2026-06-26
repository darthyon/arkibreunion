import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { AppShell } from "@/components/layout/AppShell";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { PreviewProvider } from "@/components/PreviewProvider";
import "@/styles/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap"
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Arkib Reunion Negara",
  description: "Rekod rasmi untuk gathering yang katanya reunion tapi tahunan.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html
        lang="ms"
        data-scroll-behavior="smooth"
        className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <body>
          <ConvexClientProvider>
            <PreviewProvider>
              <AppShell>{children}</AppShell>
            </PreviewProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
