/* eslint-disable no-useless-catch */
import { Box, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';
import {  enqueueSnackbar } from 'notistack';
import axios from 'axios';

const MostSallers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products?populate=*`, {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        })
        setProducts(res.data.data)
        setLoading(false)
      } catch(err) {
        setLoading(false)
        throw err
      }
    }
    fetchData()
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
    setTimeout(() => {
      window.location.href = '/cart'
    }, 2000);
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
          (loading? Array.from(new Array(3)):products).map((product, index) => (
            <Box 
              key={index} 
              component='article'
              className="product rounded p-2"
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
              {
                product ?(
                  product.attributes.prductImage.data.map((img, index) => (
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
                    ))
                ):(
                  <Skeleton variant="rectangular" height={218} />
                )
              }
              <Box 
                className="product-info text-center mt-2"
              >
                {
                  product ?(
                  <Typography
                    variant='h5'
                    component='a'
                    href={"/product/" + product.id}
                    mb={1}
                    className='product-title fw-bold text-dark my-2'
                  >
                      {product.attributes.productTitile}
                  </Typography>
                  ):(
                    <Skeleton />
                  )
                }
                {
                  product ?(
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
                  ):(
                    <Skeleton width="60%" />
                  )
                }
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  );
}

export default MostSallers;
