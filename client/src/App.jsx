import {} from 'react';
import { Container, CssBaseline } from '@mui/material'
import Header from './Components/Header';
import Home from './Components/Main/Home';
import Footer from './Components/Footer';
import Cart from './Components/Main/cart';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Categories from '../src/Components/Main/categories';
import SingleProduct from '../src/Components/Main/singleProduct';
import { SnackbarProvider } from 'notistack';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/occasion-gifts',
      element: <Categories category="هدايا المناسبات" />
    },
    {
      path: '/men-perfumes',
      element: <Categories category="عطور الرجال" />
    },
    {
      path: '/women-perfumes',
      element: <Categories category="عطور النساء" />
    },
    {
      path: '/men-whatchs',
      element: <Categories category="ساعات رجالية" />
    },
    {
      path: '/women-whatchs',
      element: <Categories category="ساعات نسائية" />
    },
    {
      path: '/accessories',
      element: <Categories category="أكسيسوارات" />
    },
    {
      path: '/cart',
      element: <Cart  />
    },
    {
      path: '/product/:id',
      element: <SingleProduct />
    }
  ])

  return (
    <>
      <CssBaseline />
      <Container>
        <Header />  
        <SnackbarProvider maxSnack={3}>
          <RouterProvider router={router} />
        </SnackbarProvider>
        <Footer />
      </Container>
    </>
  );
}

export default App;