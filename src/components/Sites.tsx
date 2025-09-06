import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

const Sites: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Dados dos cards baseados no screenshot
  const cards = useMemo<Card[]>(() => [
    {
      id: 'shadcn-ui',
      title: 'shadcn/ui: Building a Modern Component Library',
      description: 'Explore how shadcn/ui revolutionized React component libraries by...',
      image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
      url: '#'
    },
    {
      id: 'tailwind-css',
      title: 'Tailwind CSS: The Utility-First Revolution',
      description: 'Discover how Tailwind CSS transformed the way developers style...',
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
      url: '#'
    },
    {
      id: 'astro-framework',
      title: 'Astro: The All-in-One Web Framework',
      description: 'Learn how Astro\'s innovative \'Islands Architecture\' and zero-JS-by-default...',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
      url: '#'
    },
    {
      id: 'react-components',
      title: 'React: Pioneering Component-Based Architecture',
      description: 'See how React continues to shape modern web development...',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
      url: '#'
    }
  ], []);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [cards.length, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [cards.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  }, [touchStart, touchEnd, handleNext, handlePrev]);

  const getVisibleCards = useMemo(() => {
    const visibleCards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % cards.length;
      visibleCards.push({ ...cards[index], position: i });
    }
    return visibleCards;
  }, [currentIndex, cards]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Latest Insights
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the latest trends and innovations in web development
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div 
            className="flex items-center justify-center gap-6 lg:gap-8 transition-all duration-500 ease-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleCards.map((card, index) => (
              <div
                key={`${card.id}-${currentIndex}`}
                className={`
                  relative rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer
                  ${index === 0 ? 
                    'w-80 h-96 sm:w-96 sm:h-[28rem] transform scale-95 opacity-60 z-10' : 
                    index === 1 ? 
                    'w-80 h-96 sm:w-96 sm:h-[28rem] lg:w-[28rem] lg:h-[32rem] transform scale-100 opacity-100 z-20 shadow-2xl' : 
                    'w-80 h-96 sm:w-96 sm:h-[28rem] transform scale-95 opacity-60 z-10'
                  }
                `}
                onClick={() => index === 1 && window.open(card.url, '_blank')}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight line-clamp-2">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-200 mb-6 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>

                  {/* Read More Button */}
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-300 transition-colors duration-300">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-slate-700 hover:bg-white hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-slate-700 hover:bg-white hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed
                ${index === currentIndex 
                  ? 'bg-slate-800 scale-125' 
                  : 'bg-slate-400 hover:bg-slate-600'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="w-full bg-slate-300 rounded-full h-1">
            <div 
              className="bg-slate-800 h-1 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sites;