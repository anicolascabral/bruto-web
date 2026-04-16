import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Editorial from "@/components/Editorial";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Gallery />
      <Editorial />
      <Menu />
      <Footer />
    </main>
  );
}
