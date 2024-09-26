import React, { useRef, forwardRef, useState, useEffect } from 'react';

const ScrollComponent = forwardRef(({ onScrollRight, onScrollLeft, children, ...props }, scrollContainerRef) => {
  const containerRef = scrollContainerRef;
  const [isTouching, setIsTouching] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startScrollLeft = useRef(0);

  // Function to be executed on swipe right
  const onSwipeRight = () => {
    console.log('Swiped right!');
    // Add additional logic here
  };

  // Function to be executed on swipe left
  const onSwipeLeft = () => {
    console.log('Swiped left!');
    // Add additional logic here
  };

  const handleTouchStart = (event) => {
    setIsTouching(true);
    startX.current = event.touches[0].clientX;
    startY.current = event.touches[0].clientY;
    startScrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (event) => {
    if (isTouching) {
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      const dx = x - startX.current;
      const dy = y - startY.current;

      // If the movement is primarily vertical, apply horizontal scroll
      if (Math.abs(dy) > Math.abs(dx)) {
        containerRef.current.scrollLeft = startScrollLeft.current + dx;
        event.preventDefault(); // Prevent the default vertical scrolling behavior
      }
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    const endX = containerRef.current.scrollLeft;
    const distance = endX - startScrollLeft.current;

    if (distance > 0) {
      onSwipeRight();
    } else if (distance < 0) {
      onSwipeLeft();
    }
  };

  // Using useEffect to add non-passive touch event listeners
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);

      // Cleanup the event listeners on component unmount
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);


  return (
    <div
      ref={scrollContainerRef}
      {...props}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
});

export default ScrollComponent;