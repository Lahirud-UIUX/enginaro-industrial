'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slide1 from '@/images/slide (1).jpg';
import Slide2 from '@/images/slide (2).jpg';
import Slide3 from '@/images/slide (3).jpg';
import { ArrowRight } from 'lucide-react';

// Carousel images imported directly
const carouselImages = [
  Slide1,
  Slide2,
  Slide3,
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Image Carousel */}
      {carouselImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ease-in-out ${
            index === currentIndex ? 'opacity-100 carousel-fade' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Hero slide ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
            className="z-0"
          />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20">
        <div className="max-w-[640px] flex flex-col space-y-6">
          {/* Main Heading with Gradient */}
          <h1 
            className="text-4xl md:text-5xl font-bold mb-0 text-center font-primary" 
            style={{ 
              background: 'linear-gradient(to bottom, rgba(242, 243, 255, 1), rgba(145, 146, 153, 1))', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Where Engineeringbr<br/>Meets Excellence
          </h1>
          
          <div className="flex flex-col space-y-6">
            {/* Subheading */}
            <p className="text-white text-opacity-70 text-lg md:text-xl font-secondary">
              From design to delivery, we empower industrial growth through <br/>smart, scalable, and precise engineering solutions.
            </p>
            
            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Primary Button with Icon */}
              <Link href="/services">
                <button className="bg-primary text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 font-secondary">
                  <span>View Our Services</span>
                  <ArrowRight size={20} strokeWidth={1.5} className="text-white" />
                </button>
              </Link>
              
              {/* Secondary Button */}
              <Link href="/contact">
                <button className="border border-primary text-primary px-6 py-3 rounded-full font-secondary">
                  Get a Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-primary' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel; 