import "@/styles/globals.css"
import { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { simplex } from "@/lib/simplex"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const objectiveFunction = [60, 30, 20]
  const constraints = [
    [8, 6, 1],
    [4, 2, 1.5],
    [2, 1.5, 0.5],
    [0, 1, 0],
  ]
  const rhs = [48, 20, 8, 5]

  console.log(simplex(objectiveFunction, constraints, rhs))
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background antialiased tabular-nums",
            GeistMono.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="flex flex-col">
              <SiteHeader />
              {children}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
