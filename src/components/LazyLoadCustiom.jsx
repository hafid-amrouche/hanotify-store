import React, { useEffect, useRef, useState } from 'react';

const LazyLoadCustiom = ({ children, ...props }) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom < window.innerHeight + 20) {
          setIsInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    // Initial check
    handleScroll();

    if( isInView){
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} {...props}>
      {isInView ? children : null}
    </div>
  );
};

export default LazyLoadCustiom;
