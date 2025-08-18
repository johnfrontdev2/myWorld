import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Track {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
}

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showIframe, setShowIframe] = useState(false);

  const track: Track = {
    id: '1',
    title: 'Jazz Beats',
    artist: 'Settle',
    youtubeId: 'qzyl0f3mRG0'
  };

  // Check if user has disabled music
  useEffect(() => {
    const musicDisabled = localStorage.getItem('musicDisabled') === 'true';
    setIsDisabled(musicDisabled);
  }, []);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handlePlayPause = useCallback(() => {
    if (!showIframe) {
      setShowIframe(true);
      setIsPlaying(true);
    } else {
      // Toggle iframe visibility to simulate play/pause
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        setShowIframe(false);
      } else {
        setShowIframe(true);
      }
    }
  }, [isPlaying, showIframe]);

  const disableMusic = useCallback(() => {
    localStorage.setItem('musicDisabled', 'true');
    setIsDisabled(true);
    setIsPlaying(false);
    setShowIframe(false);
  }, []);

  if (isDisabled) return null;

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${track.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0`;

  return (
    <>
      {/* YouTube Iframe - Hidden but functional */}
      {showIframe && (
        <div
          style={{
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            width: '400px',
            height: '300px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1
          }}
        >
          <iframe
            src={youtubeEmbedUrl}
            title="YouTube Audio Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed bottom-6 left-6 z-40 select-none"
          >
            <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
              {/* Main Player */}
              <motion.div
                className="flex items-center p-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Play Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause();
                  }}
                  className="w-10 h-10 bg-brand-primary hover:bg-brand-accent  rounded-full flex items-center justify-center mr-3 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} className="ml-0.5" />
                  )}
                </motion.button>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-brand-primary truncate">
                    {track.title}
                  </div>
                  <div className="text-xs text-brand-secondary truncate">
                    {track.artist}
                  </div>
                </div>

                {/* Waveform Animation */}
                <div className="flex items-center space-x-1 ml-3">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-brand-accent rounded-full"
                      animate={{
                        height: isPlaying ? [4, 16, 8, 20, 4] : 4,
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: isPlaying ? Infinity : 0,
                        delay: i * 0.1,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </div>

                {/* Expand Icon */}
                <motion.div
                  className="ml-2 text-brand-secondary"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Music size={16} />
                </motion.div>
              </motion.div>

              {/* Expanded Controls */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="border-t border-brand-border/20"
                  >
                    <div className="p-4 space-y-4">
                      {/* Info */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-brand-primary">
                          🎵 {track.title}
                        </div>
                        <div className="text-xs text-brand-secondary mt-1">
                          by {track.artist}
                        </div>
                        <div className="text-xs text-brand-secondary mt-2">
                          {isPlaying ? 'Now Playing' : 'Click play to start'}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        {/* Open in YouTube 
                        <button
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${track.youtubeId}`, '_blank')}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-full transition-colors duration-300"
                        >
                          Open in YouTube
                        </button>*/}

                        {/* Status */}
                        <div className="text-xs text-brand-secondary">
                          {isPlaying ? '▶️ Playing' : '⏸️ Paused'}
                        </div>

                        {/* Disable Button */}
                        <button
                          onClick={disableMusic}
                          className="p-2 text-brand-secondary hover:text-red-500 transition-colors duration-300"
                          title="Disable music permanently"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Note */}
                      <div className="text-xs text-brand-secondary text-center opacity-75">
                        Audio provided by YouTube
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioPlayer;