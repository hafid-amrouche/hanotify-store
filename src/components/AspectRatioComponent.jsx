import React, { useState, useEffect, useRef } from 'react';
import './AspectRatioComponent.css';  // Optional: for additional styling

// AspectRatioComponent takes 'aspectRatio' prop and adjusts size accordingly
const AspectRatioComponent = ({ aspectRatio, children, disable }) => {
  // State for component width and height
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // A ref to get access to the container DOM element
  const containerRef = useRef(null);

  // Function to calculate dimensions based on aspect ratio and container size
  const calculateDimensions = () => {
    // Get container's current width and height
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Calculate the best fit dimensions based on the aspect ratio
    const containerAspectRatio = containerWidth / containerHeight;

    if (containerAspectRatio > aspectRatio) {
      // Container is wider than the desired aspect ratio, fit height
      setDimensions({
        width: containerHeight * aspectRatio,  // Adjust width based on height
        height: containerHeight,  // Use full container height
      });
    } else {
      // Container is taller than the desired aspect ratio, fit width
      setDimensions({
        width: containerWidth,  // Use full container width
        height: containerWidth / aspectRatio,  // Adjust height based on width
      });
    }
  };

  // Effect hook to recalculate dimensions when the window resizes
  useEffect(() => {
    calculateDimensions()
    setTimeout(calculateDimensions, [200])
    window.addEventListener('resize', calculateDimensions);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', calculateDimensions); 
    };
  }, []);
  return (
    <div ref={containerRef} className="aspect-ratio-component-container d-flex">  
      { !disable && <div
        className="aspect-ratio-component-box"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        {children}
      </div>
      }
      {
        disable && children
      }
    </div>
  );
};

export default AspectRatioComponent;
