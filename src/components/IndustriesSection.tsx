'use client';

import React from 'react';
import Image from 'next/image';
import SectionAnimation from './ui/SectionAnimation';
import { motion } from 'framer-motion';

// Import industry card background images
import IndustryCard01 from '@/images/industries-card01.png';
import IndustryCard02 from '@/images/industries-card02.png';
import IndustryCard03 from '@/images/industries-card03.png';
import IndustryCard04 from '@/images/industries-card04.png';
import IndustryCard05 from '@/images/industries-card05.png';

// Animation card component for reuse
interface IndustryCardProps {
  image: any;
  title: string;
  description: string;
  delay: number;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ image, title, description, delay }) => {
  // Split title into lines based on <br />
  const titleLines = title.split('<br />');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative w-full h-[335px] rounded-3xl overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={image}
          alt={titleLines[0]}
          fill
          className="object-cover"
          placeholder="blur"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        ></motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 p-8 w-full"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-primary text-[32px] font-bold leading-tight">
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
            viewport={{ once: true }}
            className="text-white font-secondary text-[14px] font-semibold"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const IndustriesSection = () => {
  const industryCards = [
    {
      image: IndustryCard01,
      title: "Industrial<br />Manufacturing",
      description: "Efficient solutions to improve production, reduce waste, and build better systems."
    },
    {
      image: IndustryCard02,
      title: "Automotive<br />& Machinery",
      description: "Design, test, and build parts and systems for vehicles and heavy equipment."
    },
    {
      image: IndustryCard03,
      title: "Building<br />Infrastructure",
      description: "Engineering support for smart buildings, automation, and mechanical systems."
    },
    {
      image: IndustryCard04,
      title: "Research &<br />Development",
      description: "Prototyping, simulation, and testing for innovative product ideas."
    },
    {
      image: IndustryCard05,
      title: "Product Innovators<br />(Startups & SMEs)",
      description: "Help for startups and small businesses to turn concepts into ready-to-launch products."
    }
  ];
  
  return (
    <SectionAnimation
      animation="fadeInUp"
      className="w-full max-w-[1300px] mx-auto py-16 px-4 md:px-6 lg:px-0"
      id="industries"
    >
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-[720px] mx-auto text-center mb-10"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-2"
        >
          <p className="text-[#3D3D3D] text-sm font-secondary uppercase tracking-wider">INDUSTRIES</p>
          <h2 className="text-4xl font-bold text-black font-primary mt-1">Industries We Serve</h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-[#3D3D3D] font-secondary mt-4"
        >
          We work with a wide range of industries—delivering smart, practical, and scalable engineering solutions that fit real-world needs.
        </motion.p>
      </motion.div>
      
      {/* Top row - 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {industryCards.slice(0, 3).map((card, index) => (
          <IndustryCard 
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            delay={0.1 * (index + 1)}
          />
        ))}
      </div>
      
      {/* Bottom row - 2 cards - separate from the first section */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-[850px] mx-auto">
        {industryCards.slice(3, 5).map((card, index) => (
          <IndustryCard 
            key={index + 3}
            image={card.image}
            title={card.title}
            description={card.description}
            delay={0.1 * (index + 4)}
          />
        ))}
      </div>
    </SectionAnimation>
  );
};

export default IndustriesSection; 