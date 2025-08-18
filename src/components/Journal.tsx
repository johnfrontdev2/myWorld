import React from 'react';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { posts } from '../data/posts';

const Journal: React.FC = () => {
  const handleNavigate = (path: string) => {
    // Navegação nativa usando window.location
    window.location.href = path;
  };

  return (
    <section id="journal" className="py-20 lg:py-32 bg-brand-light overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-brand-primary">
              Journal
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-brand-secondary text-lg">
              Thoughts on design, culture, and the future of digital experiences.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 w-full">
          {posts.map((post, index) => (
            <ScrollReveal key={index} direction="up" delay={0.2 * (index + 1)}>
              <motion.article 
                className="group cursor-pointer card-elevated p-8 hover:shadow-xl transition-shadow duration-300 w-full min-w-0"
                onClick={() => handleNavigate(`/post/${post.id}`)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="border-b border-brand-border pb-6 w-full">
                  <motion.div 
                    className="flex items-center text-sm text-brand-secondary mb-4 flex-wrap gap-1"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                    
                    {/* Tags de segmentação */}
                    {post.category && (
                      <>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          post.category === 'For Founders' 
                            ? 'bg-brand-accent/10 text-brand-accent' 
                            : 'bg-brand-primary/10 text-brand-primary'
                        }`}>
                          {post.category}
                        </span>
                      </>
                    )}
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-serif font-medium mb-4 text-brand-primary group-hover:text-brand-accent transition-colors duration-300 cursor-pointer break-words"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {post.title}
                  </motion.h3>
                  
                  <p className="text-brand-secondary leading-relaxed mb-4 break-words">
                    {post.preview}
                  </p>
                  
                  {/* Botão Read More discreto */}
                  <motion.div 
                    className="inline-flex items-center gap-1 text-sm text-brand-secondary hover:text-brand-accent transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-medium">Read more</span>
                    <svg 
                      className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>

        {/* Seção CTA - Ver Todos e Newsletter */}
        <div className="mt-16 text-center space-y-8">
          <ScrollReveal direction="up" delay={0.6}>
            <motion.button
              onClick={() => handleNavigate('/journal')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-100 hover:text-black rounded-full transition-all duration-300 ease-out transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">View All Articles</span>
              <svg 
                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.8}>
            <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-8 max-w-lg mx-auto shadow-lg">
              <div className="mb-4">
                <h3 className="text-lg font-serif font-medium text-brand-primary mb-2">
                  Never Miss an Insight
                </h3>
                <p className="text-sm text-brand-secondary">
                  Get fresh perspectives on design and digital innovation delivered to your inbox.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 text-sm border border-brand-border rounded-full focus:border-brand-accent focus:outline-none bg-white/80 placeholder-brand-secondary/60"
                  required
                />
                <motion.button
                  type="button"
                  className="px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-100 hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => console.log('Newsletter subscription')}
                >
                  Subscribe
                </motion.button>
              </div>
              
              <p className="text-xs text-brand-secondary/60 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Journal;