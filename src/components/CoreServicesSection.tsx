'use client';

import React from 'react';
import AppleCardsCarouselDemo from '@/components/ui/apple-cards-carousel-demo';
import SectionAnimation from './ui/SectionAnimation';
import { motion } from 'framer-motion';

const CoreServicesSection = () => {
  return (
    <SectionAnimation 
      animation="fadeInUp" 
      className="w-full max-w-[1300px] mx-auto py-16 relative overflow-visible"
      id="services"
    >
      <div className="flex flex-col">
        {/* Section Header - Left-aligned as requested */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-[720px]"
        >
          <div className="mb-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-[#3D3D3D] text-sm font-secondary uppercase"
            >
              CORE SERVICES
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-black font-primary"
            >
              What We Do Best
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[#3D3D3D] font-secondary mb-6"
          >
            From design to delivery, we offer complete engineering solutions that help you build smarter, 
            faster, and stronger. Explore our core services that power real-world innovation.
          </motion.p>
        </motion.div>
        
        {/* Adding the Cards Carousel component with full width */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true, amount: 0.1 }}
          className="w-full overflow-visible"
        >
          <AppleCardsCarouselDemo />
        </motion.div>
      </div>
    </SectionAnimation>
  );
};

export default CoreServicesSection; 