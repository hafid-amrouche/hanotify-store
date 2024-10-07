import React, { lazy } from 'react'
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

const ImportCategoryPage = ()=>import('./pages/CategoryPage')
const CatgeoryPage  = lazy(ImportCategoryPage)

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
        path: 'categories/:slug',
        element: <SuspenseComponent Component={CatgeoryPage} />
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