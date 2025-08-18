import React from 'react';
import { motion } from 'framer-motion';
import TextSplitAnimation from './TextSplitAnimation';
import ScrollReveal from './ScrollReveal';
import AnimatedButton from './AnimatedButton';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="py-16 min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient pt-20 lg:pt-24"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-midnight rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gunmetal rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div delay={0.1} direction="up" className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-silver shadow-lg">
                <span className="text-sm font-medium text-midnight tracking-wide font-display">
                  Digital Architect
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-8">
              <TextSplitAnimation
                className="text-hero font-display font-black text-obsidian leading-none"
                delay={0.3}
                duration={1.2}
                stagger={0.08}
                animationType="words"
              >
                Strength unseen.
              </TextSplitAnimation>
              <br />
              <TextSplitAnimation
                className="text-hero font-display font-black text-obsidian leading-none"
                delay={1.2}
                duration={1.2}
                stagger={0.08}
                animationType="words"
              >
                Results felt.
              </TextSplitAnimation>
            </div>
            
            {/* Subheadline - Sem animação */}
            <div className="mb-12">
              <p className="text-xl md:text-2xl text-gunmetal font-light leading-relaxed max-w-lg">
                Designing resilient digital identities for leaders and premium brands.
              </p>
            </div>
            
            {/* CTAs - Sem animação */}
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton
                  onClick={() => scrollToSection('sites')}
                  variant="primary"
                  className="group sheen-effect"
                >
                  Explore Portfolio
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </AnimatedButton>
                
                <AnimatedButton
                  onClick={() => scrollToSection('contact')}
                  variant="secondary"
                  className="group"
                >
                  Start a Project
                  <span className="ml-2 transform group-hover:translate-y-1 transition-transform duration-300 text-midnight">↓</span>
                </AnimatedButton>
              </div>
            </div>
          </div>
          
          {/* Right Column - Portrait */}
          <div className="order-1 lg:order-2">
            <ScrollReveal direction="right" delay={0.4}>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="aspect-[1/1] metallic-frame rounded-2xl overflow-hidden shadow-2xl relative group">
                  {/* Portrait Image */}
                  <motion.img 
                    src="/img/1.jpeg"
                    alt="johnnightsteel - Digital Architect and Creative Director"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    style={{
                      filter: 'contrast(1.1) brightness(0.9)',
                    }}
                    loading="eager"
                  />
                  
                  {/* Vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-steel-shadow/20 pointer-events-none" />
                  
                  {/* Sheen effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>
                </div>
                
                {/* Floating accent */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-midnight rounded-full flex items-center justify-center shadow-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <span className="text-white font-display font-bold text-sm">JS</span>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;