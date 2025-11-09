"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Category = "all" | "breakfast" | "lunch" | "desserts" | "drinks"

const categories = [
  { id: "all" as Category, label: "Alle" },
  { id: "breakfast" as Category, label: "Frühstück" },
  { id: "lunch" as Category, label: "Mittagessen" },
  { id: "desserts" as Category, label: "Desserts" },
  { id: "drinks" as Category, label: "Getränke" },
]

const menuItems = [
  {
    id: 1,
    category: "breakfast",
    name: "Croissant",
    description: "Butterig und knusprig",
    price: "2,80 €",
    image: "/golden-croissant.jpg",
  },
  {
    id: 2,
    category: "breakfast",
    name: "Frühstücksplatte",
    description: "Brötchen, Aufschnitt, Käse, Marmelade",
    price: "8,90 €",
    image: "/breakfast-platter-with-bread-cheese.jpg",
  },
  {
    id: 3,
    category: "breakfast",
    name: "Rührei mit Speck",
    description: "Serviert mit frischem Brot",
    price: "6,50 €",
    image: "/scrambled-eggs-with-bacon.jpg",
  },
  {
    id: 4,
    category: "lunch",
    name: "Quiche Lorraine",
    description: "Mit Salat der Saison",
    price: "9,50 €",
    image: "/quiche-lorraine-with-salad.jpg",
  },
  {
    id: 5,
    category: "lunch",
    name: "Flammkuchen",
    description: "Elsässer Art mit Zwiebeln und Speck",
    price: "10,90 €",
    image: "/flammkuchen-tarte-flambee.jpg",
  },
  {
    id: 6,
    category: "lunch",
    name: "Suppe des Tages",
    description: "Mit frischem Brot",
    price: "5,90 €",
    image: "/homemade-soup-in-bowl.jpg",
  },
  {
    id: 7,
    category: "desserts",
    name: "Schwarzwälder Kirschtorte",
    description: "Klassisch und köstlich",
    price: "4,50 €",
    image: "/black-forest-cake.png",
  },
  {
    id: 8,
    category: "desserts",
    name: "Apfelstrudel",
    description: "Mit Vanillesauce",
    price: "3,90 €",
    image: "/apple-strudel-dessert.jpg",
  },
  {
    id: 9,
    category: "desserts",
    name: "Tiramisu",
    description: "Hausgemacht",
    price: "4,20 €",
    image: "/classic-tiramisu.png",
  },
  {
    id: 10,
    category: "drinks",
    name: "Cappuccino",
    description: "Mit Latte Art",
    price: "3,20 €",
    image: "/cappuccino-latte-art.jpg",
  },
  {
    id: 11,
    category: "drinks",
    name: "Espresso",
    description: "Kräftig und aromatisch",
    price: "2,50 €",
    image: "/espresso-in-small-cup.jpg",
  },
  {
    id: 12,
    category: "drinks",
    name: "Heiße Schokolade",
    description: "Mit Sahne",
    price: "3,80 €",
    image: "/hot-chocolate-with-cream.jpg",
  },
]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredItems =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <main className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl font-bold mb-4 text-primary">Unsere Speisekarte</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie unsere vielfältige Auswahl an frisch zubereiteten Speisen und Getränken
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={cn("rounded-full px-6", selectedCategory === category.id && "bg-accent hover:bg-accent/90")}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow group h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        favorites.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600",
                      )}
                    />
                  </button>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
                    <span className="text-lg font-bold text-accent whitespace-nowrap ml-2">{item.price}</span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
