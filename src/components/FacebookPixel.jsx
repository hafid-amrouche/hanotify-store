import React, { useEffect } from 'react';

const FacebookPixel = ({ facebookPixelsId }) => {
  
  useEffect(() => {
    // Initialize Facebook Pixel script
      (function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Initialize Pixel
      facebookPixelsId.map(pixelId=>window.fbq('init', pixelId)) 
    
  }, [facebookPixelsId]);

  return (
    <noscript>
      {
        facebookPixelsId.map(pixelId=>(
          <img
            key={pixelId}
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            alt="Facebook Pixel"
          />
        )) 
      }
    </noscript>
  );
};

export default FacebookPixel;
