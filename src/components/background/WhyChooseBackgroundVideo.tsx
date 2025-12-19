import { useEffect, useRef } from 'react';

export const WhyChooseBackgroundVideo = () => {
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
  }, []);

  return (
    <>
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/bg3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background/70 via-background/60 to-background/75 z-[1] pointer-events-none" />
    </>
  );
};

