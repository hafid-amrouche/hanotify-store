// import React, { useRef, useState } from 'react';

// const ScrollableDiv = () => {
//   const containerRef = useRef(null);
//   const [isTouching, setIsTouching] = useState(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   const handleTouchStart = (event) => {
//     setIsTouching(true);
//     startX.current = event.touches[0].clientX;
//     scrollLeft.current = containerRef.current.scrollLeft;
//   };

//   const handleTouchMove = (event) => {
//     if (isTouching) {
//       const x = event.touches[0].clientX;
//       const walk = x - startX.current;
//       containerRef.current.scrollLeft = scrollLeft.current - walk;
//     }
//   };

//   const handleTouchEnd = () => {
//     setIsTouching(false);
//   };

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         overflowX: 'auto',
//         scrollBehavior: 'auto',
//         whiteSpace: 'nowrap',
//         touchAction: 'none', // Prevent default touch scrolling
//       }}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div style={{ display: 'inline-block', width: '200px', height: '100px', background: '#ddd', margin: '5px' }}>Item 1</div>
//       <div style={{ display: 'inline-block', width: '200px', height: '100px', background: '#ddd', margin: '5px' }}>Item 2</div>
//       <div style={{ display: 'inline-block', width: '200px', height: '100px', background: '#ddd', margin: '5px' }}>Item 3</div>
//       <div style={{ display: 'inline-block', width: '200px', height: '100px', background: '#ddd', margin: '5px' }}>Item 4</div>
//       <div style={{ display: 'inline-block', width: '200px', height: '100px', background: '#ddd', margin: '5px' }}>Item 5</div>
//       <div style={{ display: 'inline-block', width: '200px', height: '100px', background: '#ddd', margin: '5px' }}>Item 6</div>
//       <div style={{ display: 'inline-block', width: '200px', height: '100px', background: '#ddd', margin: '5px' }}>Item 7</div>
//     </div>
//   );
// };

// export default ScrollableDiv;



import React, { lazy, useEffect } from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Container from './components/main-components/Container'
import StoreContextProvider from './store/store-context';
import Redirect from './pages/Redirect';
import SuspenseComponent from './components/SuspenseComponent'
import { componentLoader } from './utils/utils';
import HomePage from './pages/HomePage'


const ImportProductPage = ()=>import('./pages/ProductPage')
const ProductPage = lazy(ImportProductPage)

const ImportLandingPage = ()=>import('./pages/LandingPage')
const LandingPage = lazy(ImportLandingPage)

const ImportProductGallery = ()=>import('./pages/ProductGallery')
const ProductGallery  = lazy(ImportProductGallery )

const ImportThankYouPage = ()=>import('./pages/ThankYouPage')
const ThankYouPage  = lazy(ImportThankYouPage )

const ImportProductContextProvider = ()=>import('./pages/product-page/store/product-context')
const ProductContextProvider  = lazy(ImportProductContextProvider )

const ImportPrivacyPolicy = ()=>import('./pages/PrivacyPolicy')
const PrivacyPolicy  = lazy(ImportPrivacyPolicy )

const ImportTermsOfService = ()=>import('./pages/TermsOfService')
const TermsOfService  = lazy(ImportTermsOfService)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'redirect',
        element: <Redirect/>,
      },
      {
        path: 'products/:slug/:id',
        loader: ()=>componentLoader(ImportProductContextProvider),
        element: <SuspenseComponent Component={ProductContextProvider} />,
        children: [{
          index: true,
          loader: ()=>componentLoader(ImportProductPage),
          element: <SuspenseComponent Component={ProductPage} />,
        },
        {
          path: 'gallery',
          loader: ()=>componentLoader(ImportProductGallery),
          element: <SuspenseComponent Component={ProductGallery} />,
        },
        {
          path: 'thank-you',
          loader: ()=>componentLoader(ImportThankYouPage),
          element: <SuspenseComponent Component={ThankYouPage} />,
        },
        {
          path: 'landing-page/thank-you',
          loader: ()=>componentLoader(ImportThankYouPage),
          element: <SuspenseComponent Component={ThankYouPage} />,
        }
      ]
      },    
    ],
  },
  {
    path: '/products/:slug/:id/landing-page',
    loader: ()=>componentLoader(ImportLandingPage),
    element: <SuspenseComponent Component={LandingPage} />
  },
  {
    path: '/privacy-policy',
    loader: ()=>componentLoader(ImportPrivacyPolicy),
    element: <SuspenseComponent Component={PrivacyPolicy} />,
  },
  {
    path: '/terms-of-service',
    loader: ()=>componentLoader(ImportTermsOfService),
    element: <SuspenseComponent Component={TermsOfService} />,
  },
]);

const App = () => {
  return (
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  )
}

export default App