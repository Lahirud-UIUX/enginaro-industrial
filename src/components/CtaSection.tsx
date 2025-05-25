'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionAnimation from './ui/SectionAnimation';
import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <SectionAnimation
      animation="fadeIn"
      className="w-full h-[500px] relative"
      id="cta"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-black">
        {/* Using the public directory image path */}
        <Image 
          src="/images/cta.png"
          alt="Engineering collaboration"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Overlay with blur effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 backdrop-blur-sm bg-black/10"
        ></motion.div>
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-[1300px] h-full mx-auto flex items-center justify-center px-4 md:px-6 lg:px-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-[605px] text-center flex flex-col items-center gap-8"
        >
          {/* Heading Section */}
          <div className="flex flex-col gap-4">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white text-sm font-secondary uppercase tracking-wider"
            >
              CONTACT US
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white text-4xl md:text-5xl font-bold font-primary"
            >
              Let&apos;s Build Something Great Together!
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-white font-secondary"
          >
            Have an idea or project in mind? Our team is ready to help you design, develop, and deliver engineering solutions that make a real impact.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/contact" 
              className="bg-[#FF6301] hover:bg-[#E05600] transition-colors text-white font-secondary font-semibold rounded-full py-3 px-6 flex items-center justify-center gap-2 w-fit"
            >
              <span>Schedule a free consultation</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </SectionAnimation>
  );
};

export default CtaSection; 