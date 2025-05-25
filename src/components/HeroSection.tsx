'use client';

import React from 'react';
import HeroCarousel from './HeroCarousel';
import SectionAnimation from './ui/SectionAnimation';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <SectionAnimation 
      animation="fadeIn" 
      className="w-full relative"
      threshold={0.1}
    >
      <HeroCarousel />
    </SectionAnimation>
  );
};

export default HeroSection; 