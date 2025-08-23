import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // Se não estamos na página inicial, navegar primeiro
    if (location.pathname !== '/') {
      navigate('/');
      // Aguardar a navegação e então rolar
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Se já estamos na página inicial, rolar diretamente
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname, navigate]);

  const navigateToPage = useCallback((path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = ['About', 'Services', 'Sites', 'Journal', 'Contact'];

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-silver' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="https://johnnightsteel.netlify.app">
            <motion.button 
              className="text-obsidian hover:text-midnight transition-colors duration-300 select-none min-h-[44px] flex items-center group"
              onClick={() => scrollToSection('hero')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToSection('hero');
                }
              }}
              aria-label="Go to top"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <div className="flex items-center space-x-3">
                {/* Metallic mark */}
                <div className="w-8 h-8 bg-gradient-to-br from-steel-highlight to-silver rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-obsidian font-display font-black text-sm">JS</span>
                </div>
                
                {/* Brand name */}
                <div className="flex items-baseline">
                  <span className="text-xl font-display font-bold tracking-tight text-obsidian">
                    johnnightsteel
                  </span>
                </div>
              </div>
            </motion.button></a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-gunmetal hover:text-midnight transition-all duration-300 tracking-wide relative group py-2 px-3 min-h-[44px] flex items-center"
                  aria-label={`Go to ${item} section`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  type="button"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-midnight transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
              
              {/* Partnership Link */}
              <motion.button
                onClick={() => navigateToPage('/partnership')}
                className="text-sm font-medium text-midnight hover:text-obsidian transition-all duration-300 tracking-wide relative group py-2 px-3 min-h-[44px] flex items-center bg-midnight/5 rounded-full"
                aria-label="Go to Partnership page"
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ animationDelay: `${menuItems.length * 0.1}s` }}
                type="button"
              >
                Parcerias
              </motion.button>
              
              {/* Sticky CTA */}
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="btn-primary text-xs px-4 py-2 sheen-effect"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isScrolled ? 1 : 0.8, 
                  scale: isScrolled ? 1 : 0.9 
                }}
                transition={{ duration: 0.3 }}
                type="button"
              >
                Start a Project
              </motion.button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button 
                onClick={toggleMobileMenu}
                className="p-3 text-obsidian hover:text-midnight transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-opacity-50 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                whileTap={{ scale: 0.9 }}
                type="button"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-obsidian/50 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-md shadow-2xl z-50 md:hidden border-l border-silver"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            id="mobile-menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-silver min-h-[80px]">
              <h2 
                id="mobile-menu-title" 
                className="text-obsidian flex items-center space-x-2"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-steel-highlight to-silver rounded flex items-center justify-center">
                  <span className="text-obsidian font-display font-black text-xs">JS</span>
                </div>
                <span className="text-lg font-display font-bold">johnnightsteel</span>
              </h2>
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-obsidian hover:text-midnight transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-opacity-50 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="px-6 py-8" role="navigation">
              <ul className="space-y-2" role="list">
                {menuItems.map((item, index) => (
                  <li key={item} role="listitem">
                    <motion.button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left py-4 px-4 text-lg font-medium text-obsidian hover:text-midnight hover:bg-midnight/5 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-opacity-50 group min-h-[56px] flex items-center"
                      aria-label={`Go to ${item} section`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 8 }}
                      type="button"
                    >
                      <span className="block transform transition-transform duration-300 group-hover:translate-x-2">
                        {item}
                      </span>
                    </motion.button>
                  </li>
                ))}
                
                {/* Mobile Partnership Link */}
                <li className="pt-2">
                  <motion.button
                    onClick={() => navigateToPage('/partnership')}
                    className="block w-full text-left py-4 px-4 text-lg font-medium text-midnight hover:text-obsidian hover:bg-midnight/10 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-midnight focus:ring-opacity-50 group min-h-[56px] flex items-center bg-midnight/5"
                    aria-label="Go to Partnership page"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                    whileHover={{ x: 8 }}
                    type="button"
                  >
                    <span className="block transform transition-transform duration-300 group-hover:translate-x-2">
                      Parcerias
                    </span>
                  </motion.button>
                </li>
                
                {/* Mobile CTA */}
                <li className="pt-4">
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className="btn-primary w-full justify-center sheen-effect"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (menuItems.length + 1) * 0.1, duration: 0.3 }}
                    type="button"
                  >
                    Start a Project
                  </motion.button>
                </li>
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-center py-4 border-t border-silver">
                <p className="text-sm text-gunmetal font-display">
                  Digital Architect
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;