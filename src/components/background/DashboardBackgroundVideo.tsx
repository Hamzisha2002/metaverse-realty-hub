import { useEffect, useRef, useState } from 'react';

export const DashboardBackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Smooth loop: restart instantly when video ends
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    };

    // Fade-in when metadata is loaded
    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    // Ensure video plays
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video autoplay prevented:', error);
      });
    }

    // Performance: pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Background Video */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 600ms ease-out',
          animation: isLoaded ? 'videoPulse 14s ease-in-out infinite' : 'none',
        }}
      >
        <style>{`
          @keyframes videoPulse {
            0%, 100% { opacity: 0.95; }
            50% { opacity: 1; }
          }
        `}</style>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{ pointerEvents: 'none' }}
        >
          <source src="/videos/bg5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Dark Overlay for Readability */}
      <div 
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
        style={{
          backgroundColor: 'rgba(5, 10, 20, 0.65)',
          backgroundImage: 'linear-gradient(to bottom, rgba(5, 10, 20, 0.7), rgba(5, 10, 20, 0.6), rgba(5, 10, 20, 0.7))',
        }}
      />
    </>
  );
};

