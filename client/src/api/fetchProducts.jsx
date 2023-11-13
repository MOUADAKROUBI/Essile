/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import {} from "react";
import axios from "axios";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

const FetchProducts = ({ data, loading }) => {
  async function handleAddToCart(id, variant) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}?populate=*`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.push(response.data.data);
    localStorage.setItem("cart", JSON.stringify(cart));
    enqueueSnackbar("تمت إضافة هذا المنتوج إلى سلة منتجاتك بنجاح", { variant });
    setTimeout(() => {
      window.location.href = "/cart";
    }, 2000);
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
          <img
            src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/loading_products.gif?alt=media&token=a4f48c3f-47c3-4b2b-9af4-448985881b7d"
            alt=""
          />
        ) : data.length ? (
          data.map((product, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="product"
            >
              <Box
                className="rounded p-1"
                sx={{
                  transition: ".3s all linear",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  "&:hover": {
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  },
                }}
              >
                <Box
                  key={index}
                  className="product-img d-flex justify-content-center"
                >
                  <a
                    href={`${product.attributes.category.data.attributes.root}/${product.id}`}
                  >
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
                <Box className="product-info text-center mt-2">
                  <Typography
                    variant="h5"
                    component="a"
                    href={`${product.attributes.category.data.attributes.root}/${product.id}`}
                    mb={1}
                    className="product-title fw-bold text-dark my-2"
                  >
                    {product.attributes.productTitile}
                  </Typography>
                  <div className="row">
                    <div className="col product-price d-flex fw-bold fs-4 align-items-center text-end">
                      {product.attributes.productPrice} درهم
                    </div>
                    <div className="col d-flex justify-content-end cart-btn">
                      <IconButton
                        className="cart-btn"
                        onClick={() => handleAddToCart(product.id, "success")}
                      >
                        <Tooltip title="أضف هذا المنتوج إلى سلة منتجاتك" arrow>
                          <AddShoppingCartIcon className="fs-3" />
                        </Tooltip>
                      </IconButton>
                    </div>
                  </div>
                </Box>
              </Box>
            </motion.article>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            transition={{ delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Typography
              variant="h3"
              className="text-muted fw-bold text-decoration-none mb-4 text-center "
            >
              لا توجد منتوجات بعد
            </Typography>
          </motion.div>
        )}
      </Box>
    </>
  );
};

export default FetchProducts;
