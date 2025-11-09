"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Clock, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { FeaturedCarousel } from "@/components/featured-carousel"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/cozy-cafe-coffee-and-fresh-pastries-on-wooden-tabl.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-balance">
            Frisch gebacken, mit Liebe serviert
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance max-w-2xl mx-auto">
            Genießen Sie handgemachte Köstlichkeiten in gemütlicher Atmosphäre
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
            <Link href="/reservierung">Jetzt reservieren</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-8 py-4 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <span>Mo–Fr 7:00–18:00 | Sa–So 8:00–16:00</span>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold mb-6 text-primary">Unsere Geschichte</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Seit über 20 Jahren verwöhnen wir unsere Gäste mit frisch gebackenen Spezialitäten und aromatischem
                Kaffee. Bei uns steht Qualität an erster Stelle – wir verwenden ausschließlich regionale Zutaten und
                backen alles täglich frisch.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Unser freundliches Team heißt Sie herzlich willkommen und sorgt dafür, dass Sie sich bei uns wie zu
                Hause fühlen. Ob zum Frühstück, Mittagessen oder für eine süße Pause zwischendurch – bei uns sind Sie
                immer richtig.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img src="/artisan-baker-preparing-fresh-bread-in-cozy-bakery.jpg" alt="Unsere Bäckerei" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold mb-4 text-primary">Unsere Bestseller</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie unsere beliebtesten Spezialitäten, täglich frisch für Sie zubereitet
            </p>
          </motion.div>

          <FeaturedCarousel />
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Öffnungszeiten</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Montag – Freitag</p>
                    <p className="font-semibold text-foreground">7:00 – 18:00</p>
                    <p className="mt-2">Samstag – Sonntag</p>
                    <p className="font-semibold text-foreground">8:00 – 16:00</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Adresse</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Sonnenstraße 42</p>
                    <p>80331 München</p>
                    <p>Deutschland</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Kontakt</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Telefon:</p>
                    <p className="font-semibold text-foreground">+49 89 1234567</p>
                    <p className="mt-2">E-Mail:</p>
                    <p className="font-semibold text-foreground">info@sonnengold.de</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
