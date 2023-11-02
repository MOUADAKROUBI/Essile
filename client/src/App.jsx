import { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Components/Header";
import Home from "./Components/Main/Home";
import Footer from "./Components/Footer";
import Cart from "./Components/Main/cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "../src/Components/Main/categories";
import SingleProduct from "../src/Components/Main/singleProduct";
import { SnackbarProvider } from "notistack";
import axios from "axios";
import './css/app.css';

const App = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(import.meta.env.VITE_API_URL + "/categories", {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          setCategories(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Router>
      <>
        <CssBaseline />
        <Container>
          <Header />
          <SnackbarProvider maxSnack={3}>
            <Routes>
              <Route path="/" element={<Home />} />
              {
                categories.map((category) => (
                  <Route
                    key={category}
                    path={category.attributes.root}
                    element={
                      <Categories category={category.attributes.categoryTitle} />
                    }
                  />
                ))
              }
              {
                categories.map((category) => (
                  <Route 
                    key={category} 
                    path={`${category.attributes.root}/:id`} 
                    element={<SingleProduct category={category.attributes.categoryTitle}/>} 
                  />
                ))
              }
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </SnackbarProvider>
          <Footer />
        </Container>
      </>
    </Router>
  );
};

export default App;
