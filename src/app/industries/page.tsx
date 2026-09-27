'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import Footer from '@/components/Footer';
import SectionAnimation from '@/components/ui/SectionAnimation';

import IndustryCard01 from '@/images/industries-card01.png';
import IndustryCard02 from '@/images/industries-card02.png';
import IndustryCard03 from '@/images/industries-card03.png';
import IndustryCard04 from '@/images/industries-card04.png';
import IndustryCard05 from '@/images/industries-card05.png';

interface Industry {
  id: string;
  title: string;
  image: StaticImageData;
  description: string;
  overview: string;
  support: string[];
  disciplines: string[];
}

const industries: Industry[] = [
  {
    id: 'industrial-manufacturing',
    title: 'Industrial Manufacturing',
    image: IndustryCard01,
    description: 'Efficient solutions to improve production, reduce waste, and build better systems.',
    overview:
      'We help manufacturers improve how products are designed, produced and assembled. From machine design to production tooling and automation, our team focuses on practical solutions that increase efficiency and reliability on the factory floor.',
    support: [
      'Machine and equipment design',
      'Jigs, fixtures and production tooling',
      'Process automation and control systems',
      'Design for Manufacturing and Assembly (DFM/DFA)',
      'CNC machining, fabrication and assembly',
    ],
    disciplines: ['Mechanical', 'Mechatronics & IoT', 'Manufacturing & Assembly'],
  },
  {
    id: 'automotive-machinery',
    title: 'Automotive & Machinery',
    image: IndustryCard02,
    description: 'Design, test, and build parts and systems for vehicles and heavy equipment.',
    overview:
      'We support the development of components, sub-assemblies and systems for vehicles and heavy machinery. Our design and simulation capabilities help validate performance and durability before parts go into production.',
    support: [
      'Component design and reverse engineering',
      'Structural, fatigue and thermal simulation (FEA/CFD)',
      'Tolerance stack-up and technical calculations',
      'Embedded electronics and sensor integration',
      'Prototype fabrication and functional testing',
    ],
    disciplines: ['Mechanical', 'Electrical & Electronic', 'Manufacturing & Assembly'],
  },
  {
    id: 'building-infrastructure',
    title: 'Building Infrastructure',
    image: IndustryCard03,
    description: 'Engineering support for smart buildings, automation, and mechanical systems.',
    overview:
      'We provide engineering support for buildings, industrial facilities and infrastructure projects. Our work covers structural design, building services coordination and smart, connected systems for modern facilities.',
    support: [
      'Reinforced concrete and steel structure design',
      'Foundation and geotechnical engineering',
      'HVAC, plumbing, fire safety and electrical layouts',
      'Building automation and IoT monitoring',
      'BOQ, construction drawings and detailing',
    ],
    disciplines: ['Civil & Structural', 'Electrical & Electronic', 'Mechatronics & IoT'],
  },
  {
    id: 'research-development',
    title: 'Research & Development',
    image: IndustryCard04,
    description: 'Prototyping, simulation, and testing for innovative product ideas.',
    overview:
      'We work alongside research teams, universities and innovators to turn new ideas into working prototypes. Simulation, rapid prototyping and testing help validate concepts quickly and support better engineering decisions.',
    support: [
      'Concept development and feasibility studies',
      'CAD modeling and engineering simulation',
      'Rapid prototyping with 3D printing and CNC',
      'Test rigs, data acquisition and instrumentation',
      'Custom software and data visualization tools',
    ],
    disciplines: ['Mechanical', 'Mechatronics & IoT', 'Software & Digital'],
  },
  {
    id: 'product-innovators',
    title: 'Product Innovators (Startups & SMEs)',
    image: IndustryCard05,
    description: 'Help for startups and small businesses to turn concepts into ready-to-launch products.',
    overview:
      'We help startups and SMEs take products from idea to launch. As an extension of your team, we cover design, electronics, software and manufacturing so you can move from concept to a market-ready product with confidence.',
    support: [
      'Product design and industrial prototyping',
      'Electronics, PCB and enclosure design',
      'Mobile, web and IoT app development',
      'Design optimization for cost and manufacturability',
      'Small-batch manufacturing and assembly',
    ],
    disciplines: ['Mechanical', 'Electrical & Electronic', 'Software & Digital', 'Manufacturing & Assembly'],
  },
];

const IndustriesPage = () => {
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
              Industries
            </motion.span>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-primary"
            >
              Engineering Solutions<br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Across Industries
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-[#3D3D3D] dark:text-white text-lg font-secondary"
            >
              We work with a wide range of industries, delivering smart, practical, and scalable
              engineering solutions that fit real-world needs.
            </motion.p>
          </div>

          {/* Quick links to each industry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {industries.map((industry) => (
              <a
                key={industry.id}
                href={`#${industry.id}`}
                className="bg-white dark:bg-[#292929] text-black dark:text-white rounded-full py-3 px-6 font-secondary text-sm hover:text-primary dark:hover:text-primary transition-colors"
              >
                {industry.title}
              </a>
            ))}
          </motion.div>
        </motion.section>

        {/* Industry Sections */}
        <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 space-y-12">
          {industries.map((industry, index) => (
            <SectionAnimation key={industry.id} id={industry.id} className="scroll-mt-32">
              <div
                className={`bg-white dark:bg-[#292929] rounded-3xl p-6 md:p-10 flex flex-col gap-8 lg:gap-12 lg:items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                <motion.div
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="relative w-full lg:w-[420px] h-[280px] md:h-[335px] rounded-3xl overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute bottom-0 left-0 p-6 text-white font-secondary text-sm font-semibold">
                    {industry.description}
                  </p>
                </motion.div>

                <div className="flex-1">
                  <span className="text-primary font-secondary uppercase tracking-wider text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-3xl font-bold text-black dark:text-white font-primary mt-2 mb-4">
                    {industry.title}
                  </h2>
                  <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary mb-6">
                    {industry.overview}
                  </p>

                  <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-4">
                    How We Support:
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {industry.support.map((item, idx) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * idx }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 text-[#3D3D3D] dark:text-white font-secondary"
                      >
                        <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {industry.disciplines.map((discipline) => (
                      <Link
                        key={discipline}
                        href="/services"
                        className="bg-gray-100 dark:bg-[#3D3D3D] text-black dark:text-white rounded-full py-2 px-4 text-sm font-secondary hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {discipline}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SectionAnimation>
          ))}
        </div>

        {/* CTA Section */}
        <SectionAnimation className="w-full max-w-[1300px] mx-auto py-16 px-4 md:px-6">
          <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="relative z-10 max-w-[600px] mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-primary mb-6">
                Don&apos;t See Your Industry?
              </h2>
              <p className="text-white text-lg font-secondary mb-8 opacity-90">
                Our multidisciplinary team adapts to new challenges. Tell us about your project and
                we&apos;ll find the right engineering approach.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-fit mx-auto">
                <Link
                  href="/contact"
                  className="bg-white text-primary rounded-full py-4 px-8 flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all font-secondary"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="text-primary" />
                </Link>
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white opacity-10" style={{ filter: 'blur(80px)' }} />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-white opacity-10" style={{ filter: 'blur(60px)' }} />
          </div>
        </SectionAnimation>
      </div>
      <Footer />
    </main>
  );
};

export default IndustriesPage;
