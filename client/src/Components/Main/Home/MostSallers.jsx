import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';
import {  enqueueSnackbar } from 'notistack';
import axios from 'axios';

const MostSallers = () => {
  const [products, setProducts] = useState([])
  console.log(import.meta.env.VITE_API_URL)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products?populate=prductImage&filters[id][$lt]=5`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    })
    .then((res) => {
      setProducts(res.data.data)
      console.log(res.data.data)
    })
    .catch((err) => {
      console.error(err)
    })
  }, [])

  async function handleAddToCart(id, variant) {
    const product = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}?populate=prductImage`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    });
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(product.data.data)
    localStorage.setItem('cart', JSON.stringify(cart));
    enqueueSnackbar('تمت إضافة هذا المنتوج إلى سلة منتجاتك بنجاح', {variant})
  }
  return (
    <Box
      className='mostSallers my-5'
      component='section'
    >
      <Typography
        variant='h2'
        mb={2}
        className='section-title fw-bold'
        sx={
          {
            fontSize: {xs: '2.5rem', sm: '3rem', md: '4rem'},
          }
        }
      >
        الأكثر طلبا
      </Typography>
      <Box 
        className="products"
        sx={
          {
            display: 'grid',
              gridTemplateColumns: {
                xl: 'repeat(4, 1fr)',
                md: 'repeat(3, 1fr)',
                sm: 'repeat(2, 1fr)',
                xs: 'repeat(1, 1fr)',
              },
              gap: 5,
          }
        }
      >
        {
          products.map((product) => (
            <Box 
              key={product.id} 
              component='article'
              className="product rounded p-1"
              sx={
                {
                  transition: '.3s all linear',
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                  '&:hover': {
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }
                }
              }
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
              <Box 
                className="product-info text-center mt-2"
              >
                <Typography
                  variant='h5'
                  component='a'
                  href={"/product/" + product.id}
                  mb={1}
                  className='product-title fw-bold text-dark my-2'
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
                      <Tooltip
                        title="أضف هذا المنتوج إلى سلة منتجاتك"
                        arrow
                      >
                        <AddShoppingCartIcon className='fs-3'/>
                      </Tooltip>
                    </IconButton>
                  </div>
                </div>
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  );
}

export default MostSallers;
