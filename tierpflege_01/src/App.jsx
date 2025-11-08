import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Phone, CalendarCheck, MessageCircle, ChevronRight, PawPrint, MapPin, ArrowUp } from "lucide-react";

/**
 * Tailwind preset: container mx-auto max-w-[1200px]; rounded-2xl; shadow-xl; soft gradients.
 * Replace placeholder images with DALL·E outputs once generated.
 */

const gradients = {
  peach: "bg-gradient-to-br from-[#FFB38A] to-[#FFA06A]",
  mint: "bg-gradient-to-br from-[#86C8BC] to-[#6DB7A8]",
  violet: "bg-gradient-to-br from-[#C7B0F5] to-[#B39BEC]",
  blue: "bg-gradient-to-br from-[#87B9F7] to-[#6FA6EF]",
};

const images = {
  cat: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1600&auto=format&fit=crop",
  dogS: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1600&auto=format&fit=crop",
  dogM: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop",
  dogL: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1600&auto=format&fit=crop",
  groomer: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop",
  before: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop",
  after: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1600&auto=format&fit=crop",
};

const tabs = [
  { id: "cat", label: "Katzen", img: images.cat, gradient: gradients.peach },
  { id: "small", label: "Hunde bis 10 kg", img: images.dogS, gradient: gradients.blue },
  { id: "medium", label: "Hunde 10–30 kg", img: images.dogM, gradient: gradients.mint },
  { id: "large", label: "Hunde ab 30 kg", img: images.dogL, gradient: gradients.peach },
];

function FabStack() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      <a href="tel:+4900000000" className="p-3 rounded-full bg-[#FF6B45] text-white shadow-lg hover:bg-[#F15833] transition"><Phone size={20} /></a>
      <a href="#booking" className="p-3 rounded-full bg-white text-[#FF6B45] border border-orange-200 shadow-lg hover:bg-orange-50 transition"><CalendarCheck size={20} /></a>
      <a href="https://wa.me/" className="p-3 rounded-full bg-white text-[#10b981] border border-emerald-200 shadow-lg hover:bg-emerald-50 transition"><MessageCircle size={20} /></a>
      <button onClick={toTop} className="p-3 rounded-full bg-white text-gray-700 border shadow hover:bg-gray-50"><ArrowUp size={20} /></button>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-white/40">
      <div className="container mx-auto max-w-[1200px] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl"><PawPrint className="text-[#FF6B45]" /> Tierpflege</div>
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <a href="#services" className="hover:text-gray-900">Leistungen</a>
          <a href="#team" className="hover:text-gray-900">Team</a>
          <a href="#proof" className="hover:text-gray-900">Bewertungen</a>
          <a href="#service-area" className="hover:text-gray-900">Einsatzgebiet</a>
          <a href="#faq" className="hover:text-gray-900">FAQ</a>
        </nav>
        <a href="#booking" className="inline-flex items-center gap-2 rounded-full bg-[#FF6B45] text-white px-4 py-2 shadow hover:bg-[#F15833]">Online buchen <ChevronRight size={16} /></a>
      </div>
    </header>
  );
}

function Hero() {
  const [active, setActive] = useState("cat");
  const tab = useMemo(() => tabs.find(t => t.id === active) ?? tabs[0], [active]);

  return (
    <section id="hero" className={`${tab.gradient} relative overflow-hidden`}>
      <div className="container mx-auto max-w-[1200px] px-4 py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full">Sanftes Grooming • Stressfrei</span>
          <h1 className="mt-5 text-5xl md:text-6xl font-extrabold leading-tight">Tierpflege & Grooming mit Vertrauen</h1>
          <p className="mt-4 text-lg/7 text-white/90">Schneiden, Trimmen, Baden, tierärztlicher Check. Hausbesuch oder Termin im Salon. Liebevolle Fürsorge für Ihr Tier.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#booking" className="rounded-full bg-white text-gray-900 px-5 py-3 font-medium shadow hover:shadow-md">Online buchen</a>
            <a href="#services" className="rounded-full border border-white/70 text-white px-5 py-3 hover:bg-white/10">Leistungen ansehen</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={`px-4 py-2 rounded-full text-sm  backdrop-blur-md border text-black ${active === t.id ? "bg-orange-400/50 text-gray-900" : "bg-white/20 text-white border-white/40"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/40">
            <img src={tab.img} alt={tab.label} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 left-6 bg-white text-gray-900 rounded-2xl shadow p-4 flex items-center gap-3">
            <CalendarCheck className="text-[#FF6B45]" />
            <div>
              <div className="text-sm text-gray-600">Schnelle Terminvergabe</div>
              <div className="font-semibold">Freie Slots heute</div>
            </div>
          </div>
        </div>
      </div>
      <svg className="pointer-events-none absolute -bottom-[1px] left-0 w-full z-0" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white" />
      </svg>
    </section>
  );
}

function Trust() {
  return (
    <section id="team" className={`${gradients.blue} relative text-white overflow-hidden`}>
      <div className="container mx-auto max-w-[1200px] px-4 py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold">Tierärzt:innen und Groomer mit Herz</h2>
          <p className="mt-4 text-white/90">Zertifizierte Spezialist:innen, sanfte Methoden, keine medikamentöse Sedierung. Wir begleiten auch sensible Tiere.</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm/6">
            <li className="bg-white/15 rounded-xl px-4 py-3">Über 7 Jahre Erfahrung</li>
            <li className="bg-white/15 rounded-xl px-4 py-3">Tierärztliche Kontrolle beim Termin</li>
            <li className="bg-white/15 rounded-xl px-4 py-3">Premium-Kosmetik</li>
            <li className="bg-white/15 rounded-xl px-4 py-3">Kartenzahlung & online möglich</li>
          </ul>
          <a href="#booking" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-5 py-3 font-medium shadow hover:shadow-md">Termin finden <ChevronRight size={16} /></a>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/40">
          <img src={images.groomer} alt="Unser Team" className="w-full h-full object-cover" />
        </div>
      </div>
      <svg className="pointer-events-none absolute -bottom-[1px] left-0 w-full z-0" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="url(#cut)" />
        <defs>
          <linearGradient id="cut" x1="0" x2="1">
            <stop offset="0%" stopColor="#FFB38A" />
            <stop offset="100%" stopColor="#FFA06A" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}

function Proof() {
  return (
    <section id="proof" className={`${gradients.peach} text-white relative overflow-hidden`}>
      <div className="container mx-auto max-w-[1200px] px-4 py-24 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold">Unsere Erfolge</h2>
        <p className="mt-3 text-white/90 max-w-2xl">Über 2.000 zufriedene Kund:innen, hoher NPS und hunderte Vorher/Nachher Stories. Ein Beispiel:</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/30"><img src={images.before} alt="Vorher" className="w-full h-full object-cover" /></div>
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/30"><img src={images.after} alt="Nachher" className="w-full h-full object-cover" /></div>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

          {["7 Jahre Erfahrung", "2,1k+ Kund:innen", "4,9★ Bewertung", "24h Erinnerungen"].map((t, i) => (
            <div
              key={i}
              className="
        relative rounded-2xl px-5 py-6
        text-zinc-900                       /* тёмный текст для контраста */
        bg-white/70                         /* 70% белая подложка */
        backdrop-blur-md                    /* стабилизируем фон */
        ring-1 ring-white/40                /* «стеклянный» бордер */
        shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        font-semibold
        transition
        hover:bg-white/80 hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]
      "
            >
              {t}
            </div>
          ))}

        </div>
      </div>
      <svg className="pointer-events-none absolute -bottom-[1px] left-0 w-full z-0" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white" />
      </svg>
    </section>
  );
}

function Services() {
  const items = [
    { title: "Baden & Föhnen", price: "ab 30 €", desc: "Hypoallergene Shampoos, schonendes Trocknen." },
    { title: "Schneiden/Trimming", price: "ab 45 €", desc: "Alle Rassen, stressfrei und typgerecht." },
    { title: "Pfoten & Krallen", price: "ab 15 €", desc: "Schneiden, Feilen, Pflege der Ballen." },
    { title: "Tierärztlicher Check", price: "ab 25 €", desc: "Basis-Check-up und Pflegeempfehlungen." },
  ];
  return (
    <section id="services" className={`${gradients.mint} relative text-white overflow-hidden`}>
      <div className="container mx-auto max-w-[1200px] px-4 py-24 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold">Maximale Hygiene – null Risiken</h2>
        <p className="mt-3 text-white/90 max-w-2xl">Wir arbeiten mit sterilen Werkzeugen und individuellen Sets.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.title} className="bg-white/15 rounded-2xl p-5 backdrop-blur ring-1 ring-white/30 flex flex-col">
              <div className="text-lg font-semibold">{it.title}</div>
              <div className="mt-1 text-white/80">{it.desc}</div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="text-xl font-bold">{it.price}</div>
                <a href="#booking" className="text-sm underline underline-offset-4">Termin buchen</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <svg className="pointer-events-none absolute -bottom-[1px] left-0 w-full z-0" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="url(#violet)" />
        <defs>
          <linearGradient id="violet" x1="0" x2="1">
            <stop offset="0%" stopColor="#C7B0F5" />
            <stop offset="100%" stopColor="#B39BEC" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}

function ServiceArea() {
  const [radius, setRadius] = useState(5000); // meters
  const center = [52.52, 13.405]; // Berlin demo
  const pretty = (m) => `${(m / 1000).toFixed(0)} km`;
  return (
    <section id="service-area" className="relative bg-white">
      <div className="container mx-auto max-w-[1200px] px-4 py-24 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Einsatzgebiet</h2>
          <p className="mt-3 text-gray-600">Wählen Sie den Radius – wir zeigen, ob wir zu Ihnen kommen. Hausbesuche und Salontermine sind möglich.</p>
          <div className="mt-4 flex gap-2">
            {[5000, 10000, 15000].map(r => (
              <button key={r} onClick={() => setRadius(r)} className={`px-4 py-2 rounded-full border ${radius === r ? "bg-[#FF6B45] text-white border-[#FF6B45]" : "bg-white text-gray-800 border-gray-200"}`}>{pretty(r)}</button>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-gray-700"><MapPin className="text-[#FF6B45]" /> Unser Salon: Rosenthaler Platz, Berlin</div>
          <a href="#booking" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF6B45] text-white px-5 py-3 font-medium shadow hover:bg-[#F15833]">Termin prüfen <ChevronRight size={16} /></a>
        </div>
        <div className="rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow">
          <MapContainer center={center} zoom={12} style={{ height: 420, width: "100%" }} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center}>
              <Popup>Salon Tierpflege</Popup>
            </Marker>
            <Circle center={center} radius={radius} pathOptions={{ color: "#FF6B45" }} />
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Ist eine Sedierung nötig?", a: "Nein. Wir arbeiten mit sanften Fixierungstechniken und gönnen dem Tier Pausen." },
    { q: "Dürfen Halter:innen dabei sein?", a: "Ja, gerne. Bei Hausbesuchen sind Besitzer:innen ohnehin in der Nähe." },
    { q: "Wie bereite ich mein Tier vor?", a: "Gassi vor dem Termin, Futter spätestens 2 Stunden vorher, Lieblingsspielzeug bereithalten." },
  ];
  return (
    <section id="faq" className={`${gradients.violet} text-white relative overflow-hidden`}>
      <div className="container mx-auto max-w-[1200px] px-4 py-24 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold">Fragen & Antworten</h2>
        <div className="mt-6 divide-y divide-white/20 bg-white/10 rounded-2xl overflow-hidden">


          {items.map((it, i) => (
            <details
              key={i}
              className="
        group rounded-xl overflow-hidden
        bg-white/70 backdrop-blur-md      /* стеклянная подложка */
        ring-1 ring-white/40 shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        open:bg-white/80 transition
        text-zinc-900                     /* тёмный текст для контраста */
      "
            >
              <summary
                className="
          marker:content-[''] list-none cursor-pointer
          px-6 py-5 flex items-center justify-between gap-4
          font-semibold select-none
          focus:outline-none
          focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white/70
        "
              >
                <span>{it.q}</span>
                <ChevronRight className="shrink-0 transition-transform duration-200 group-open:rotate-90 text-zinc-700" />
              </summary>

              <div className="px-6 pb-6 pt-1 text-zinc-700">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
      <svg className="pointer-events-none absolute -bottom-[1px] left-0 w-full z-0" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white" />
      </svg>
    </section>
  );
}

function CTAFinal() {
  return (
    <section id="cta-final" className={`${gradients.peach} text-white relative overflow-hidden`}>
      <div className="container mx-auto max-w-[1200px] px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold">Wir schenken Halter:innen Ruhe & Sicherheit</h2>
          <p className="mt-3 text-white/90">Buchen Sie online – wir finden die passende Zeit und den richtigen Rahmen.</p>
          <a href="#booking" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-5 py-3 font-medium shadow hover:shadow-md">Online buchen <ChevronRight size={16} /></a>
        </div>
        <div className="rounded-2xl overflow-hidden ring-1 ring-white/40 shadow-xl">
          <img src={images.dogL} alt="Glücklicher Hund" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto max-w-[1200px] px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2 font-semibold text-gray-900"><PawPrint className="text-[#FF6B45]" /> Tierpflege</div>
        <div>© {new Date().getFullYear()} Tierpflege. Alle Rechte vorbehalten.</div>
        <div className="flex gap-4"><a href="#" className="hover:text-gray-900">Datenschutz</a><a href="#" className="hover:text-gray-900">AGB</a></div>
      </div>
    </footer>
  );
}

function BookingSheet() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ kind: "dog", weight: "<10", service: "groom", date: "", name: "", phone: "" });

  return (
    <div id="booking" className="container mx-auto max-w-[1200px] px-4 -mt-10 md:-mt-14 relative z-20">
      <div className="rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-6 md:p-8 grid md:grid-cols-3 gap-6 items-end">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold">Schnelle Online-Buchung</h3>
          <p className="text-gray-600 mt-1">3 Schritte: Tier → Leistung → Zeit</p>
        </div>
        <button onClick={() => setOpen(true)} className="justify-self-end rounded-full bg-[#FF6B45] text-white px-5 py-3 font-medium shadow hover:bg-[#F15833]">Formular öffnen</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/40" role="dialog" aria-modal>
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="font-semibold">Schritt {step} von 3</div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">Schließen</button>
            </div>
            <div className="p-6 grid gap-4">
              {step === 1 && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <select className="input" value={form.kind} onChange={e => setForm({ ...form, kind: e.target.value })}>
                    <option value="dog">Hund</option>
                    <option value="cat">Katze</option>
                  </select>
                  <select className="input" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })}>
                    <option value="<10">bis 10 kg</option>
                    <option value="10-30">10–30 kg</option>
                    <option value=">30">ab 30 kg</option>
                  </select>
                  <input className="input" placeholder="Rasse (optional)" />
                </div>
              )}
              {step === 2 && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <select className="input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="groom">Grooming</option>
                    <option value="bath">Baden</option>
                    <option value="nails">Krallenpflege</option>
                    <option value="vet">Tierarzt-Check</option>
                  </select>
                  <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  <input className="input" type="time" />
                </div>
              )}
              {step === 3 && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <input className="input" placeholder="Ihr Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input className="input" placeholder="Telefonnummer" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  <input className="input" placeholder="Kommentar" />
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
              <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">Zurück</button>
              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)} className="px-5 py-2 rounded-full bg-[#FF6B45] text-white hover:bg-[#F15833]">Weiter</button>
              ) : (
                <button onClick={() => { setOpen(false); alert("Danke! Wir melden uns zur Bestätigung.") }} className="px-5 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700">Absenden</button>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .input{ @apply w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-orange-200; }
      `}</style>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="text-gray-900">
      <Header />
      <Hero />
      <BookingSheet />
      <Trust />
      <Proof />
      <Services />
      <ServiceArea />
      <FAQ />
      <CTAFinal />
      <Footer />
      <FabStack />
    </div>
  );
}
