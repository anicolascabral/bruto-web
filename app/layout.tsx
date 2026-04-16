import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// Archivo is the closest libre match to the PDF typography (Acumin Variable Concept).
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BRUTO — tapas & vinilos",
  description:
    "BRUTO no es solo un bar. Es una forma de estar. Tapas, vinilos, amigos y tiempo bien usado. Isidoro Macabich 30, Santa Eulària des Riu, Ibiza.",
  openGraph: {
    title: "BRUTO — tapas & vinilos",
    description: "Tapas. Vinilos. Amigos. Tiempo bien usado.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-black">
      <body className={`${archivo.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
