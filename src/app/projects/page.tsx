'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import Footer from '@/components/Footer';
import { DetailedProject } from '@/types/project';

// Projects data is now loaded from CMS via API

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);
  const [projects, setProjects] = React.useState<DetailedProject[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?status=published');
      const data = await response.json();
      setProjects(data.projects);
      setCategories(['All', ...data.categories]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#000000] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-white">Loading projects...</p>
        </div>
      </div>
    );
  }

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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
            style={{ overflow: 'visible', paddingBottom: '40px' }}
          >
            {filteredProjects.map((project, index) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="block h-full" style={{ overflow: 'visible' }}>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white font-primary mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-white/90 text-lg font-secondary mb-8">
                Let's discuss how we can bring your engineering vision to life with our expertise and innovation.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-8 py-4 rounded-full font-secondary font-medium text-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  Get Started Today
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </ScrollAnimatedSection>
      </div>
      
      <Footer />
    </main>
  );
};

const ScrollAnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const ProjectCard = ({ 
  project, 
  index, 
  isHovered,
  onHover,
  onLeave
}: { 
  project: DetailedProject; 
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        whileHover={{ 
          y: -10,
          rotateX: 5,
          rotateY: 5,
          scale: 1.02
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          duration: 0.3
        }}
        className="bg-white dark:bg-[#1B1B1B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)'
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-primary font-secondary font-medium bg-primary/10 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <span className="text-sm text-[#3D3D3D] dark:text-white font-secondary">
              {project.year}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-[#3D3D3D] dark:text-white font-secondary text-sm mb-4 line-clamp-3 flex-grow">
            {project.description}
          </p>
          
          <div className="flex items-center text-primary font-secondary font-medium group-hover:translate-x-2 transition-transform duration-300 mt-auto">
            <span className="mr-2">View Details</span>
            <ArrowUpRight size={16} />
          </div>
        </div>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsPage; 