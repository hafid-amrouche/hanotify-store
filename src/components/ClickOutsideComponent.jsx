import { useEffect, useRef } from "react";

const ClickOutsideComponent = ({ children, onClickOutside, listeningCondintion=true, ...props }) => {
    const ref = useRef(null);
  
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
  
    useEffect(() => {
      if(listeningCondintion) document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [listeningCondintion]);
  
    return <div ref={ref} {...props}>{children}</div>;
  };

export default ClickOutsideComponent