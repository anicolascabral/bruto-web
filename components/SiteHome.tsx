import type { Locale } from "@/lib/locale";
import Editorial from "@/components/Editorial";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Nav from "@/components/Nav";
import Reserva from "@/components/Reserva";
import Reviews from "@/components/Reviews";

export default function SiteHome({ locale }: { locale: Locale }) {
  return (
    <main>
      <Nav locale={locale} />
      <Hero locale={locale} />
      <Events locale={locale} />
      <Gallery locale={locale} />
      <Editorial locale={locale} />
      <Menu locale={locale} />
      <Reserva locale={locale} />
      <Reviews locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
