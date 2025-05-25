import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoreServicesSection from "@/components/CoreServicesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CoreServicesSection />
      
      {/* Other sections will be added here */}
    </main>
  );
}
