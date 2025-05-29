'use client';

import React from 'react';
import Image from 'next/image';
import WhoWeAreImage from '@/images/who-we-are.png';
import { Wrench, Zap, ArrowUpRight } from 'lucide-react';
import SectionAnimation from './ui/SectionAnimation';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/utils/animations';
import { useInView } from 'react-intersection-observer';

const AboutSection = () => {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <SectionAnimation 
      animation="fadeInUp" 
      className="w-full max-w-[1300px] mx-auto py-16"
      id="about"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
        {/* Left Side Content */}
        <motion.div 
          ref={contentRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col gap-4 lg:h-[620px]"
        >
          {/* Who We Are Card */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" }
              }
            }}
            whileHover={{
              y: -10,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
            className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-8 flex-1"
          >
            <div className="h-full max-w-[578px] mx-auto flex flex-col gap-6">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl font-bold text-black dark:text-white mt-8 font-primary"
              >
                WHO WE ARE?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#3D3D3D] dark:text-white text-lg font-secondary"
              >
                We turn complex engineering ideas into practical, high-performance solutions. 
                Our expert team delivers reliable, ready-to-build results through smart design, 
                simulation, prototyping, & fabrication.
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white rounded-full py-3 px-6 flex items-center 
                          justify-center w-fit gap-2 hover:bg-opacity-90 transition-all font-secondary mt-auto"
              >
                <span>Learn more about us</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                >
                  <ArrowUpRight size={20} strokeWidth={1.5} className="text-white" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
          
          {/* Two Cards in a Row */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-4">
            {/* Expertise Card */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut", delay: 0.2 }
                }
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-6 flex-1"
            >
              <div className="h-full flex flex-col">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <Wrench size={24} strokeWidth={1} className="text-black dark:text-white" />
                </motion.div>
                
                <div className="flex flex-col gap-4">
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="text-2xl font-bold text-black dark:text-white font-primary"
                  >
                    Our Expertise, Your Advantage
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="text-[#3D3D3D] dark:text-white font-secondary"
                  >
                    We design, test, and build engineering solutions that work in the real world—quickly and accurately.
                  </motion.p>
                </div>
              </div>
            </motion.div>
            
            {/* Innovation Card */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut", delay: 0.4 }
                }
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-6 flex-1"
            >
              <div className="h-full flex flex-col">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <Zap size={24} strokeWidth={1} className="text-black dark:text-white" />
                </motion.div>
                
                <div className="flex flex-col gap-4">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="text-2xl font-bold text-black dark:text-white font-primary"
                  >
                    Innovation That Delivers
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="text-[#3D3D3D] dark:text-white font-secondary"
                  >
                    We use smart tools and modern technology to help your ideas become real products.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right Side Image */}
        <motion.div 
          ref={imageRef}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full lg:w-1/2 h-[620px] relative"
        >
          <Image 
            src={WhoWeAreImage} 
            alt="Who We Are" 
            className="rounded-3xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {/* Animated overlay effect */}
          <motion.div
            initial={{ height: '100%' }}
            animate={imageInView ? { height: '0%' } : { height: '100%' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 bg-primary z-10 origin-top"
          />
          
          {/* Floating decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={imageInView ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary/20 dark:bg-primary/30"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
              className="w-full h-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={imageInView ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-white/20 dark:bg-dark-surface/30"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }}
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </SectionAnimation>
  );
};

export default AboutSection; 