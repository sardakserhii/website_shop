"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const featuredItems = [
  {
    id: 1,
    name: "Croissant",
    description: "Butterig, knusprig und unwiderstehlich",
    price: "2,80 €",
    image: "/golden-buttery-croissant-on-plate.jpg",
  },
  {
    id: 2,
    name: "Schwarzwälder Kirschtorte",
    description: "Klassisch und köstlich",
    price: "4,50 €",
    image: "/black-forest-cake-slice-with-cherries.jpg",
  },
  {
    id: 3,
    name: "Cappuccino",
    description: "Perfekt aufgeschäumte Milch",
    price: "3,20 €",
    image: "/cappuccino-with-latte-art-in-ceramic-cup.jpg",
  },
  {
    id: 4,
    name: "Apfelstrudel",
    description: "Warm serviert mit Vanillesauce",
    price: "3,90 €",
    image: "/apple-strudel-with-vanilla-sauce.jpg",
  },
  {
    id: 5,
    name: "Laugenbrezel",
    description: "Frisch aus dem Ofen",
    price: "1,50 €",
    image: "/fresh-german-pretzel-with-salt.jpg",
  },
]

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const next = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= featuredItems.length ? 0 : prev + 1))
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, featuredItems.length - itemsPerView) : prev - 1))
  }

  const visibleItems = featuredItems.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
                      <span className="text-lg font-bold text-accent">{item.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Mehr erfahren
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          disabled={currentIndex === 0}
          className="rounded-full bg-transparent"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          disabled={currentIndex + itemsPerView >= featuredItems.length}
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
