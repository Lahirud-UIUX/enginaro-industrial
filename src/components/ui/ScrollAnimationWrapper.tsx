'use client';

import React, { ReactNode } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  variants: Variants;
  className?: string;
  viewThreshold?: number;
  delay?: number;
  once?: boolean;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  variants,
  className = '',
  viewThreshold = 0.2,
  delay = 0,
  once = true,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: viewThreshold,
    triggerOnce: once,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper; 