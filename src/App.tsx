import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';  
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Sites from './components/Sites'; 
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
{/*import AudioPlayer from './components/AudioPlayer';*/}

import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    const criticalImages = ['/img/1.jpeg', '/img/2.jpeg'];
    const imagePromises = criticalImages.map(src => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => setIsLoading(false), 1000);
    });
  }, []);

  return (
    <>
      {/*<AudioPlayer />*/}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen setIsLoading={setIsLoading} />
        ) : (
          <>
            <PageTransition />
            <Header />
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Sites />
            <Journal />
            <Contact />
            <Footer />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
