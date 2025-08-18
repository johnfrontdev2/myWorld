import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import ParallaxSection from './ParallaxSection';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden" itemScope itemType="https://schema.org/Person">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-midnight/[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content */}
          <div className="order-2 lg:order-1">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium font-display tracking-wide rounded-full border border-silver/50">
                  About
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.3}>
              <h2 className="text-display font-display font-bold mb-8 leading-tight text-obsidian">
                I architect digital experiences that command attention and drive results.
              </h2>
            </ScrollReveal>
             
            <div className="prose prose-lg text-gunmetal mb-8 space-y-6">
              <ScrollReveal direction="up" delay={0.4}>
                <p className="text-xl leading-relaxed" itemProp="description">
                  Based between global creative hubs, I specialize in building 
                  premium digital identities for leaders who refuse to blend in. 
                  Every project is an exercise in strategic precision and 
                  uncompromising craft.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.6}>
                <p className="leading-relaxed">
                  My work spans visionary startups, established enterprises, and 
                  cultural institutions — all united by a commitment to digital 
                  excellence that stands the test of time. I don't just build 
                  websites; I forge digital legacies.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.8}>
                <div className="pt-4 border-t border-silver/30">
                  <p className="text-sm font-display font-semibold text-midnight tracking-wider uppercase">
                    Strength in simplicity. Power in precision.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Stats or credentials */}
            <ScrollReveal direction="up" delay={1.0}>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-display font-bold text-obsidian mb-1">50+</div>
                  <div className="text-sm text-gunmetal font-medium">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-display font-bold text-obsidian mb-1">5+</div>
                  <div className="text-sm text-gunmetal font-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-display font-bold text-obsidian mb-1">100%</div>
                  <div className="text-sm text-gunmetal font-medium">Client Satisfaction</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Portrait */}
          <div className="order-1 lg:order-2">
            <ScrollReveal direction="right" delay={0.3}>
              <ParallaxSection speed={0.3}>
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="aspect-[4/5] metallic-frame rounded-2xl overflow-hidden shadow-2xl relative">
                    <motion.img 
                      src="/img/2.jpeg"
                      alt="johnnightsteel - Digital Architect working on premium brand identity"
                      itemProp="image"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      style={{
                        filter: 'contrast(1.1) brightness(0.9)',
                      }}
                      loading="lazy"
                    />
                    
                    {/* Steel tint overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-steel-highlight/10 via-transparent to-steel-shadow/20 pointer-events-none" />
                    
                    {/* Sheen effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                    </div>
                  </div>
                  
                  {/* Floating quote */}
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md border border-silver rounded-2xl p-4 shadow-xl max-w-xs"
                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    whileHover={{ rotate: 0, scale: 1.05 }}
                  >
                    <p className="text-sm font-serif italic text-gunmetal leading-relaxed">
                      "Excellence is not a destination, but a standard of execution."
                    </p>
                    <div className="mt-2 text-xs font-display font-semibold text-midnight">
                      — Design Philosophy
                    </div>
                  </motion.div>
                </motion.div>
              </ParallaxSection>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;