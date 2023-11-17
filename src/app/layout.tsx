import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { OnboardingProvider } from "./context/MyContext";
import Footer from "./components/Footer";
import { NextAuthProvider } from "./Providers";
const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "éZoné Restaurant",
  description:
    "Dynamic user experience for a restaurant website allowing users to explore the menu, log in for a personalized journey, and seamlessly add items to shopping cart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          <OnboardingProvider>
            <Nav />
            {children}
            <Footer />
          </OnboardingProvider>
        </body>
      </NextAuthProvider>
    </html>
  );
}
