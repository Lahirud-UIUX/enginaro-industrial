'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Wrench, Zap, ArrowUpRight, Users, Award, Lightbulb } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/utils/animations';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import WhoWeAreImage from '@/images/who-we-are.png';

const AboutPage = () => {
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
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-primary font-secondary uppercase tracking-wider"
              >
                About Us
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-primary mt-4 mb-6"
              >
                Engineering Excellence, <br/>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Innovative Solutions
                </motion.span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-[#3D3D3D] dark:text-white text-lg font-secondary mb-8"
              >
                At Enginaro Industrial, we're dedicated to turning complex engineering challenges into practical, 
                high-performance solutions that drive innovation and efficiency for our clients.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white rounded-full py-4 px-8 flex items-center justify-center w-fit gap-2 hover:bg-opacity-90 transition-all font-secondary"
              >
                <span>Contact our team</span>
                <ArrowUpRight size={20} strokeWidth={1.5} className="text-white" />
              </motion.button>
            </motion.div>
            
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full lg:w-1/2 h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden"
            >
              <Image 
                src={WhoWeAreImage} 
                alt="Engineering Team" 
                fill
                className="object-cover"
              />
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary z-10"
              />
            </motion.div>
          </div>
        </motion.section>
        
        {/* Our Approach Section */}
        <section className="w-full max-w-[1300px] mx-auto py-16 px-4 md:px-6 bg-white dark:bg-[#1B1B1B] rounded-3xl mb-16">
          <ScrollAnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left content */}
              <div className="flex flex-col gap-6">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-primary font-secondary uppercase tracking-wider"
                >
                  Our Approach
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary"
                >
                  Engineering Excellence Through Partnership
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                    At Enginaro, we believe that every project is a partnership—we work as an extension of your team to understand your vision, align with your objectives, and engineer real-world solutions that last.
                  </p>
                  
                  <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                    Our team uses industry-standard and advanced software platforms such as SolidWorks, Inventor, AutoCAD, Fusion 360, ANSYS, and Abaqus to enhance accuracy, performance, and design quality. We also integrate IoT-based control systems to support smart, connected solutions across engineering applications.
                  </p>
                </motion.div>
              </div>
              
              {/* Right content */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-8 bg-gray-50 dark:bg-[#292929] rounded-3xl relative z-10"
                >
                  <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary mb-6">
                    We combine technical expertise with project consultation to offer complete support from concept development to prototype realization and final delivery. Our approach integrates design, engineering, simulation, and client collaboration, ensuring each project meets cost, quality, and time expectations.
                  </p>
                  
                  {/* Software icons and tools */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-4">Tools We Use</h3>
                    <div className="flex flex-wrap gap-3">
                      {['SolidWorks', 'AutoCAD', 'Fusion 360', 'ANSYS', 'Abaqus', 'IoT'].map((tool, index) => (
                        <motion.div
                          key={tool}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          viewport={{ once: true }}
                          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                          className="px-4 py-2 bg-white dark:bg-[#3D3D3D] rounded-full text-black dark:text-white text-sm font-medium"
                        >
                          {tool}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute top-4 right-4 -z-10 w-full h-full rounded-3xl border-2 border-primary/20"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -right-4 -z-10 w-32 h-32 rounded-full bg-primary/10"
                />
              </div>
            </div>
          </ScrollAnimatedSection>
        </section>
        
        {/* Our History Section */}
        <section className="w-full max-w-[1300px] mx-auto py-16 px-4 md:px-6 bg-white dark:bg-[#1B1B1B] rounded-3xl mb-16">
          <ScrollAnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Right content (appears first in the flipped layout) */}
              <div className="relative order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-8 bg-gray-50 dark:bg-[#292929] rounded-3xl relative z-10"
                >
                  <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary mb-6">
                    From this vision, Enginaro was born: a lean but agile firm designed to serve both Sri Lankan enterprises and international industries with custom-engineered solutions and a deeply collaborative mindset.
                  </p>
                  
                  <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                    Today, Enginaro continues to grow—driven by talent, powered by experience, and inspired by challenges.
                  </p>
                  
                  {/* Timeline elements */}
                  <div className="mt-10">
                    <h3 className="text-xl font-bold text-black dark:text-white font-primary mb-6">Our Journey</h3>
                    <div className="space-y-6">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-sm font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="text-black dark:text-white font-bold font-primary">Foundation</h4>
                          <p className="text-sm text-[#3D3D3D] dark:text-white">Established in 2024 through strategic merger</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-sm font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="text-black dark:text-white font-bold font-primary">Expansion</h4>
                          <p className="text-sm text-[#3D3D3D] dark:text-white">Growth of capabilities and client portfolio</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-sm font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="text-black dark:text-white font-bold font-primary">Innovation</h4>
                          <p className="text-sm text-[#3D3D3D] dark:text-white">Continuing to pioneer advanced solutions</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute top-4 left-4 -z-10 w-full h-full rounded-3xl border-2 border-primary/20"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -left-4 -z-10 w-32 h-32 rounded-full bg-primary/10"
                />
              </div>
              
              {/* Left content (appears second in the flipped layout) */}
              <div className="flex flex-col gap-6 order-1 lg:order-2">
                <motion.span 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-primary font-secondary uppercase tracking-wider"
                >
                  Our History
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-black dark:text-white font-primary"
                >
                  Where Innovation Meets Experience
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                    Enginaro (Pvt) Ltd was established in 2024 through a strategic merger of skilled professionals and small engineering teams with a shared passion for innovation and industrial problem-solving. The founding partners envisioned a company that would merge traditional engineering excellence with modern digital tools—creating a new standard in design, fabrication, and consulting.
                  </p>
                  
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative h-[200px] mt-6 rounded-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="text-5xl font-bold text-primary/40 font-primary"
                      >
                        EST. 2024
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </ScrollAnimatedSection>
        </section>
        
        {/* Our Mission Section */}
        <section className="w-full max-w-[1300px] mx-auto py-16 px-4 md:px-6">
          <ScrollAnimatedSection>
            <div className="max-w-[800px] mx-auto text-center mb-16">
              <span className="text-primary font-secondary uppercase tracking-wider">Our Mission</span>
              <h2 className="text-4xl font-bold text-black dark:text-white font-primary mt-4 mb-6">
                Engineering a Better Future
              </h2>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                Our mission is to deliver engineering excellence that transforms industries and improves lives. 
                We combine innovation, precision, and reliability to create solutions that stand the test of time.
              </p>
            </div>
          </ScrollAnimatedSection>
          
          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Award, 
                title: "Excellence", 
                description: "We pursue excellence in every project, from concept to completion." 
              },
              { 
                icon: Users, 
                title: "Collaboration", 
                description: "We work closely with clients to understand their unique challenges." 
              },
              { 
                icon: Lightbulb, 
                title: "Innovation", 
                description: "We constantly explore new ideas and technologies to deliver better solutions." 
              },
            ].map((value, index) => (
              <ValueCard 
                key={index} 
                icon={value.icon} 
                title={value.title} 
                description={value.description} 
                index={index} 
              />
            ))}
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="w-full max-w-[1300px] mx-auto py-16 px-4 md:px-6">
          <ScrollAnimatedSection>
            <div className="max-w-[800px] mx-auto text-center mb-16">
              <span className="text-primary font-secondary uppercase tracking-wider">Our Team</span>
              <h2 className="text-4xl font-bold text-black dark:text-white font-primary mt-4 mb-6">
                Experts in Their Field
              </h2>
              <p className="text-[#3D3D3D] dark:text-white text-lg font-secondary">
                Our diverse team brings together decades of experience across multiple engineering disciplines, 
                ensuring we can tackle any challenge with confidence and creativity.
              </p>
            </div>
          </ScrollAnimatedSection>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3,].map((member, index) => (
              <TeamMember key={index} index={index} />
            ))}
          </div>
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
                Ready to Start Your Next Project?
              </h2>
              <p className="text-white text-lg font-secondary mb-8 opacity-90">
                Get in touch with our team to discuss how we can help bring your engineering vision to life.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary rounded-full py-4 px-8 flex items-center justify-center mx-auto gap-2 hover:bg-opacity-90 transition-all font-secondary"
              >
                <span>Contact us today</span>
                <ArrowUpRight size={20} strokeWidth={1.5} className="text-primary" />
              </motion.button>
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

const ValueCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  index: number 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white dark:bg-[#1B1B1B] rounded-3xl p-8 flex flex-col"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6"
      >
        <Icon size={24} strokeWidth={1.5} className="text-primary" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-black dark:text-white font-primary mb-3">{title}</h3>
      <p className="text-[#3D3D3D] dark:text-white font-secondary">{description}</p>
    </motion.div>
  );
};

const TeamMember = ({ index }: { index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white dark:bg-[#1B1B1B] rounded-3xl overflow-hidden"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="h-[250px] relative bg-gray-200">
        {/* Fallback colored background with role icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
          <Users size={64} className="text-primary/50" />
        </div>
        
        <motion.div
          initial={{ height: '100%' }}
          animate={inView ? { height: '0%' } : { height: '100%' }}
          transition={{ duration: 0.7, delay: 0.2 + (0.1 * index) }}
          className="absolute inset-0 bg-primary z-10"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-black dark:text-white font-primary">Engineering Expert {index + 1}</h3>
        <p className="text-primary font-secondary">Lead Engineer</p>
      </div>
    </motion.div>
  );
};

export default AboutPage; 