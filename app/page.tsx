import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Industries from "@/components/landing/Industries";
import Features from "@/components/landing/Features";
import PricingPreview from "@/components/landing/PricingPreview";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Industries />
      <Features />
      <PricingPreview />
      <Footer />
    </>
  );
}