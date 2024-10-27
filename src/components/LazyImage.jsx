import React, { useState, useRef, useEffect } from 'react';
import Loader from './Loader'

const LazyImage = ({ src, alt, diam, className, ...props }) => {
  const [isInView, setIsInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    if(isInView){
      observer.unobserve(imageRef.current);
    }
    return () => {
      if (observer && imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <>
      <img
        src={isInView ? src : undefined}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? 'loaded' : 'loading'}`}
        {...props}
        ref={imageRef}
      />
      { diam && !loaded && <Loader diam={diam} /> }
    </>
  );
};

export default LazyImage;
