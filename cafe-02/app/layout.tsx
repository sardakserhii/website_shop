import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Café Sonnengold - Frisch gebacken, mit Liebe serviert",
  description: "Ihr gemütliches Café, Bäckerei und Konditorei in Deutschland",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
