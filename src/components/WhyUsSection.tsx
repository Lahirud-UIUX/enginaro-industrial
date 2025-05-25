'use client';

import React from 'react';
import { 
  SquareAsterisk, 
  Users, 
  LucideIcon, 
  Laptop, 
  Rocket, 
  Factory, 
  Wifi, 
  Compass,
  Cpu,
  Box,
  Settings,
  Cloud
} from 'lucide-react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  // Function to break title into two lines
  const formatTitleIntoTwoLines = (title: string) => {
    // Split the title by space
    const words = title.split(' ');
    
    if (words.length === 1) {
      return { line1: title, line2: '' };
    }
    
    // For two words, put one on each line
    if (words.length === 2) {
      return { line1: words[0], line2: words[1] };
    }
    
    // Find midpoint to split the title evenly
    const midpoint = Math.ceil(words.length / 2);
    const line1 = words.slice(0, midpoint).join(' ');
    const line2 = words.slice(midpoint).join(' ');
    
    return { line1, line2 };
  };

  const { line1, line2 } = formatTitleIntoTwoLines(title);

  return (
    <div className="bg-white rounded-3xl p-6 flex flex-col items-center">
      <div className="h-[32px] flex items-center justify-center">
        <Icon size={32} className="text-[#FF6301]" strokeWidth={1} />
      </div>
      <div className="text-center px-6 flex flex-col w-full">
        <div className="text-[#3D15A2] text-[32px] font-bold leading-tight min-h-[110px] flex flex-col items-center justify-center font-primary">
          <div className="text-center">{line1}</div>
          <div className="text-center">{line2}</div>
        </div>
        <div className="h-[0px]"></div>
        <p className="text-[#3D3D3D] font-secondary text-[14px] font-semibold">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhyUsSection = () => {
  const features = [
    {
      icon: Compass,
      title: "Precision Engineering",
      description: "We design, test, and build engineering solutions that work in the real world—quickly and accurately."
    },
    {
      icon: Users,
      title: "Multidisciplinary Team",
      description: "Our experts cover mechanical, electrical, electronic, and smart systems."
    },
    {
      icon: Cpu,
      title: "Advanced Tools & Software",
      description: "We use the latest CAD, simulation, and prototyping platforms."
    },
    {
      icon: Box,
      title: "Rapid Prototyping",
      description: "Turn ideas into physical models, fast and cost-effective."
    },
    {
      icon: Settings,
      title: "Scalable Manufacturing",
      description: "We support everything from one-off builds to low-volume production."
    },
    {
      icon: Cloud,
      title: "Smart IoT Integration",
      description: "We bring intelligence to your systems with sensors and automation."
    }
  ];

  return (
    <section className="w-full max-w-[1300px] mx-auto py-16">
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="max-w-[720px] mx-auto text-center">
          <div className="mb-2">
            <p className="text-[#3D3D3D] text-sm font-secondary uppercase">WHY US</p>
            <h2 className="text-4xl font-bold text-black font-primary">Why Choose Enginaro?</h2>
          </div>
          
          <p className="text-[#3D3D3D] font-secondary">
            We're more than just engineers — we're your innovation partners. From idea to execution, 
            we bring the tools, skills, and speed to help you succeed in today's fast-moving industrial world.
          </p>
        </div>
        
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection; 