'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/logo.png';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1300);
    };

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <div className={isMobile ? 'px-[20px] w-full' : 'w-full'}>
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${isMobile ? 'w-full' : 'max-w-[1300px] mx-auto'} h-20 rounded-[100px] ${scrolled ? 'bg-black dark:bg-dark-surface shadow-lg' : 'bg-black/90 dark:bg-dark-surface/90'} flex items-center justify-between px-4 fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300`}
        >
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="w-[207px] h-12 mx-4 flex items-center justify-center"
          >
            <div className="w-[201px] h-[46px] relative">
              <Image 
                src={Logo}
                alt="Enginaro Industrial Logo" 
                fill 
                style={{ objectFit: 'contain' }}
                priority
                onError={(e) => {
                  // Fallback to the public directory if the import fails
                  const target = e.target as HTMLImageElement;
                  target.src = '/Logo.png';
                }}
              />
            </div>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className={`${!isMobile ? 'flex' : 'hidden'} items-center justify-center flex-1 mx-4`}>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex space-x-4"
            >
              {/* Home Button (Active) */}
              <motion.div variants={fadeInUp}>
                <Link href="/" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white"
                  >
                    Home
                  </motion.span>
                </Link>
              </motion.div>
              
              {/* About Button */}
              <motion.div variants={fadeInUp}>
                <Link href="/about" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white"
                  >
                    About Us
                  </motion.span>
                </Link>
              </motion.div>
              
              {/* Services Button */}
              <motion.div variants={fadeInUp}>
                <Link href="/services" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white"
                  >
                    Services
                  </motion.span>
                </Link>
              </motion.div>
              
              {/* Blog Button */}
              <motion.div variants={fadeInUp}>
                <Link href="/projects" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white"
                  >
                    Projects
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Contact Us Button - Desktop */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className={`${!isMobile ? 'block' : 'hidden'}`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact" 
                className="w-[134px] h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-300 font-secondary"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className={`${isMobile ? 'block' : 'hidden'} text-white p-2 z-50`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </motion.button>
        </motion.nav>
      </div>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black dark:bg-dark-background bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col justify-center items-center"
          >
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col space-y-8 items-center"
            >
              {/* Mobile Navigation Links */}
              <motion.div variants={fadeInUp}>
                <Link href="/" className="text-2xl font-semibold text-white hover:text-primary transition-colors duration-300" onClick={toggleMenu}>
                  Home
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Link href="/about" className="text-2xl font-semibold text-white hover:text-primary transition-colors duration-300" onClick={toggleMenu}>
                  About Us
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Link href="/services" className="text-2xl font-semibold text-white hover:text-primary transition-colors duration-300" onClick={toggleMenu}>
                  Services
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Link href="/projects" className="text-2xl font-semibold text-white hover:text-primary transition-colors duration-300" onClick={toggleMenu}>
                  Projects
                </Link>
              </motion.div>
              
              {/* Mobile Contact Button */}
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact" 
                  className="mt-8 w-[180px] h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-300 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Media Links for Mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-16 flex space-x-6"
            >
              <motion.a 
                whileHover={{ scale: 1.1, y: -5 }}
                href="#" 
                className="text-white hover:text-primary transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white/10 dark:bg-[#1B1B1B]/50 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -5 }}
                href="#" 
                className="text-white hover:text-primary transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white/10 dark:bg-[#1B1B1B]/50 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 11.3698C16.1234 12.2021 15.9812 13.052 15.5937 13.7988C15.2062 14.5456 14.5931 15.1512 13.8416 15.5295C13.0901 15.9077 12.2384 16.0394 11.4077 15.9057C10.5771 15.7721 9.80971 15.3799 9.21479 14.785C8.61987 14.1901 8.22768 13.4227 8.09402 12.592C7.96035 11.7614 8.09202 10.9097 8.47028 10.1581C8.84854 9.40661 9.45414 8.79346 10.2009 8.40598C10.9477 8.01851 11.7977 7.87631 12.63 7.99972C13.4789 8.12555 14.2648 8.52154 14.8716 9.12836C15.4785 9.73519 15.8744 10.5211 16 11.3698Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -5 }}
                href="#" 
                className="text-white hover:text-primary transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white/10 dark:bg-[#1B1B1B]/50 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005V3.00005Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -5 }}
                href="#" 
                className="text-white hover:text-primary transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-white/10 dark:bg-[#1B1B1B]/50 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar; 