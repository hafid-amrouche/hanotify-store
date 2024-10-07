import React, { useEffect, useState } from 'react'

const useGetCurrentScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Effect to add the resize event listener
    useEffect(() => {
      // Function to update the state when the window is resized
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      // Add the event listener when the component mounts
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    return screenWidth
}

export default useGetCurrentScreenWidth