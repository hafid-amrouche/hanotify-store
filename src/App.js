import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Container from './components/main-components/Container'
import StoreContextProvider from './store/store-context';
import Redirect from './pages/Redirect';
import SuspenseComponent from './components/SuspenseComponent'
import { componentLoader } from './utils/utils';

const ImportProductPage = ()=>import('./pages/ProductPage')
const ProductPage = lazy(ImportProductPage)
const ImportLandingPage = ()=>import('./pages/LandingPage')
const LandingPage = lazy(ImportLandingPage)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container/>,
    children: [
      // {
      //   index: true,
      //   element: <HomePage/>,
      // },
      {
        path: 'redirect',
        element: <Redirect/>,
      },
      // {
      //   path: 'categories/:categoryId',
      //   element: <Outlet/>,
      //   children: [
      //     {
      //       index: true,
      //       element: <CategoryPage/>
      //     },
      //   ]
      // },
      {
        path: 'products/:slug/:id',
        loader: ()=>componentLoader(ImportProductPage),
        element: <SuspenseComponent  Component={ProductPage} />
      },
      {
        path: 'products/:slug/:id/landing-page',
        loader: ()=>componentLoader(ImportLandingPage),
        element: <SuspenseComponent Component={LandingPage} />
      }
    ],
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