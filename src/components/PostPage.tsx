import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from './PageTransition';
import AnimatedButton from './AnimatedButton';
import { posts } from '../data/posts';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 
  
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-brand-primary mb-4">Post not found</h1>
          <AnimatedButton
            onClick={() => navigate('/')}
            variant="secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </AnimatedButton>
        </div>
      </div>
      </PageTransition>
    );
  }

  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl md:text-4xl font-serif font-light mb-8 text-brand-primary leading-tight">
              {trimmedLine.substring(2)}
            </h1>
          );
        }
        
        if (trimmedLine.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-serif font-light mb-6 mt-12 text-brand-primary leading-tight">
              {trimmedLine.substring(3)}
            </h2>
          );
        }
        
        if (trimmedLine.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl md:text-2xl font-serif font-medium mb-4 mt-8 text-brand-primary leading-tight">
              {trimmedLine.substring(4)}
            </h3>
          );
        }
        
        if (trimmedLine.startsWith('- ')) {
          return (
            <li key={index} className="text-brand-secondary leading-relaxed mb-2 ml-6 list-disc">
              <strong className="text-brand-primary">{trimmedLine.substring(2).split('**')[1] || ''}</strong>
              {trimmedLine.substring(2).split('**')[2] || trimmedLine.substring(2)}
            </li>
          );
        }
        
        if (trimmedLine.match(/^\d+\. /)) {
          return (
            <li key={index} className="text-brand-secondary leading-relaxed mb-2 ml-6 list-decimal">
              <strong className="text-brand-primary">{trimmedLine.split('**')[1] || ''}</strong>
              {trimmedLine.split('**')[2] || trimmedLine.replace(/^\d+\. /, '')}
            </li>
          );
        }
        
        if (trimmedLine === '') {
          return <div key={index} className="mb-4"></div>;
        }
        
        // Handle bold text
        const processedLine = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-primary font-medium">$1</strong>');
        
        return (
          <p 
            key={index} 
            className="text-brand-secondary leading-relaxed mb-6 text-lg"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      });
  };

  return (
    <>
    <PageTransition>
      <div className="min-h-screen bg-brand-white">
      {/* Header */}
      <motion.header 
        className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-brand-border z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <AnimatedButton
            onClick={() => navigate('/')}
            variant="secondary"
          >
            <div className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Journal</span>
            </div>
          </AnimatedButton>
        </div>
      </motion.header>

      {/* Article */}
      <motion.article 
        className="max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Article Header */}
        <header className="mb-12 pb-8 border-b border-brand-border">
          <motion.div 
            className="flex flex-wrap items-center gap-4 text-sm text-brand-secondary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </div>
            <span className="text-brand-accent">•</span>
            <span>{post.date}</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-light mb-6 text-brand-primary leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {post.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-brand-secondary leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {post.preview}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 bg-brand-light text-brand-secondary text-sm rounded-full"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </motion.div>
        </header>

        {/* Article Content */}
        <motion.div 
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {formatContent(post.content)}
        </motion.div>

        {/* Article Footer */}
        <motion.footer 
          className="mt-16 pt-8 border-t border-brand-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="text-center">
            <p className="text-brand-secondary mb-4">
              Enjoyed this article? Let's discuss your next project.
            </p>
            <AnimatedButton
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              variant="primary"
            >
              Get in Touch
            </AnimatedButton>
          </div>
        </motion.footer>
      </motion.article>
      </div>
    </PageTransition>
    </>
  );
};

export default PostPage;