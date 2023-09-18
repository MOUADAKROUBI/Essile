/* eslint-disable no-useless-catch */
import { Box, Button, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReactWhatsapp from "react-whatsapp";
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';

const SingleProduct = () => {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'/products/'+id+'?populate=prductImage', {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        });
        setData(response.data.data);
        setLoading(false); 
      } catch (error) {
        throw error;
      }
    }

    fetchData();
  }, []);

  async function handleAddToCart(id, variant) {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}?populate=prductImage`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    });
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(response.data.data)
    localStorage.setItem('cart', JSON.stringify(cart));
    enqueueSnackbar('تمت إضافة هذا المنتوج إلى سلة منتجاتك بنجاح', {variant})
  }
  return (
    <div className={loading?'d-flex justify-content-center':''}>
      {
        loading?(
          <img src="../../images/loading_products.gif" alt="" className='mt-5' />
        ):(
          <Box
            component="section"
            className="single-product-section my-5 p-5 rounded"
            sx={{
              display: "grid",
              gridTemplateColumns: {md: '1fr 1fr'},
              gap: 5,
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
          >
            <Box
              className="product-img"
              sx={{
                height: { md: 500, sm: 400, xs: 350},
              }}
            >
              {
                data.attributes.prductImage.data.map( (img, index) => (
                  <img
                    key={index}
                    src={'http://localhost:1337'+img.attributes.formats.medium.url}
                    alt={img.attributes.formats.medium.hash}
                    className="rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ))
              }
            </Box>
            <Box 
              className="product-info"
            >
              <Typography variant="h3" className="product-title fw-bold" gutterBottom
                sx= {
                  {
                    fontSize: {lg: '3rem' ,md: '2.5rem', sm: '2rem', xs: '1.5rem'}
                  }
                }
              >
                {data.attributes.productTitile}
              </Typography>
              <Typography variant="h4" className="product-price" gutterBottom
                sx= {
                  {
                    fontSize: {md: '2.5rem', sm: '2rem', xs: '1.5rem'}
                  }
                }
              >
                {data.attributes.productPrice} درهم
              </Typography>
              <Typography
                paragraph
                className="product-descreption text-muted fs-5"
                gutterBottom
                sx= {
                  {
                    fontSize: {lg: '2.5rem' ,md: '2rem', sm: '1.5rem', xs: '1rem'}
                  }
                }
              >
                {data.attributes.productDescreption}
              </Typography>
              <Typography
                paragraph
                gutterBottom
                className="fs-5 fw-bold text-center"
                sx={{
                  color: "lightgreen",
                }}
              >
                <ReactWhatsapp
                  number="+212606-662991"
                  message={
                    `${window.location.href}`
                  }
                  element="a"
                  style={{ cursor: "pointer" }}
                >
                  <WhatsAppIcon className=" ms-2" />
                  <span>أطلب إستفسار حول المنتج</span>
                </ReactWhatsapp>
              </Typography>
              <Box className="btns text-center"
              sx={
                {
      
                }
              }
              >
                <Button
                className="add-to-cart fs-5 fw-bold"
                startIcon={<AddShoppingCartIcon className="ms-2" />}
                sx= {
                  {
                    backgroundColor: '#B18C50',
                    mb: {xs:1, md: 0},
                    color: '#ffffff',
                    '&:hover': {
                      color: '#B18C50',
                    }
                  }
                }
                onClick={() => handleAddToCart(data.id, 'success')}
                >
                  أضف إلى سلة متنجاتك
                </Button>
                <Button 
                  className="command-product fs-5 fw-bold me-3"
                  startIcon={<AddIcon className="ms-2" />}
                  sx= {
                    {
                      backgroundColor: '#000',
                      color: '#ffffff',
                      '&:hover': {
                        color: '#B18C50',
                      }
                    }
                  }
                  onClick={() => window.location.href = '/cart'}
                >
                  أطلب المنتج
                </Button>
              </Box>
            </Box>
          </Box>
        )
      }
    </div>
  );
};

export default SingleProduct;
