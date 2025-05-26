'use client';

import React from 'react';
import Image from 'next/image';
import WhoWeAreImage from '@/images/who-we-are.png';
import { Wrench, Zap, ArrowUpRight } from 'lucide-react';
import SectionAnimation from './ui/SectionAnimation';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/utils/animations';

const AboutSection = () => {
  return (
    <SectionAnimation 
      animation="fadeInUp" 
      className="w-full max-w-[1300px] mx-auto py-16"
      id="about"
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
        {/* Left Side Content */}
        <motion.div 
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
            className="bg-white dark:bg-dark-card rounded-3xl p-8 flex-1"
          >
            <div className="h-full max-w-[578px] mx-auto flex flex-col gap-6">
              <h2 className="text-4xl font-bold text-black dark:text-black mt-8 font-primary">WHO WE ARE?</h2>
              
              <p className="text-[#3D3D3D] dark:text-[#3D3D3D] text-lg font-secondary">
                We turn complex engineering ideas into practical, high-performance solutions. 
                Our expert team delivers reliable, ready-to-build results through smart design, 
                simulation, prototyping, & fabrication.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white rounded-full py-3 px-6 flex items-center 
                          justify-center w-fit gap-2 hover:bg-opacity-90 transition-all font-secondary mt-auto"
              >
                <span>Learn more about us</span>
                <ArrowUpRight size={20} strokeWidth={1.5} className="text-white" />
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
              className="bg-white dark:bg-dark-card rounded-3xl p-6 flex-1"
            >
              <div className="h-full flex flex-col">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <Wrench size={24} strokeWidth={1} className="text-black dark:text-black" />
                </motion.div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-black dark:text-black font-primary">Our Expertise, Your Advantage</h3>
                  <p className="text-[#3D3D3D] dark:text-[#3D3D3D] font-secondary">
                    We design, test, and build engineering solutions that work in the real world—quickly and accurately.
                  </p>
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
              className="bg-white dark:bg-dark-card rounded-3xl p-6 flex-1"
            >
              <div className="h-full flex flex-col">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <Zap size={24} strokeWidth={1} className="text-black dark:text-black" />
                </motion.div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-black dark:text-black font-primary">Innovation That Delivers</h3>
                  <p className="text-[#3D3D3D] dark:text-[#3D3D3D] font-secondary">
                    We use smart tools and modern technology to help your ideas become real products.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right Side Image */}
        <motion.div 
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
        </motion.div>
      </div>
    </SectionAnimation>
  );
};

export default AboutSection; 