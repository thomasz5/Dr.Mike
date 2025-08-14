import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Dr. Mike AI - Evidence-informed fitness answers. Instantly.",
  description:
    "A conversational coach inspired by Dr. Mike Israetel's educational style—here to help you reason about training, nutrition, and recovery.",
  generator: "v0.app",
  keywords: ["fitness", "nutrition", "training", "AI coach", "Dr. Mike Israetel"],
  authors: [{ name: "Dr. Mike AI" }],
  openGraph: {
    title: "Dr. Mike AI - Evidence-informed fitness answers",
    description: "A conversational coach for training, nutrition, and recovery guidance.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
