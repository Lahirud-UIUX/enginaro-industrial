'use client';

import React from 'react';
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import SectionAnimation from './ui/SectionAnimation';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: "Nidhij S",
    username: "India",
    body: "Very good experience. Super quick response and accommodating. Exactly what you need in a team doing 3D design work - especially when many things aren't clear at the start. Will definitely work again.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Daniel",
    username: "USA",
    body: "Nice guy. Tries best to accommodate you, meet with you & work with you on any iterations.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "marc G.",
    username: "Spain",
    body: "Hello! Thank you very much for your work. It has been what we were looking for.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Ethan M.",
    username: "USA",
    body: "My experience with Enginaro was great! Always responsive, professional, helpful, knowledgeable, and respectful. Enginaro is a company of its word and l'd definitely work with them again. I totally recommend them.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jeddah",
    username: "Saudi Arabia",
    body: "Skilled and experienced designer. Thanks Enginaro team.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James H.",
    username: "USA",
    body: "Enginaro is a very professional 3-D modeler. Provided high quality renderings for my project with a very quick turnaround for a fair price. I am already hiring again for another project and would recommend for anybody needing 3-D modeling.",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Alexandria",
    username: "Egypt",
    body: "Work is very good and I enjoyed working together.",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "Michael C.",
    username: "USA",
    body: "Had a small project that needed to be done last minute. Handled exceedingly quickly. Strongly recommend",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Adreas W.",
    username: "Austria",
    body: "It was a pleasure to work with him. Fast, professional, understood the requirements and was willing to correct and improve the design.",
    img: "https://avatar.vercel.sh/andreas",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white font-secondary">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40 font-secondary">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm dark:text-white/80 font-secondary">{body}</blockquote>
    </figure>
  );
};

const TestimonialsSection = () => {
  return (
    <SectionAnimation 
      animation="fadeIn"
      className="w-full max-w-[1300px] mx-auto py-16"
      id="testimonials"
    >
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-[720px] mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-2"
          >
            <p className="text-[#3D3D3D] dark:text-white text-sm font-secondary uppercase">TESTIMONIALS</p>
            <h2 className="text-4xl font-bold text-black dark:text-white font-primary">What Our Clients Say</h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[#3D3D3D] dark:text-white font-secondary"
          >
            Don't just take our word for it, hear what our satisfied clients have to say about their experience working with Enginaro Industrial Solutions.
          </motion.p>
        </motion.div>
        
        {/* Marquee Demo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative flex w-full flex-col items-center justify-center overflow-hidden"
        >
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review, index) => (
              <ReviewCard key={`first-${review.name}-${index}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review, index) => (
              <ReviewCard key={`second-${review.name}-${index}`} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background dark:from-[#000000]"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background dark:from-[#000000]"></div>
        </motion.div>
      </div>
    </SectionAnimation>
  );
};

export default TestimonialsSection; 