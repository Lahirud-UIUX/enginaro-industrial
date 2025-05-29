'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FacebookIcon, 
  InstagramIcon, 
  LinkedinIcon, 
  Mail, 
  MapPin, 
  Phone, 
  TwitterIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionAnimation from './ui/SectionAnimation';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';

const Footer = () => {
  return (
    <footer className="w-full mx-auto mb-8 mt-16 px-[20px]">
      <SectionAnimation 
        animation="fadeIn" 
        className="w-full"
        id="footer"
      >
        <div className="bg-black dark:bg-dark-surface rounded-3xl p-6 md:p-16">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-0 mb-16">
            {/* Company Info Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-[307px]"
            >
              <div className="mb-4">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Image 
                    src="/Logo.png"
                    alt="Enginaro Industrial Logo" 
                    width={200}
                    height={46}
                    className="h-12 w-auto"
                  />
                </motion.div>
              </div>
              <p className="text-white text-sm mb-6">
                Engineering solutions that turn ideas into real-world innovations — from smart design to reliable manufacturing.
              </p>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex gap-2">
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={fadeInUp} 
                  whileHover={{ scale: 1.1, y: -5 }} 
                  className="w-12 h-12 bg-white dark:bg-[#1B1B1B] rounded-full flex items-center justify-center"
                >
                  <FacebookIcon className="text-[#3D15B8] dark:text-primary w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={fadeInUp} 
                  whileHover={{ scale: 1.1, y: -5 }} 
                  className="w-12 h-12 bg-white dark:bg-[#1B1B1B] rounded-full flex items-center justify-center"
                >
                  <InstagramIcon className="text-[#3D15B8] dark:text-primary w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={fadeInUp} 
                  whileHover={{ scale: 1.1, y: -5 }} 
                  className="w-12 h-12 bg-white dark:bg-[#1B1B1B] rounded-full flex items-center justify-center"
                >
                  <TwitterIcon className="text-[#3D15B8] dark:text-primary w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variants={fadeInUp} 
                  whileHover={{ scale: 1.1, y: -5 }} 
                  className="w-12 h-12 bg-white dark:bg-[#1B1B1B] rounded-full flex items-center justify-center"
                >
                  <LinkedinIcon className="text-[#3D15B8] dark:text-primary w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Footer Links and Contact */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-16">
              {/* Sitemap Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Sitemap</h3>
                <motion.ul variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
                  <motion.li variants={fadeInUp}>
                    <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>Home</motion.span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInUp}>
                    <Link href="/services" className="text-white hover:text-gray-300 transition-colors">
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>Services</motion.span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInUp}>
                    <Link href="/projects" className="text-white hover:text-gray-300 transition-colors">
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>Projects</motion.span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInUp}>
                    <Link href="/about" className="text-white hover:text-gray-300 transition-colors">
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>About</motion.span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInUp}>
                    <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>Contact</motion.span>
                    </Link>
                  </motion.li>
                </motion.ul>
              </motion.div>

              {/* Legal Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                <motion.ul variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
                  <motion.li variants={fadeInUp}>
                    <Link href="/privacy-policy" className="text-white hover:text-gray-300 transition-colors">
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>Privacy Policy</motion.span>
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeInUp}>
                    <Link href="/terms-of-service" className="text-white hover:text-gray-300 transition-colors">
                      <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>Terms of service</motion.span>
                    </Link>
                  </motion.li>
                </motion.ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="max-w-[340px]"
              >
                <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                  <motion.div variants={fadeInUp} className="flex gap-2">
                    <MapPin className="text-white w-6 h-6 flex-shrink-0" />
                    <p className="text-white text-sm">
                      No 07, Beddagama Road, Sri Jayawardhanapura Kotte, Colombo, Sri Lanka.
                    </p>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="flex gap-2 items-center">
                    <Mail className="text-white w-6 h-6 flex-shrink-0" />
                    <a href="mailto:enginaroindustrialsolutions@gmail.com" className="text-white text-sm hover:text-gray-300 transition-colors">
                      enginaroindustrialsolutions@gmail.com
                    </a>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="flex gap-2 items-center">
                    <Phone className="text-white w-6 h-6 flex-shrink-0" />
                    <a href="tel:+94077000000" className="text-white text-sm hover:text-gray-300 transition-colors">
                      +94 077 7377 736
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-white/20 mb-4 origin-left"
          ></motion.div>

          {/* Copyright Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between text-[#9CA3AF] dark:text-white text-xs"
          >
            <p>Copyright © {new Date().getFullYear()} Enginaro Industrial Solutions. All rights reserved.</p>
            <p>Designed and Developed by glazegen</p>
          </motion.div>
        </div>
      </SectionAnimation>
    </footer>
  );
};

export default Footer; 