'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/logo.png';
import { Menu } from 'lucide-react';

const NavigationBar = () => {
  return (
    <nav className="max-w-[1300px] w-full h-20 rounded-[100px] bg-black flex items-center justify-between px-4 absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
      {/* Logo */}
      <div className="w-[207px] h-12 mx-4 flex items-center justify-center">
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
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center justify-center flex-1 mx-4">
        <div className="flex space-x-4">
          {/* Home Button (Active) */}
          <Link href="/" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
            <span className="text-primary">Home</span>
          </Link>
          
          {/* About Button */}
          <Link href="/about" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
            <span className="text-white">About Us</span>
          </Link>
          
          {/* Services Button */}
          <Link href="/services" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
            <span className="text-white">Services</span>
          </Link>
          
          {/* Blog Button */}
          <Link href="/blog" className="w-[122px] h-12 flex items-center justify-center nav-link font-secondary">
            <span className="text-white">Projects</span>
          </Link>
        </div>
      </div>
      
      {/* Contact Us Button */}
      <div className="hidden md:block">
        <Link 
          href="/contact" 
          className="w-[134px] h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-300 font-secondary"
        >
          Contact Us
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button className="md:hidden text-white p-2">
        <Menu size={24} strokeWidth={1.5} />
      </button>
    </nav>
  );
};

export default NavigationBar; 