import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import Container from './components/main-components/Container'
import StoreContextProvider from './store/store-context';
import Redirect from './pages/Redirect';

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
        path: 'categories/:categoryId',
        element: <Outlet/>,
        children: [
          {
            index: true,
            element: <CategoryPage/>
          },
        ]
      },
      {
        path: 'products/:slug/:id',
        element: <ProductPage />
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