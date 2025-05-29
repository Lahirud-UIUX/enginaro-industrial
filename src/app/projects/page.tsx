'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Code, Gauge, Lightbulb, Search, Settings, Zap } from 'lucide-react';
import Footer from '@/components/Footer';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Industrial Automation System',
    category: 'Automation',
    description: 'A complete automation solution for manufacturing facilities that increases efficiency and reduces operational costs.',
    image: '/images/who-we-are.png',
    year: '2024',
    icon: Settings
  },
  {
    id: 2,
    title: 'Precision Measurement Tool',
    category: 'Design & Engineering',
    description: 'Custom-designed measurement tool for the aerospace industry that ensures accuracy to within 0.001mm.',
    image: '/images/who-we-are.png',
    year: '2024',
    icon: Gauge
  },
  {
    id: 3,
    title: 'IoT Monitoring System',
    category: 'Smart Systems',
    description: 'An IoT-based monitoring system for industrial equipment that provides real-time data and predictive maintenance alerts.',
    image: '/images/who-we-are.png',
    year: '2024',
    icon: Zap
  },
  {
    id: 4,
    title: 'Robotics Control Software',
    category: 'Software',
    description: 'Advanced control software for industrial robotics that improves precision and adaptability in manufacturing processes.',
    image: '/images/who-we-are.png',
    year: '2024',
    icon: Code
  },
  {
    id: 5,
    title: 'Energy Efficiency Audit',
    category: 'Consulting',
    description: 'Comprehensive energy efficiency audit for a large manufacturing plant, resulting in 30% reduction in energy consumption.',
    image: '/images/who-we-are.png',
    year: '2023',
    icon: Search
  },
  {
    id: 6,
    title: 'Product Innovation Workshop',
    category: 'Innovation',
    description: 'A collaborative workshop that generated 15 viable product concepts for a leading industrial equipment manufacturer.',
    image: '/images/who-we-are.png',
    year: '2023',
    icon: Lightbulb
  }
];

// Categories for filtering
const categories = [
  'All',
  'Automation',
  'Design & Engineering',
  'Smart Systems',
  'Software',
  'Consulting',
  'Innovation'
];

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [hoveredProject, setHoveredProject] = React.useState<number | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <main className="bg-gray-50 dark:bg-[#000000] min-h-screen" style={{ overflow: 'visible' }}>
      <div className="pt-32 pb-32" style={{ overflow: 'visible' }}>
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
              Our Projects
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-primary"
            >
              Engineering Solutions<br/>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                That Drive Innovation
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-[#3D3D3D] dark:text-white text-lg font-secondary mb-8"
            >
              Explore our portfolio of innovative engineering projects that solve complex industrial challenges 
              and deliver tangible business outcomes for our clients.
            </motion.p>
          </div>
        </motion.section>
        
        {/* Category Filters */}
        <ScrollAnimatedSection className="w-full max-w-[1300px] mx-auto mb-10 px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-secondary transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-[#1B1B1B] text-black dark:text-white hover:bg-primary/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </ScrollAnimatedSection>
        
        {/* Projects Grid */}
        <section className="w-full max-w-[1300px] mx-auto py-8 px-4 md:px-6 pb-16" style={{ overflow: 'visible' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ overflow: 'visible', paddingBottom: '40px' }}
          >
            {filteredProjects.map((project, index) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="block" style={{ overflow: 'visible' }}>
                <ProjectCard 
                  project={project}
                  index={index}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                />
              </Link>
            ))}
          </motion.div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-black dark:text-white font-primary mb-4">No projects found</h3>
              <p className="text-[#3D3D3D] dark:text-white font-secondary">
                No projects match the selected category. Please try another filter.
              </p>
            </motion.div>
          )}
        </section>
        
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
                Have a Project in Mind?
              </h2>
              <p className="text-white text-lg font-secondary mb-8 opacity-90">
                Let's discuss how our engineering expertise can help bring your vision to life and solve your industrial challenges.
              </p>
              <Link href="/contact" className="inline-block">
                <span className="bg-white text-primary rounded-full py-4 px-8 flex items-center justify-center mx-auto gap-2 hover:bg-opacity-90 transition-all font-secondary">
                  <span>Start a conversation</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="text-primary" />
                </span>
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

// CardWrapper component to handle shadow overflow
const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 -m-4">
      {children}
    </div>
  );
};

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  icon: React.ElementType;
}

const ProjectCard = ({ 
  project, 
  index, 
  isHovered,
  onHover,
  onLeave
}: { 
  project: Project; 
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Icon = project.icon;
  
  return (
    <div className="p-5 -m-5 mb-12" style={{ overflow: 'visible' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        viewport={{ once: true }}
        className="bg-white dark:bg-[#1B1B1B] rounded-3xl h-full flex flex-col"
        whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3 } }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={{ overflow: 'visible' }}
      >
        {/* Project Image */}
        <div className="h-[220px] relative">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill
            className="object-cover"
          />
          <motion.div
            initial={{ height: '100%' }}
            animate={inView ? { height: '0%' } : { height: '100%' }}
            transition={{ duration: 0.7, delay: 0.2 + (0.1 * index) }}
            className="absolute inset-0 bg-primary z-10"
          />
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.5 + (0.1 * index) }}
              className="bg-primary/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              {project.category}
            </motion.div>
          </div>
          
          {/* Year Badge */}
          <div className="absolute top-4 right-4 z-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + (0.1 * index) }}
              className="bg-black/60 dark:bg-dark-surface/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              {project.year}
            </motion.div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-start gap-4 mb-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + (0.1 * index) }}
              viewport={{ once: true }}
              className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0"
            >
              <Icon size={20} className="text-primary" />
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
              viewport={{ once: true }}
              className="text-xl font-bold text-black dark:text-white font-primary"
            >
              {project.title}
            </motion.h3>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + (0.1 * index) }}
            viewport={{ once: true }}
            className="text-[#3D3D3D] dark:text-white font-secondary mb-6"
          >
            {project.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + (0.1 * index) }}
            viewport={{ once: true }}
            className="mt-auto"
          >
            <Link href={`/projects/${project.id}`} onClick={(e) => e.stopPropagation()}>
              <span className="text-primary font-medium flex items-center gap-2 transition-all duration-300">
                View Project Details
                <motion.span
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex"
                >
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsPage; 