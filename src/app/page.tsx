import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoreServicesSection from "@/components/CoreServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import IndustriesSection from "@/components/IndustriesSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CoreServicesSection />
      <WhyUsSection />
      <IndustriesSection />
      <CtaSection />
      <Footer />
      
      {/* Other sections will be added here */}
    </main>
  );
}
