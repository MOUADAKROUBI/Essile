import {} from 'react';
import { Container, CssBaseline } from '@mui/material'
import Header from './Components/Header';
import Home from './Components/Main/Home';
import Footer from './Components/Footer';
import Cart from './Components/Main/cart';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from '../src/Components/Main/categories';
import SingleProduct from '../src/Components/Main/singleProduct';
import { SnackbarProvider } from 'notistack';


const App = () => {

  return (
    <Router>
      <>
        <CssBaseline />
        <Container>
          <Header />  
          <SnackbarProvider maxSnack={3}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/occasion-gifts" element={<Categories category="هدايا المناسبات" />} />
              <Route path="/men-perfumes" element={<Categories category="عطور الرجال" />} />
              <Route path="/women-perfumes" element={<Categories category="عطور النساء" />} />
              <Route path="/men-whatchs" element={<Categories category="ساعات رجالية" />} />
              <Route path="/women-whatchs" element={<Categories category="ساعات نسائية" />} />
              <Route path="/accessories" element={<Categories category="أكسيسوارات" />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<SingleProduct />} />
            </Routes>
          </SnackbarProvider>
          <Footer />
        </Container>
      </>
    </Router>
  );
}

export default App;