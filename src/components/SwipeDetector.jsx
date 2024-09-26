import { useState } from "react";

const SwipeDetector = ({ onSwipeLeft, onSwipeRight, children, ...props }) => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
  
    // Minimum swipe distance (in pixels) to detect a swipe
    const minSwipeDistance = 50;
  
    const handleTouchStart = (e) => {
      // Record the initial touch position
      setTouchStart(e.targetTouches[0].clientX);
      setTouchEnd(null); // Reset touchEnd on a new touch
    };
  
    const handleTouchMove = (e) => {
      // Update the current touch position as the user moves their finger
      setTouchEnd(e.targetTouches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return; // Prevent swipe detection if the touch data is incomplete
  
      const distance = touchStart - touchEnd; // Calculate the distance swiped
      const isSwipe = Math.abs(distance) > minSwipeDistance;
  
      if (isSwipe) {
        // Call the corresponding handler depending on the direction of the swipe
        if (distance > 0) {
          onSwipeLeft(); // Swiped left
        } else {
          onSwipeRight(); // Swiped right
        }
      }
    };
  
    return (
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
       {children}
      </div>
    );
  };
  
  export default SwipeDetector;