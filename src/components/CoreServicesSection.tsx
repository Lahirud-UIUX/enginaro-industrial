'use client';

import React from 'react';
import AppleCardsCarouselDemo from '@/components/ui/apple-cards-carousel-demo';

const CoreServicesSection = () => {
  return (
    <section className="w-full max-w-[1300px] mx-auto py-16 relative overflow-visible">
      <div className="flex flex-col">
        {/* Section Header - Left-aligned as requested */}
        <div className="max-w-[720px]">
          <div className="mb-4">
            <p className="text-[#3D3D3D] text-sm font-secondary uppercase">CORE SERVICES</p>
            <h2 className="text-4xl font-bold text-black font-primary">What We Do Best</h2>
          </div>
          
          <p className="text-[#3D3D3D] font-secondary mb-6">
            From design to delivery, we offer complete engineering solutions that help you build smarter, 
            faster, and stronger. Explore our core services that power real-world innovation.
          </p>
        </div>
        
        {/* Adding the Cards Carousel component with full width */}
        <div className="w-full overflow-visible">
          <AppleCardsCarouselDemo />
        </div>
      </div>
    </section>
  );
};

export default CoreServicesSection; 