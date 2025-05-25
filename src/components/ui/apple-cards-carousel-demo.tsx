"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 select-none"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto select-none">
              <span className="font-bold text-neutral-700 dark:text-neutral-200 select-none">
                Innovative solutions for modern challenges.
              </span>{" "}
              We leverage cutting-edge technology to deliver results that exceed expectations 
              and drive your business forward in today&apos;s competitive landscape.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height={500}
              width={500}
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain select-none pointer-events-none"
              draggable="false"
              style={{ userSelect: 'none' }}
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Services",
    title: "Engineering Design",
    description: "We create smart, practical designs for mechanical, electrical, and electronic systems.",
    src: "https://images.unsplash.com/photo-1739283546829-ddf2f51256c5?q=80&w=2205&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Services",
    title: "Simulation & Rendering",
    description: "We test and refine your designs with stress, motion, and thermal simulations.",
    src: "https://images.unsplash.com/photo-1706137967021-7b25c7225f80?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Services",
    title: "Prototyping & 3D Printing Design",
    description: "We quickly build working models using precise 3D printing and prototyping tools.",
    src: "https://images.unsplash.com/photo-1722532476187-70120c1dca4c?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Services",
    title: "CNC Machining",
    description: "We offer CNC programming and machining for accurate part production.",
    src: "https://images.unsplash.com/photo-1602223114290-ba6de2938acc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Services",
    title: "Fabrication & Manufacturing",
    description: "We build and assemble components with welding, sheet metal work, and more.",
    src: "https://images.unsplash.com/photo-1735494033576-9c882e80504c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Services",
    title: "IoT & Smart Engineering",
    description: "We add smart control and monitoring with IoT-based systems and sensors.",
    src: "https://images.unsplash.com/photo-1601192711507-e21a1e78e549?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
]; 