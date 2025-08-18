import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, FileText, ArrowUpRight, ChevronDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  timeline: string;
  investment: string;
}

const Services: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const services: Service[] = useMemo(() => [
    {
      id: 'premium-websites',
      title: 'Premium Websites',
      description: 'Custom digital experiences built to establish authority and drive conversions through strategic design.',
      icon: Monitor,
      features: [
        'Strategic brand positioning',
        'Custom responsive design system',
        'Performance optimization (90+ PageSpeed)',
        'SEO foundation & technical setup',
        'Analytics & conversion tracking'
      ],
      timeline: '4-6 weeks',
      investment: 'Starting at $599'
    },
    {
      id: 'interactive-portfolios',
      title: 'Interactive Portfolios',
      description: 'Immersive portfolio experiences that showcase your work through compelling visual storytelling.',
      icon: Smartphone,
      features: [
        'Custom scroll animations',
        'Case study templates',
        'Image galleries & lightboxes',
        'Client testimonial integration',
        'Contact form & booking system'
      ],
      timeline: '3-4 weeks',
      investment: 'Starting at $299'
    },
    {
      id: 'seo-architecture',
      title: 'SEO & Growth Architecture',
      description: 'Complete content systems designed to build authority and drive sustainable organic growth.',
      icon: FileText,
      features: [
        'SEO-optimized site architecture',
        'Content management system',
        'Editorial design templates',
        'Social sharing integration',
        'Performance tracking & analytics'
      ],
      timeline: '2-3 weeks',
      investment: 'Starting at $1,199'
    }
  ], []);

  const handleToggle = useCallback((id: string) => {
    setExpandedService(prev => (prev === id ? null : id));
  }, []);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-br from-white via-white to-midnight/[0.01] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-midnight rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gunmetal rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium font-display tracking-wide rounded-full border border-silver/50">
                Services
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <h2 className="text-display font-display font-bold mb-6 text-obsidian leading-tight">
              Precision-crafted solutions for ambitious brands
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-xl text-gunmetal font-light max-w-3xl mx-auto leading-relaxed">
              Every service is designed to elevate your digital presence and drive measurable results.
            </p>
          </ScrollReveal>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} direction="up" delay={0.2 * (index + 1)}>
              <motion.div
                className={`card-elevated p-8 cursor-pointer h-full transition-all duration-500 ${
                  expandedService === service.id ? 'md:col-span-2 xl:col-span-3' : ''
                }`}
                onClick={() => handleToggle(service.id)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                layout
              >
                {/* Service Icon */}
                <div className="flex items-center gap-6 mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-steel-highlight/20 to-silver/20 rounded-2xl flex items-center justify-center border border-silver/30"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="w-7 h-7 text-midnight" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-obsidian mb-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gunmetal">
                      <span>{service.timeline}</span>
                      <span className="w-1 h-1 bg-silver rounded-full" />
                      <span className="font-semibold text-midnight">{service.investment}</span>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gunmetal leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-silver/30 pt-6 mb-6">
                        <h4 className="text-lg font-display font-semibold text-obsidian mb-4">
                          What's Included
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {service.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.3 }}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-midnight/5 transition-colors duration-200"
                            >
                              <div className="w-2 h-2 bg-midnight rounded-full flex-shrink-0" />
                              <span className="text-sm text-gunmetal">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToContact();
                        }}
                        className="btn-primary w-full justify-center sheen-effect"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Start This Project
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Collapsed CTA */}
                {expandedService !== service.id && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gunmetal group-hover:text-midnight transition-colors duration-300">
                      <span className="font-medium">View Details</span>
                      <motion.div
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-midnight/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-midnight" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <ScrollReveal direction="up" delay={0.6}>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-display font-semibold text-obsidian mb-4">
                Ready to elevate your digital presence?
              </h3>
              <p className="text-gunmetal mb-8 leading-relaxed">
                Let's discuss how we can build something exceptional together.
              </p>
              <motion.button
                onClick={scrollToContact}
                className="btn-primary sheen-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Services;