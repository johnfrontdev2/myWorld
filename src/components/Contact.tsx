import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const budgetDropdownRef = useRef<HTMLDivElement>(null);

  const projectOptions = [
    { value: 'premium-website', label: 'Premium Website' },
    { value: 'interactive-portfolio', label: 'Interactive Portfolio' },
    { value: 'seo-architecture', label: 'SEO & Growth Architecture' },
    { value: 'brand-identity', label: 'Brand Identity' },
    { value: 'consultation', label: 'Strategy Consultation' },
    { value: 'other', label: 'Other' }
  ];

  const budgetOptions = [
    { value: 'less-than-1k', label: 'Less than $1,000' },
    { value: '1k-5k', label: '$1,000 - $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-20k', label: '$10,000 - $20,000' },
    { value: 'more-than-20k', label: 'More than $20,000' }
  ];

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  }, [submitStatus]);

  const handleProjectSelect = useCallback((value: string) => {
    setFormData(prev => ({
      ...prev,
      project: value
    }));
    setIsDropdownOpen(false);
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  }, [submitStatus]);

  const handleBudgetSelect = useCallback((value: string) => {
    setFormData(prev => ({
      ...prev,
      budget: value
    }));
    setIsBudgetDropdownOpen(false);
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  }, [submitStatus]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const toggleBudgetDropdown = useCallback(() => {
    setIsBudgetDropdownOpen(prev => !prev);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target as Node)) {
        setIsBudgetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown with ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsBudgetDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const formatWhatsAppMessage = useCallback((data: typeof formData) => {
    const projectLabel = projectOptions.find(opt => opt.value === data.project)?.label || data.project;
    const budgetLabel = budgetOptions.find(opt => opt.value === data.budget)?.label || data.budget;
    
    const message = `🎯 *NEW PROJECT INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 *Client:* ${data.name}
📧 *Email:* ${data.email}
🚀 *Project Type:* ${projectLabel}
💰 *Budget:* ${budgetLabel}

💬 *Message:*
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 *Sent:* ${new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    })} (Brazil Time)
🌐 *Via:* johnnightsteel.netlify.app`;

    return encodeURIComponent(message);
  }, [projectOptions, budgetOptions]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.project || !formData.budget || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Format message for WhatsApp
      const whatsappMessage = formatWhatsAppMessage(formData);
      const whatsappUrl = `https://wa.me/557132159293?text=${whatsappMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      // Mark as success
      setSubmitStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          project: '',
          budget: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error processing form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, formatWhatsAppMessage]);

  return (
    <section 
      id="contact" 
      className="py-20 lg:py-32 bg-gradient-to-br from-white via-white to-midnight/[0.02] relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-midnight rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-midnight/5 text-midnight text-sm font-medium font-display tracking-wide rounded-full border border-silver/50">
                Contact
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <h2 
              id="contact-heading"
              className="text-display font-display font-bold mb-6 text-obsidian leading-tight"
            >
              Let's build something exceptional.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-xl text-gunmetal font-light leading-relaxed">
              Ready to elevate your digital presence? Share your vision and let's discuss how we can bring it to life.
            </p>
          </ScrollReveal>
        </div>
        
        {/* Form */}
        <ScrollReveal direction="up" delay={0.5}>
          <motion.form 
            onSubmit={handleSubmit} 
            className="card-elevated p-8 lg:p-12"
            noValidate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium text-sm">
                      Message sent successfully!
                    </p>
                    <p className="text-green-700 text-xs mt-1">
                      WhatsApp opened with your message. I'll respond within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 text-sm font-medium">
                    Please fill in all required fields.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-obsidian mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full transition-all duration-300 ${
                    submitStatus === 'error' && !formData.name.trim() 
                      ? 'border-red-300 focus:border-red-400' 
                      : 'focus:border-midnight'
                  }`}
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-obsidian mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full transition-all duration-300 ${
                    submitStatus === 'error' && !formData.email.trim() 
                      ? 'border-red-300 focus:border-red-400' 
                      : 'focus:border-midnight'
                  }`}
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            {/* Project Type Dropdown */}
            <div className="relative mb-6" ref={dropdownRef}>
              <label htmlFor="project" className="block text-sm font-medium text-obsidian mb-2">
                Project Type *
              </label>
              <button
                type="button"
                onClick={toggleDropdown}
                className={`w-full text-left transition-all duration-300 flex items-center justify-between ${
                  submitStatus === 'error' && !formData.project 
                    ? 'border-red-300 focus:border-red-400' 
                    : 'focus:border-midnight'
                }`}
                disabled={isSubmitting}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                id="project"
              >
                <span className={formData.project ? 'text-obsidian' : 'text-gunmetal'}>
                  {formData.project 
                    ? projectOptions.find(opt => opt.value === formData.project)?.label 
                    : 'Select project type'
                  }
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5 text-gunmetal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 backdrop-blur-md border border-silver/30 rounded-xl shadow-2xl overflow-hidden"
                    role="listbox"
                    aria-labelledby="project"
                  >
                    {projectOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleProjectSelect(option.value)}
                        className="w-full px-4 py-3 text-left text-obsidian hover:bg-midnight/5 focus:bg-midnight/5 focus:outline-none transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                        role="option"
                        aria-selected={formData.project === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Budget Dropdown */}
            <div className="relative mb-6" ref={budgetDropdownRef}>
              <label htmlFor="budget" className="block text-sm font-medium text-obsidian mb-2">
                Available Budget *
              </label>
              <button
                type="button"
                onClick={toggleBudgetDropdown}
                className={`w-full text-left transition-all duration-300 flex items-center justify-between ${
                  submitStatus === 'error' && !formData.budget 
                    ? 'border-red-300 focus:border-red-400' 
                    : 'focus:border-midnight'
                }`}
                disabled={isSubmitting}
                aria-expanded={isBudgetDropdownOpen}
                aria-haspopup="listbox"
                id="budget"
              >
                <span className={formData.budget ? 'text-obsidian' : 'text-gunmetal'}>
                  {formData.budget 
                    ? budgetOptions.find(opt => opt.value === formData.budget)?.label 
                    : 'Select your budget'
                  }
                </span>
                <motion.div
                  animate={{ rotate: isBudgetDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5 text-gunmetal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isBudgetDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 backdrop-blur-md border border-silver/30 rounded-xl shadow-2xl overflow-hidden"
                    role="listbox"
                    aria-labelledby="budget"
                  >
                    {budgetOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleBudgetSelect(option.value)}
                        className="w-full px-4 py-3 text-left text-obsidian hover:bg-midnight/5 focus:bg-midnight/5 focus:outline-none transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                        role="option"
                        aria-selected={formData.budget === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Message Field */}
            <div className="relative mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-obsidian mb-2">
                Tell me about your vision *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full resize-none transition-all duration-300 ${
                  submitStatus === 'error' && !formData.message.trim() 
                    ? 'border-red-300 focus:border-red-400' 
                    : 'focus:border-midnight'
                }`}
                placeholder="Describe your project goals, target audience, and what success looks like to you..."
                required
                aria-required="true"
                disabled={isSubmitting}
              />
            </div>
            
            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary justify-center min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed sheen-effect"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div 
                    key="loading" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <motion.div 
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sending Message...</span>
                  </motion.div>
                ) : submitStatus === 'success' ? (
                  <motion.div 
                    key="success" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <Check className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="send" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Privacy Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gunmetal leading-relaxed">
                🔒 Your message will be sent securely via WhatsApp. I typically respond within 24 hours.
              </p>
            </div>
          </motion.form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;