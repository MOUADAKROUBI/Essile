/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import {  } from "react";
import axios from "axios";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// const access_token = import.meta.env.VITE_ACCESS_TOKEN;
const access_token =
  "b2373a287887f23ba5b2cec58eebbe67f2c6a8ed4915d6b5aee148915c0fafa755d5134af15818913567e3557eb31fa0810667c1de1ee1a9a035b907b6ab25630d495a2ec0b2d0ce5f07cb4c5b4add1073ff9ab770a31aa2d30a568727e64f2ade10ef5cc5297e3fc180412d9ddac544d7788db3c76224b35ad5683cae447dd8";
const api_url = "http://localhost:1337/api";
// const api_url = import.meta.env.VITE_API_URL;
import { enqueueSnackbar } from 'notistack';

const FetchProducts = ({ data, loading }) => {
  

  async function handleAddToCart(id, variant) {
    const response = await axios.get(`${api_url}/products/${id}?populate=prductImage`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${access_token}`,
      },
    });
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(response.data.data)
    localStorage.setItem('cart', JSON.stringify(cart));
    enqueueSnackbar('تمت إضافة هذا المنتوج إلى سلة منتجاتك بنجاح', {variant})
  }

  return (
    <>
      <Box
        className={
          data.length ? "products" : "products d-flex justify-content-center"
        }
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xl: "repeat(4, 1fr)",
            md: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
          },
          gap: 5,
        }}
      >
        {loading ? (
          <img src="../../images/loading_products.gif" alt="" />
        ) : data.length ? (
          data.map((product, index) =>
            <Box
              key={index}
              component="article"
              className="product rounded p-1"
              sx={{
                transition: ".3s all linear",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                "&:hover": {
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                },
              }}
            >
              {product.attributes.prductImage.data.map((img, index) => (
                <Box
                  key={index}
                  className="product-img d-flex justify-content-center"
                  sx={{
                    height: { md: 300, xs: 350 },
                  }}
                >
                  <a href={"/product/" + product.id}>
                    <img
                      className="rounded"
                      src={
                        "http://localhost:1337" +
                        img.attributes.formats.medium.url
                      }
                      alt={product.attributes.productTitile}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                </Box>
              ))}
              <Box className="product-info text-center mt-2">
                <Typography
                  variant="h5"
                  component="a"
                  href={"/product/" + product.id}
                  mb={1}
                  className="product-title fw-bold text-dark my-2"
                >
                  {product.attributes.productTitile}
                </Typography>
                <div className="row">
                  <div className="col product-price d-flex fw-bold fs-4 align-items-center text-end">
                    {product.attributes.productPrice} درهم
                  </div>
                  <div className="col d-flex justify-content-end add-to cart">
                    <IconButton 
                      onClick={() => handleAddToCart(product.id, 'success')}
                    >
                      <Tooltip title="أضف هذا المنتوج إلى سلة منتجاتك" arrow>
                        <AddShoppingCartIcon className="fs-3" />
                      </Tooltip>
                    </IconButton>
                  </div>
                </div>
              </Box>
            </Box>
          )
        ) : (
          <Typography
            variant="h3"
            className="text-muted fw-bold text-decoration-none mb-4 text-center "
          >
            لا توجد منتوجات بعد
          </Typography>
        )}
      </Box>
    </>
  );
};

export default FetchProducts;
