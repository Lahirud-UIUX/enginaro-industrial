'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowUpRight, 
  Cog, 
  Cpu, 
  Zap, 
  Building, 
  Code, 
  Factory,
  ChevronDown
} from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Service categories with their details
const serviceCategories = [
  {
    id: 'mechanical',
    title: 'Mechanical Engineering',
    icon: Cog,
    description: 'Innovative mechanical solutions for complex industrial challenges.',
    color: 'from-blue-500 to-cyan-400',
    overview: 'Our Mechanical Engineering team transforms ideas into durable, manufacturable, and high-performing products. We specialize in 3D modeling, system design, and simulation for everything from industrial machinery to human-centered devices.\n We also integrate biomechanics into our work  developing ergonomic components, assistive devices, and motion-adaptive systems for healthcare and wearable tech.',
    coreServices: [
      'Mechanical design and optimization',
      'Product development and reverse engineering',
      'Biomechanical system analysis and ergonomic design',
      'Finite Element Analysis (FEA), thermal and dynamic simulations',
      'DFM/DFA, tolerance stack-up, and technical calculations'
    ],
    tools: ['SolidWorks', 'Autodesk Inventor', 'AutoCAD', 'ANSYS', 'Abaqus'],
    services: [
      {
        title: 'CAD Design & 3D Modeling',
        description: 'Precision design services using SolidWorks, AutoCAD, and Fusion 360 to create detailed mechanical components and assemblies.'
      },
      {
        title: 'Structural Analysis',
        description: 'Comprehensive stress, fatigue, and failure analysis to ensure mechanical integrity and optimize designs.'
      },
      {
        title: 'Thermal & Fluid Analysis',
        description: 'Advanced CFD simulations for heat transfer, fluid flow, and thermal management solutions.'
      },
      {
        title: 'Mechanical Prototyping',
        description: 'Rapid prototyping services to transform designs into functional mechanical prototypes.'
      }
    ]
  },
  {
    id: 'mechatronic',
    title: 'Mechatronics & IoT Systems',
    icon: Cpu,
    description: 'Integrated solutions combining mechanical, electrical, and control systems.',
    color: 'from-purple-500 to-indigo-500',
    overview: 'We bring machines to life with smart control, automation, and connectivity. Our Mechatronics & IoT team designs sensor-based systems, embedded devices, and real-time control interfaces across industries from smart factories to wearable tech. We also work in biomechatronics, designing intelligent systems that interact with the human body, such as motion sensors, rehab wearables, and health monitoring tools.',
    coreServices: [
      'Sensor-integrated smart systems',
      'Embedded electronics and control programming',
      'Biomechatronic wearables and assistive tech',
      'PCB and enclosure design', 
      'IoT dashboards and automation platforms'
    ],
    tools: ['Arduino', 'Raspberry Pi', 'ESP32', 'STM32', 'MATLAB/Simulink', 'Proteus'],
    services: [
      {
        title: 'Automation System Design',
        description: 'Custom automation solutions for manufacturing processes, material handling, and industrial operations.'
      },
      {
        title: 'Embedded Systems Development',
        description: 'Design and implementation of embedded control systems for smart mechanical applications.'
      },
      {
        title: 'Sensor Integration',
        description: 'Incorporation of advanced sensors and data acquisition systems for real-time monitoring and feedback.'
      },
      {
        title: 'Robotics Applications',
        description: 'Development of specialized robotic systems for industrial automation and precision tasks.'
      }
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical & Electronic Engineering',
    icon: Zap,
    description: 'Comprehensive electrical solutions from power systems to control circuitry.',
    color: 'from-amber-500 to-yellow-400',
    overview: 'We design and develop the core electrical and electronic systems that power modern devices and automation. From circuit design to embedded hardware, our team ensures functional, safe, and reliable system integration across a wide range of applications',
    coreServices: [
      'Circuit simulation and electronic system design',
      'Embedded hardware development',
      'PCB layout and prototyping',
      'Electrical layouts and industrial control systems',
    ],
    tools: ['AutoCAD Electrical', 'EPLAN', 'LTspice', 'Proteus', 'ETAP'],
    services: [
      {
        title: 'Power Systems Design',
        description: 'Engineering of reliable power distribution and control systems for industrial applications.'
      },
      {
        title: 'Circuit Design & PCB Layout',
        description: 'Custom electronic circuit design and PCB development for specialized applications.'
      },
      {
        title: 'Control System Engineering',
        description: 'Design of PLC and microcontroller-based control systems for process automation.'
      },
      {
        title: 'Electrical Safety & Compliance',
        description: 'Assessment and implementation of electrical safety standards and regulatory compliance.'
      }
    ]
  },
  {
    id: 'civil',
    title: 'Civil & Structural Engineering',
    icon: Building,
    description: 'Structural solutions and infrastructure design for industrial facilities.',
    color: 'from-green-500 to-emerald-400',
    overview: "Enginaro provides complete solutions for infrastructure, buildings, and industrial structures. Our services include structural analysis, foundation design, and MEP coordination ensuring every project is safe, efficient, and compliant from the ground up.",
    coreServices: [
      'Reinforced concrete and steel structure design',
      'Geotechnical analysis and foundation engineering',
      'BOQ, construction drawings, and detailing',
      'HVAC, plumbing, fire safety, and electrical layout plans',
    ],
    tools: ['AutoCAD Civil 3D', 'Revit', 'STAAD.Pro', 'SketchUp'],
    services: [
      {
        title: 'Structural Engineering',
        description: 'We design safe, stable structures with concrete, steel, and foundation systems.'
      },
      {
        title: 'Industrial Facility Planning',
        description: 'Comprehensive planning and layout design for manufacturing and processing facilities.'
      },
      {
        title: 'Infrastructure Development',
        description: 'Engineering of utility systems, material handling structures, and industrial infrastructure.'
      },
      {
        title: 'Site Assessment & Evaluation',
        description: 'Technical evaluation of industrial sites for optimal facility development.'
      }
    ]
  },
  {
    id: 'computer',
    title: 'Software & Digital Engineering',
    icon: Code,
    description: 'Software and digital solutions for industrial applications and data systems.',
    color: 'from-blue-600 to-indigo-600',
    overview: 'We build custom software tools that empower engineering systems and businesses alike. From responsive mobile apps to real-time monitoring platforms, we develop intuitive, scalable solutions tailored to your workflow or product ecosystem.',
    coreServices: [
      'Web and mobile app development',
      'IoT interfaces and engineering dashboards',
      'Backend systems and API integration',
      'Cross-platform software for real-time data handling',
    ],
    tools: ['Python', 'C/C++', 'Node.js', 'Firebase', 'MQTT', 'ThingSpeak', 'React'],
    services: [
      {
        title: 'Industrial Software Development',
        description: 'Custom software solutions for manufacturing control, monitoring, and data analysis.'
      },
      {
        title: 'IoT System Integration',
        description: 'Development of Internet of Things platforms for connected industrial systems.'
      },
      {
        title: 'Data Analytics & Visualization',
        description: 'Advanced data processing systems to transform industrial data into actionable insights.'
      },
      {
        title: 'Cloud-Based Industrial Solutions',
        description: 'Implementation of cloud platforms for remote monitoring and control of industrial operations.'
      }
    ]
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing and Assembly Solutions',
    icon: Factory,
    description: 'End-to-end production services from prototype to small-batch manufacturing.',
    color: 'from-red-500 to-orange-400',
    overview: 'We take designs off the screen and into the real world. Our in-house capabilities in CNC machining, laser cutting, 3D printing, and precision assembly ensure that your components are built to spec and ready for action fast.',
    coreServices: [
      'CNC machining, turning, and laser fabrication',
      'FDM and resin 3D printing',
      'Welding, sheet metal work, and finishing',
      'Quality inspection, fitment, and functional assembly',
    ],
    tools: ['Fusion 360 CAM', 'Cura', 'Mach3', 'G-code simulators', 'MIG/TIG welding equipment'],
    services: [
      {
        title: 'Precision Machining',
        description: 'High-accuracy machining of components using CNC and conventional manufacturing methods.'
      },
      {
        title: 'Prototype Fabrication',
        description: 'Rapid manufacturing of functional prototypes and proof-of-concept models.'
      },
      {
        title: 'Assembly & Integration',
        description: 'Professional assembly of mechanical and electromechanical systems and subsystems.'
      },
      {
        title: 'Quality Control & Testing',
        description: 'Comprehensive inspection and performance validation of manufactured components and assemblies.'
      }
    ]
  }
];

const ServicesPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const serviceSectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // Function to scroll to the selected service section
  const scrollToService = (serviceId: string) => {
    setActiveSection(serviceId);
    const element = serviceSectionRefs.current[serviceId];
    if (element) {
      // Offset for the fixed header
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Ref callback to store references
  const setServiceRef: React.RefCallback<HTMLDivElement> = (element) => {
    if (element) {
      const id = element.id.replace('service-', '');
      serviceSectionRefs.current[id] = element;
    }
  };

  return (
    <main className="bg-gray-50 dark:bg-[#000000] min-h-screen">
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6"
        >
          <div className="flex flex-col gap-8 items-center text-center max-w-[800px] mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-primary font-secondary uppercase tracking-wider"
            >
              Our Services
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-primary"
            >
              Engineering Excellence<br/>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                For Every Challenge
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-[#3D3D3D] dark:text-white text-lg font-secondary mb-8"
            >
              At Enginaro (Pvt) Ltd, we offer a comprehensive suite of engineering services 
              designed to help industries innovate, build, and grow. From design and simulation 
              to fabrication and prototype delivery, our multidisciplinary team brings your ideas 
              to life with precision and performance.
            </motion.p>
          </div>
        </motion.section>
        
        {/* Service Categories */}
        <ScrollAnimatedSection className="w-full max-w-[1300px] mx-auto mb-20 px-4 md:px-6">
          <h2 className="text-3xl font-bold text-black dark:text-white font-primary text-center mb-10">
            Our Engineering Disciplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category, index) => (
              <ServiceCategoryCard 
                key={category.id} 
                category={category} 
                index={index}
                onClick={() => scrollToService(category.id)}
                isActive={activeSection === category.id}
              />
            ))}
          </div>
        </ScrollAnimatedSection>
        
        {/* Detailed Service Sections */}
        <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6">
          {serviceCategories.map((category, index) => (
            <div
              key={category.id}
              id={`service-${category.id}`}
              ref={setServiceRef}
              className="mb-24"
            >
              <ScrollAnimatedSection>
                <div className="bg-white dark:bg-[#292929] rounded-3xl p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
                    <div className={`w-16 h-16 rounded-xl bg-gray-100 dark:bg-[#3D3D3D] flex items-center justify-center flex-shrink-0`}>
                      <category.icon size={32} className="text-black dark:text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-black dark:text-white font-primary mb-2">
                        {category.title}
                      </h2>
                      <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  {category.id === 'mechanical' || category.id === 'mechatronic' || 
                   category.id === 'electrical' || category.id === 'civil' || 
                   category.id === 'computer' || category.id === 'manufacturing' ? (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-4">
                          Overview:
                        </h3>
                        <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                          {category.overview}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-4">
                          Core Services:
                        </h3>
                        <ul className="list-disc pl-6 space-y-2">
                          {category.coreServices?.map((service, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * idx }}
                              viewport={{ once: true }}
                              className="text-[#3D3D3D] dark:text-white text-lg font-secondary"
                            >
                              {service}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      

                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.services.map((service, sIndex) => (
                        <motion.div 
                          key={`${category.id}-service-${sIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * sIndex }}
                          viewport={{ once: true }}
                          className="bg-gray-50 dark:bg-[#292929] rounded-xl p-6"
                        >
                          <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-3">
                            {service.title}
                          </h3>
                          <p className="text-[#3D3D3D] dark:text-white font-secondary">
                            {service.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollAnimatedSection>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <ScrollAnimatedSection className="w-full max-w-[1300px] mx-auto py-16 px-4 md:px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-[600px] mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white font-primary mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-white text-lg font-secondary mb-8 opacity-90">
                Contact our team to discuss how our engineering expertise can help bring your vision to life.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary rounded-full py-4 px-8 flex items-center justify-center mx-auto gap-2 hover:bg-opacity-90 transition-all font-secondary"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="text-primary" />
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white"
                style={{ filter: 'blur(80px)' }}
              />
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-white"
                style={{ filter: 'blur(60px)' }}
              />
            </div>
          </div>
        </ScrollAnimatedSection>
      </div>
      <Footer />
    </main>
  );
};

// Helper Components
const ScrollAnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
  overview?: string;
  coreServices?: string[];
  tools?: string[];
  services: {
    title: string;
    description: string;
  }[];
}

const ServiceCategoryCard = ({ 
  category, 
  index,
  onClick,
  isActive
}: { 
  category: ServiceCategory;
  index: number;
  onClick: () => void;
  isActive: boolean;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Icon = category.icon;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      viewport={{ once: true }}
      className={`bg-white dark:bg-[#292929] rounded-3xl overflow-hidden h-full flex flex-col relative cursor-pointer ${
        isActive 
          ? 'ring-2 ring-primary shadow-lg shadow-primary/20 dark:shadow-primary/10' 
          : 'hover:shadow-lg'
      }`}
      whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)", scale: 1.02, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Card Header - Simple Design */}
      <div className="p-6 flex items-center gap-4 border-b border-gray-100 dark:border-gray-700">
        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#3D3D3D] flex items-center justify-center flex-shrink-0 transition-colors">
          <Icon size={28} className="text-black dark:text-white" />
        </div>
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
          viewport={{ once: true }}
          className="text-xl font-bold text-black dark:text-white font-primary"
        >
          {category.title}
        </motion.h3>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + (0.1 * index) }}
          viewport={{ once: true }}
          className="text-[#3D3D3D] dark:text-white font-secondary mb-6"
        >
          {category.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 + (0.1 * index) }}
          viewport={{ once: true }}
          className="mt-auto flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#3D3D3D] text-primary font-medium py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors"
        >
          <span>View Services</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesPage; 