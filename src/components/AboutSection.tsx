'use client';

import React from 'react';
import Image from 'next/image';
import WhoWeAreImage from '@/images/who-we-are.png';
import { Wrench, Zap, ArrowUpRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="w-full max-w-[1300px] mx-auto py-16">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-4">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:h-[620px]">
          {/* Who We Are Card */}
          <div className="bg-white rounded-3xl p-8 flex-1">
            <div className="h-full max-w-[578px] mx-auto flex flex-col gap-6">
              <h2 className="text-4xl font-bold text-black mt-8 font-primary">WHO WE ARE?</h2>
              
              <p className="text-[#3D3D3D] text-lg font-secondary">
                We turn complex engineering ideas into practical, high-performance solutions. 
                Our expert team delivers reliable, ready-to-build results through smart design, 
                simulation, prototyping, and fabrication.
              </p>
              
              <button className="bg-primary text-white rounded-full py-3 px-6 flex items-center 
                               justify-center w-fit gap-2 hover:bg-opacity-90 transition-all font-secondary mt-auto">
                <span>Learn more about us</span>
                <ArrowUpRight size={20} strokeWidth={1.5} className="text-white" />
              </button>
            </div>
          </div>
          
          {/* Two Cards in a Row */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-4">
            {/* Expertise Card */}
            <div className="bg-white rounded-3xl p-6 flex-1">
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <Wrench size={24} strokeWidth={1} className="text-black" />
                </div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-black font-primary">Our Expertise, Your Advantage</h3>
                  <p className="text-[#3D3D3D] font-secondary">
                    We design, test, and build engineering solutions that work in the real world—quickly and accurately.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Innovation Card */}
            <div className="bg-white rounded-3xl p-6 flex-1">
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <Zap size={24} strokeWidth={1} className="text-black" />
                </div>
                
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-black font-primary">Innovation That Delivers</h3>
                  <p className="text-[#3D3D3D] font-secondary">
                    We use smart tools and modern technology to help your ideas become real products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side Image */}
        <div className="w-full lg:w-1/2 h-[620px] relative">
          <Image 
            src={WhoWeAreImage} 
            alt="Who We Are" 
            className="rounded-3xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 