import React, { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Image } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'brand' | 'editorial';
  image: string;
  url: string;
  tags: string[];
}

// Componente de skeleton loader para imagens
const ImageSkeleton = React.memo(() => (
  <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
    <Image className="w-12 h-12 text-slate-400" />
  </div>
));

ImageSkeleton.displayName = 'ImageSkeleton';

// Componente otimizado de imagem com lazy loading avançado
const OptimizedImage = React.memo<{
  src: string;
  alt: string;
  loading: 'eager' | 'lazy';
  className?: string;
}>(({ src, alt, loading, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  // Gerar URL otimizada do Pexels com parâmetros de compressão
  const optimizedSrc = useMemo(() => {
    if (!src.includes('pexels.com')) return src;
    
    // Adiciona parâmetros de otimização do Pexels
    const url = new URL(src);
    url.searchParams.set('auto', 'compress');
    url.searchParams.set('cs', 'tinysrgb');
    url.searchParams.set('w', '800'); // Largura otimizada
    url.searchParams.set('h', '600'); // Altura otimizada
    url.searchParams.set('dpr', '1'); // Device pixel ratio
    url.searchParams.set('fit', 'crop'); // Crop para manter aspect ratio
    
    return url.toString();
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && !imageError && <ImageSkeleton />}
      
      {!imageError && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={loading}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          // Adiciona srcSet para diferentes densidades de tela
          srcSet={src.includes('pexels.com') ? `
            ${optimizedSrc}&w=400 400w,
            ${optimizedSrc}&w=800 800w,
            ${optimizedSrc}&w=1200 1200w
          ` : undefined}
          sizes={src.includes('pexels.com') ? `
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          ` : undefined}
        />
      )}
      
      {imageError && (
        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
          <div className="text-center text-slate-600">
            <Image className="w-8 h-8 mx-auto mb-2 opacity-60" />
            <span className="text-sm">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Componente do card do projeto com melhorias de performance
const ProjectCard = React.memo<{ project: Project; index: number }>(({ project, index }) => {
  const handleClick = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (project.url === '#') return;
    
    // Usa requestIdleCallback para melhor performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        window.open(project.url, '_blank', 'noopener,noreferrer');
      });
    } else {
      setTimeout(() => {
        window.open(project.url, '_blank', 'noopener,noreferrer');
      }, 0);
    }
  }, [project.url]);

  const isLive = useMemo(() => project.url !== '#', [project.url]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  }, [handleClick]);

  return (
    <ScrollReveal direction="up" delay={0.1 * index}>
      <article
        className="group cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.02]"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`${project.title} - ${project.description}${isLive ? ' - Live project' : ' - Coming soon'}`}
      >
        <div className="card-elevated overflow-hidden h-full">
          {/* Container de imagem otimizado */}
          <div className="aspect-[4/3] relative overflow-hidden">
            <OptimizedImage
              src={project.image}
              alt={`${project.title} - ${project.description}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-110"
              loading={index < 2 ? 'eager' : 'lazy'} // Apenas primeiros 2 cards carregam imediatamente
            />
            
            {/* RGB Overlay otimizado */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/4 to-pink-500/8 mix-blend-overlay" />
            </div>
            
            {/* Content Overlay com melhores transições */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 transform group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300">
              <div className="text-white">
                {/* Header com status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-white/90 bg-white/20 px-3 py-1.5 rounded-full capitalize backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-white/30">
                    {project.category}
                  </span>
                  {isLive && (
                    <div 
                      className="flex items-center gap-1.5"
                      aria-hidden="true"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-300 font-medium">Live</span>
                    </div>
                  )}
                </div>
                
                {/* Título otimizado */}
                <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 leading-tight line-clamp-2">
                  {project.title}
                </h3>
                
                {/* Descrição com line-clamp */}
                <p className="text-sm text-white/90 mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tags otimizadas */}
                <div className="flex flex-wrap gap-1.5 mb-4" role="list">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      role="listitem"
                      className="text-xs text-white/80 bg-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/25"
                    >
                      {tag}
                    </span> 
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs text-white/60 px-2.5 py-1">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* Action button melhorado */}
                {isLive ? (
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/30 transition-all duration-300 hover:bg-white/30 hover:border-white/40 focus:bg-white/30 focus:border-white/40">
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-white/70 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 cursor-not-allowed">
                    <span>Coming Soon</span>
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Sites: React.FC = () => {
  // Dados otimizados com URLs de imagem menores
  const projects = useMemo<Project[]>(() => [
    {
      id: 'luxury-hotel',
      title: 'Luxuria Hotel',
      description: 'Premium hospitality brand with immersive booking experience and luxury amenities',
      category: 'web',
      image: 'https://images.pexels.com/photos/33259643/pexels-photo-33259643.jpeg',
      url: 'https://luxuriahotel.netlify.app/',
      tags: ['Hospitality', 'Luxury', 'Booking', 'UX Design']
    },
    {
      id: 'sora-dubai',
      title: 'SORA Dubai',
      description: 'Sophisticated property showcase with architectural focus and modern design principles',
      category: 'web',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      url: 'https://soradubai.netlify.app/',
      tags: ['Real Estate', 'Architecture', 'Dubai', 'Property']
    },
    {
      id: 'jiu-jitsu',
      title: 'Jiu-jítsu Academy',
      description: 'Intense training, discipline and guaranteed evolution, on the mat and in life.',
      category: 'web',
      image: 'https://images.pexels.com/photos/7045756/pexels-photo-7045756.jpeg',
      url: 'https://jitsussss.netlify.app/',
      tags: ['SaaS', 'B2B', 'Technology', 'Platform']
    },
    {
      id: 'studio-nuvem',
      title: 'Studio Nuvem Agency',
      description: 'High-fashion brand identity with editorial storytelling and visual narrative',
      category: 'editorial',
      image: 'https://images.pexels.com/photos/6476256/pexels-photo-6476256.jpeg',
      url: 'https://studionuvem.netlify.app/',
      tags: ['Fashion', 'Editorial', 'Branding', 'Photography']
    },
    {
      id: 'brand-identity',
      title: 'Artisan Collective',
      description: 'Complete brand identity for luxury craft collective with authentic storytelling',
      category: 'brand',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      url: '#',
      tags: ['Branding', 'Luxury', 'Crafts', 'Identity']
    },
    {
      id: 'editorial-magazine',
      title: 'Modern Architecture',
      description: 'Digital magazine with immersive reading experience and interactive content',
      category: 'editorial',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      url: '#',
      tags: ['Magazine', 'Architecture', 'Editorial', 'Digital']
    }
  ], []);

  const handleStartProject = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section 
      id="sites" 
      className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden"
      aria-labelledby="sites-heading"
    >
      {/* Background gradient otimizado */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-midnight/[0.015] pointer-events-none will-change-auto" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header section */}
        <header className="text-center mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium font-display tracking-wide rounded-full border border-silver/50 transition-all duration-300 hover:bg-midnight/8">
                Selected Works
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <h2 
              id="sites-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6 text-obsidian leading-tight"
            >
              Crafted with intention.<br />Built for long-term impact.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg sm:text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
              Each project represents a strategic partnership focused on digital excellence and measurable results.
            </p>
          </ScrollReveal>
        </header>
        
        {/* Projects Grid otimizado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
        
        {/* Bottom CTA section */}
        <footer className="text-center mt-12 sm:mt-16 lg:mt-20">
          <ScrollReveal direction="up" delay={0.4}>
            <div className="max-w-2xl mx-auto">
              <p className="text-base sm:text-lg text-gunmetal mb-8 leading-relaxed">
                Ready to create something exceptional? Let's discuss your vision and bring it to life.
              </p>
              <motion.button
                onClick={handleStartProject}
                className="btn-primary sheen-effect inline-flex items-center gap-2 px-8 py-3 text-base font-medium rounded-full transition-all duration-300 focus:ring-4 focus:ring-blue-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to contact section to start a new project"
              >
                Start a Project
                <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </ScrollReveal>
        </footer>
      </div>
    </section>
  );
};

export default Sites;