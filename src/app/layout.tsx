import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Poppins, Luckiest_Guy } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
});
const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pokédex Explorer",
  description: "Search, filter, and explore Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <header className="bg-[#CC0000] text-white shadow-md">
          <div className="max-w-[1280px] mx-auto px-4 py-6 flex justify-between items-center">
            <Link
              href="/"
              className={`${luckiestGuy.className} text-3xl tracking-wide font-medium -skew-1 drop-shadow-2xl `}
            >
              Pokedex Explorer
            </Link>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/favorites" className="hover:underline">
                Favorites
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-[1280px] mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
