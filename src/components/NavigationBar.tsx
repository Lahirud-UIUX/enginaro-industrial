'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [navWidth, setNavWidth] = useState('100%');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1300);
      
      // Set consistent nav width based on screen size
      if (width < 640) {
        setNavWidth('calc(100% - 40px)');
      } else if (width < 1300) {
        setNavWidth('560px'); // Fixed width for tablets
      } else {
        setNavWidth('1300px'); // Desktop
      }
    };

    // Initial checks
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrolled]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="px-[20px] w-full">
        <nav 
          className="mx-auto h-20 rounded-[100px] bg-black/90 dark:bg-dark-surface/90 flex items-center justify-between px-4 fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300"
          style={{ width: '100%' }}
        >
          {/* Logo */}
          <div className="w-[160px] h-12 mx-4 flex items-center justify-center">
            <div className="w-[150px] h-[46px] relative">
              <Image 
                src="/images/logo-new_white.png"
                alt="Enginaro Industrial Logo" 
                fill 
                style={{ objectFit: 'contain' }}
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/Logo.png';
                }}
              />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="text-white p-2 z-50"
            onClick={() => {}} // No-op for server render
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </nav>
      </div>
    );
  }

  return (
    <>
      <div className={isMobile ? 'px-[20px] w-full' : 'w-full'}>
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: navWidth }}
          className={`mx-auto h-20 rounded-[100px] ${scrolled ? 'bg-black dark:bg-dark-surface shadow-lg' : 'bg-black/90 dark:bg-dark-surface/90'} flex items-center justify-between px-4 fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300`}
        >
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`${isMobile ? 'w-[160px]' : 'w-[207px]'} h-12 mx-4 flex items-center justify-center`}
          >
            <div className={`${isMobile ? 'w-[150px]' : 'w-[201px]'} h-[46px] relative`}>
              <Image 
                src="/images/logo-new_white.png"
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
                  className="w-[134px] h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-300 font-secondary"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar; 