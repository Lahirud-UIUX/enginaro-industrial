import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoreServicesSection from "@/components/CoreServicesSection";
import WhyUsSection from "@/components/WhyUsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CoreServicesSection />
      <WhyUsSection />
      
      {/* Other sections will be added here */}
    </main>
  );
}
