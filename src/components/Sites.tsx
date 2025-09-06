import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import ScrollReveal from './ScrollReveal';

const Sites: React.FC = () => {
  const projects = useMemo(() => [
    {
      id: 'buddychat',
      title: 'Buddychat Copilot',
      description: 'My first AI chatbot',
      category: 'ai',
      image: 'https://images.pexels.com/photos/18069697/pexels-photo-18069697.png',
      url: 'https://chat-john.netlify.app',
      tags: ['Branding', 'AI', 'Crafts', 'Identity']
    },
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
      description: 'Website for marketing and traffic agency',
      category: 'editorial',
      image: 'https://images.pexels.com/photos/6476256/pexels-photo-6476256.jpeg',
      url: 'https://studinuveem.netlify.app/',
      tags: ['Fashion', 'Editorial', 'Branding', 'Photography']
    },
    {
      id: 'agencia-flow',
      title: 'Agência Flow',
      description: 'Digital ads agency',
      category: 'marketing',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      url: 'https://agenciaflowww.netlify.app/',
      tags: ['ADS', 'Marketing', 'Digital']
    }
  ], []);

  const handleStartProject = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section id="sites" className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-midnight/[0.015]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium font-display tracking-wide rounded-full border border-silver/50">
                Selected Works
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6 text-obsidian">
              Crafted with intention.<br />Built for long-term impact.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg sm:text-xl text-gunmetal font-light max-w-3xl mx-auto">
              Each project represents a strategic partnership focused on digital excellence and measurable results.
            </p>
          </ScrollReveal>
        </header>

        {/* Carrossel Swiper */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 }
          }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <footer className="text-center mt-12 sm:mt-16 lg:mt-20">
          <ScrollReveal direction="up" delay={0.4}>
            <div className="max-w-2xl mx-auto">
              <p className="text-base sm:text-lg text-gunmetal mb-8">
                Ready to create something exceptional? Let's discuss your vision and bring it to life.
              </p>
              <motion.button
                onClick={handleStartProject}
                className="btn-primary sheen-effect inline-flex items-center gap-2 px-8 py-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          </ScrollReveal>
        </footer>
      </div>
    </section>
  );
};

export default Sites;
