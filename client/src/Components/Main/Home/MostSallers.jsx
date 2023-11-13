/* eslint-disable no-useless-catch */
import { Box, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { motion } from "framer-motion";

const MostSallers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?populate=*`,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            },
          }
        );
        setProducts(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    }
    fetchData();
  }, []);

  async function handleAddToCart(id, variant) {
    const product = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}?populate=*`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.push(product.data.data);
    localStorage.setItem("cart", JSON.stringify(cart));
    enqueueSnackbar("تمت إضافة هذا المنتوج إلى سلة منتجاتك بنجاح", { variant });
    setTimeout(() => {
      window.location.href = "/cart";
    }, 2000);
  }

  return (
    <Box className="mostSallers my-5" component="section">
      <Typography
        variant="h2"
        mb={2}
        className="section-title fw-bold"
        sx={{
          fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
        }}
      >
        الأكثر طلبا
      </Typography>
      <Box
        className="products"
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
        {(loading ? Array.from(new Array(3)) : products).slice(0, 3).map(
          (product, index) => (
            <motion.article
              key={index}
              className="product rounded p-2"
              initial={
                {opacity: 0, y:-50}
              }
              transition={{duration: 1}}
              whileInView= {
                {opacity: 1, y:0}
              }
            >
              {product ? (
                product.attributes.prductImage.data.map((img, index) => (
                  <Box
                    key={index}
                    className="product-img d-flex justify-content-center"
                  >
                    <a href={`${product.attributes.category.data.attributes.root}/${product.id}`}>
                    <div
                      id={`image-${index}`}
                      className="carousel slide carousel-fade"
                    >
                      <div className="carousel-inner">
                        {product.attributes.prductImage.data.map( (img, index) => (
                            <div className="carousel-item active" key={index}>
                              <img
                                className="rounded d-block w-100"
                                src={img.attributes.formats.medium.url}
                                alt={product.attributes.productTitile}
                                style={{
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                      {
                        product.attributes.prductImage.data.length != 1 && (
                        <>
                          <button className="carousel-control-prev" type="button" data-bs-target={`#image-${index}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bg-dark p-3 rounded-circle" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button" data-bs-target={`#image-${index}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon bg-dark p-3 rounded-circle" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </>
                        )
                      }
                    </div>
                    </a>
                  </Box>
                ))
              ) : (
                <Skeleton variant="rectangular" height={218} 
                  style={{
                    backgroundColor: document.documentElement.classList.contains('dark-mode') && '#eee',
                  }}
                />
              )}
              <Box className="product-info text-center mt-2">
                {product ? (
                  <Typography
                    variant="h5"
                    component="a"
                    href={`${product.attributes.category.data.attributes.root}/${product.id}`}
                    mb={1}
                    className="product-title fw-bold text-dark my-2"
                  >
                    {product.attributes.productTitile}
                  </Typography>
                ) : (
                  <Skeleton 
                    style={{
                      backgroundColor: document.documentElement.classList.contains('dark-mode') && '#eee',
                    }}
                  />
                )}
                {product ? (
                  <div className="row">
                    <div className="col product-price d-flex fw-bold fs-4 align-items-center text-end">
                      {product.attributes.productPrice} درهم
                    </div>
                    <div className="col d-flex justify-content-end add-to ">
                      <IconButton
                        onClick={() => handleAddToCart(product.id, "success")}
                        className="cart-btn"
                      >
                        <Tooltip title="أضف هذا المنتوج إلى سلة منتجاتك" arrow>
                          <AddShoppingCartIcon className="fs-3" />
                        </Tooltip>
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <Skeleton width="60%"
                    style={{
                      backgroundColor: document.documentElement.classList.contains('dark-mode') && '#eee',
                    }}
                  />
                )}
              </Box>
            </motion.article>
          )
        )}
      </Box>
    </Box>
  );
};

export default MostSallers;
