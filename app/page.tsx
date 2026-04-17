import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Editorial from "@/components/Editorial";
import Menu from "@/components/Menu";
import Reserva from "@/components/Reserva";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Events />
      <Gallery />
      <Editorial />
      <Menu />
      <Reserva />
      <Reviews />
      <Footer />
    </main>
  );
}
