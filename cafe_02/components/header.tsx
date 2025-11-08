"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menü" },
    { href: "/reservierung", label: "Reservierung" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
          <Coffee className="h-6 w-6" />
          <span>Café Sonnengold</span>
        </Link>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
