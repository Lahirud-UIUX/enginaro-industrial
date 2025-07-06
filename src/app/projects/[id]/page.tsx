'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import Footer from '@/components/Footer';
import { DetailedProject } from '@/types/project';

// Project data is now loaded from CMS via API

// Image Carousel Component
const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Project Detail Page Component
const ProjectDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [project, setProject] = useState<DetailedProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      fetchProject(resolvedParams.id);
    }
  }, [resolvedParams]);

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        setProject(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setProject(null);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-50 dark:bg-[#000000] min-h-screen">
        <div className="pt-32 pb-32 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="bg-gray-50 dark:bg-[#000000] min-h-screen">
        <div className="pt-32 pb-32 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Project Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The requested project could not be found.</p>
            <Link href="/projects" className="text-primary hover:underline">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-[#000000] min-h-screen">
      <div className="pt-32 pb-32 px-4 md:px-6">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>

        {/* Project Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              {project.category}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {project.year}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-primary mb-6">
            {project.title}
          </h1>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <ImageCarousel images={project.images} title={project.title} />
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              {/* Client / Industry */}
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Client / Industry</h2>
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold text-black dark:text-white">Client: </span>
                    <span className="text-gray-700 dark:text-gray-300">{project.client}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-black dark:text-white">Industry: </span>
                    <span className="text-gray-700 dark:text-gray-300">{project.industry}</span>
                  </div>
                </div>
              </div>

              {/* Project Objective */}
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Project Objective</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.objective}
                </p>
              </div>

              {/* Engineering Insight */}
              {project.engineeringInsight && (
                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Engineering Insight</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.engineeringInsight}
                  </p>
                </div>
              )}

              {/* Scope of Work */}
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Scope of Work</h2>
                <ul className="space-y-3">
                  {project.scopeOfWork.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-12">
              {/* Engineering Challenges */}
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Engineering Challenges</h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Deliverables</h2>
                <ul className="space-y-3">
                  {project.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-black dark:text-white mb-6 flex items-center gap-2">
              <Tag size={20} />
              Related Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};

export default ProjectDetailPage; 