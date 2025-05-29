"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  description?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }

    // Add overflow-x-hidden to body to prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
    
    return () => {
      // Cleanup
      document.body.style.overflowX = '';
    };
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // Small buffer to ensure button disables correctly
    }
  };

  const scrollLeftButton = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      
      // Update scroll buttons after animation completes
      setTimeout(() => {
        checkScrollability();
      }, 500); // Half a second should be enough for the scroll animation
    }
  };

  const scrollRightButton = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      
      // Update scroll buttons after animation completes
      setTimeout(() => {
        checkScrollability();
      }, 500); // Half a second should be enough for the scroll animation
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    // Prevent default browser behavior (like text selection)
    e.preventDefault();
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
    checkScrollability();
    
    // Prevent text selection during drag
    window.getSelection()?.removeAllRanges();
    return false;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    }
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    checkScrollability();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 288 : 384; // New card width
      const gap = isMobile() ? 16 : 24;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      
      // Update scroll buttons after animation completes
      setTimeout(() => {
        checkScrollability();
      }, 500);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 1024;
  };

  // Listen to window resize to check scrollability
  useEffect(() => {
    const handleResize = () => {
      checkScrollability();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full select-none">
        {/* Carousel container with overflow visible */}
        <div className="overflow-visible py-10 md:py-16 w-screen -ml-[calc(50vw-50%)] select-none"
             style={{ WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', userSelect: 'none' }}>
          <div
            className={`flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth
                      [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pl-[calc(50vw-50%)] 
                      ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
            ref={carouselRef}
            onScroll={checkScrollability}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', userSelect: 'none' }}
          >
            <div
              className="flex flex-row justify-start pl-4 max-w-[90vw] mx-auto gap-4 md:gap-6 xl:gap-8 md:max-w-[75vw] xl:max-w-[66vw] 2xl:max-w-[60vw] select-none"
            >
              {items.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                      once: true,
                    },
                  }}
                  key={"card" + index}
                  className="last:pr-[5%] md:last:pr-[33%] rounded-3xl select-none"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation buttons positioned as specified */}
        <div className="flex justify-end gap-[16px] mr-10 absolute bottom-0 right-[5%] max-md:top-[530px]">
          <button
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6301] transition-opacity duration-300",
              !canScrollLeft && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollLeftButton}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-white" />
          </button>
          <button
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6301] transition-opacity duration-300",
              !canScrollRight && "opacity-50 cursor-not-allowed"
            )}
            onClick={scrollRightButton}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [setOpen, onCardClose, index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden"; // Keep horizontal scroll hidden
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, handleClose);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 dark:bg-black/90 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white dark:bg-[#1B1B1B] p-4 font-sans md:p-10"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-2xl font-bold text-neutral-700 dark:text-white md:text-5xl md:leading-[1.2] whitespace-pre-line"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* New Card Design */}
      <div className="group/canvas-card select-none">
        <div className="rounded-[32px] p-[32px] overflow-hidden flex flex-col w-[384px] h-[640px] 
                      items-start justify-start relative z-10 max-lg:w-[288px] max-lg:h-[456px] select-none">
          <div className="relative z-40 flex flex-col gap-[16px] select-none">
            <p className="text-[#efefef] text-[36px] font-bold leading-[44px] max-w-xs text-left
                         [text-wrap:balance] font-sans mt-2 h-[88px] flex items-start select-none whitespace-pre-line">
              {card.title}
            </p>
            <p className="text-[#f5f5f5] inter-regular text-[16px] leading-[26px] md:text-xl font-medium text-left mt-2 tracking-[0] select-none">
              {card.description || "We create innovative solutions tailored to your business needs, driving growth and efficiency through technology."}
            </p>
          </div>
          
          <div className="h-full w-full bg-black absolute inset-0 select-none">
            {/* Background Image */}
            <div className="h-full w-full select-none">
              <div className="absolute inset-0 h-full w-full overflow-hidden select-none">
                <Image
                  src={card.src}
                  alt={card.title}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                  style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, userSelect: 'none'}}
                  width={1000}
                  height={1000}
                  draggable="false"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%] select-none"></div>
          </div>
          
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90 select-none pointer-events-none"></div>
        </div>
      </div>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  style,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      style={style}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
}; 