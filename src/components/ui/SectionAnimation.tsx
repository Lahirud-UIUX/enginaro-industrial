'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, fadeIn, slideInLeft, slideInRight } from '@/utils/animations';

type AnimationType = 'fadeIn' | 'fadeInUp' | 'slideInLeft' | 'slideInRight';

interface SectionAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  id?: string;
}

const SectionAnimation: React.FC<SectionAnimationProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  id,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });

  // Select the animation variant based on the prop
  const getAnimationVariant = () => {
    switch (animation) {
      case 'fadeIn':
        return fadeIn;
      case 'slideInLeft':
        return slideInLeft;
      case 'slideInRight':
        return slideInRight;
      case 'fadeInUp':
      default:
        return fadeInUp;
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getAnimationVariant()}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionAnimation; 