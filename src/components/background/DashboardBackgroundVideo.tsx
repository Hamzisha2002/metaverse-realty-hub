import { useEffect, useRef } from 'react';

export const DashboardBackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video autoplay prevented:', error);
      });
    }

    // Pause video when tab is inactive (performance optimization)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Background Video */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
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

