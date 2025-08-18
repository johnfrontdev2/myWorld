import React, { useState } from 'react';

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filters = ['All', 'Paris', 'Dubai', 'Studio', 'Outdoor'];
  
  const images = [
    { src: '/img/2.jpeg', category: 'Paris' },
    { src: '/img/3.jpg', category: 'Studio' },
    { src: '/img/4.jpg', category: 'Dubai' },
    { src: '/img/5.jpg', category: 'Outdoor' },
    { src: '/img/1.jpeg', category: 'Studio' },
    { src: '/img/2.jpeg', category: 'Paris' },
  ];

  const filteredImages = activeFilter === 'All' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <section id="gallery" className="hidden py-20 lg:py-32 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-brand-primary">
            Visual Chronicles
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeFilter === filter
                    ? 'text-brand-primary border-b-2 border-brand-accent'
                    : 'text-brand-secondary hover:text-brand-accent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer group overflow-hidden rounded-lg aspect-[3/4] shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => setLightboxImage(image.src)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxImage(image.src);
                }
              }}
              aria-label={`View ${image.category} gallery image ${index + 1}`}
            >
              <img
                src={image.src}
                alt={`${image.category} - Gallery image ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox">
          <img
            src={lightboxImage}
            alt="Enlarged gallery image"
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;