/* eslint-disable react/prop-types */
/* eslint-disable no-useless-catch */
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReactWhatsapp from "react-whatsapp";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const SingleProduct = ({ category }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}?populate=prductImage`,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            },
          }
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    }

    fetchData();
  }, [id, loading]);

  useEffect(() => {
    async function fetchMoreData() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL +
            `/products?populate=*&filters[category][categoryTitle][$eq]=${category}`,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
            },
          }
        );
        setMoreProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    }

    fetchMoreData();
  }, [category]);

  // add command of one product

  function handleAddToCart(variant) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.push(data);
    localStorage.setItem("cart", JSON.stringify(cart));
    enqueueSnackbar("تمت إضافة هذا المنتوج إلى سلة منتجاتك بنجاح", { variant });
  }

  function handleCommandThatCommand() {
    handleAddToCart("success");
    window.location.href = "/cart";
  }
  return (
    <>
      <Helmet>
        <title>
          {!loading && data && data.attributes
            ? data.attributes.productTitile
            : "...المرجو الانتظار"}
        </title>
        <meta
          name="description"
          content={
            !loading && data && data.attributes
              ? data.attributes.productDescreption
              : "إسيل || للهدايا دائما معكم في كل المناسبات"
          }
        />
      </Helmet>

      <div className={!loading && data && data.attributes ? "" : "d-flex justify-content-center"}>
        {!loading && data && data.attributes ? (
          <section>
            <Box
              className="single-product my-5 p-2 rounded"
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 5,
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Box className="product-img">
                  <div
                    id={`image-${id}`}
                    className="carousel slide carousel-fade"
                  >
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target={`#image-${id}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target={`#image-${id}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target={`#image-${id}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                      {data.attributes.prductImage.data.map((img, index) => (
                        <div className="carousel-item active" data-bs-interval={`${index+1}0000`} key={index}>
                          <Box
                            component="img"
                            key={index}
                            src={img.attributes.formats.medium.url}
                            alt={img.attributes.formats.medium.hash}
                            className="rounded"
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#image-${id}`}
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon bg-dark p-3 rounded-circle"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#image-${id}`}
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon bg-dark p-3 rounded-circle"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Box className="product-info">
                  <Typography
                    variant="h3"
                    className="product-title fw-bold"
                    gutterBottom
                    sx={{
                      fontSize: {
                        lg: "3rem",
                        md: "2.5rem",
                        sm: "2rem",
                        xs: "1.5rem",
                      },
                    }}
                  >
                    {data.attributes.productTitile}
                  </Typography>
                  <Typography
                    variant="h4"
                    className="product-price"
                    gutterBottom
                    sx={{
                      fontSize: { md: "2.5rem", sm: "2rem", xs: "1.5rem" },
                    }}
                  >
                    {data.attributes.productPrice} درهم
                  </Typography>
                  <Typography
                    paragraph
                    className="product-descreption text-muted fs-5"
                    gutterBottom
                    sx={{
                      fontSize: {
                        lg: "2.5rem",
                        md: "2rem",
                        sm: "1.5rem",
                        xs: "1rem",
                      },
                    }}
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
                      message={`${window.location.href}`}
                      element="a"
                      style={{ cursor: "pointer" }}
                    >
                      <WhatsAppIcon className=" ms-2" />
                      <span>أطلب إستفسار حول المنتج</span>
                    </ReactWhatsapp>
                  </Typography>
                  <Box className="btns text-center" sx={{}}>
                    <Button
                      className="add-to-cart fs-5 fw-bold"
                      startIcon={<AddShoppingCartIcon className="ms-2" />}
                      sx={{
                        backgroundColor: "#B18C50",
                        mb: { xs: 1, md: 0 },
                        color: "#ffffff",
                        "&:hover": {
                          color: "#B18C50",
                        },
                      }}
                      onClick={() => handleAddToCart("success")}
                    >
                      أضف إلى سلة منتجاتك
                    </Button>
                    <Button
                      className="command-product fs-5 fw-bold me-3"
                      startIcon={<AddIcon className="ms-2" />}
                      sx={{
                        backgroundColor: "#000",
                        color: "#ffffff",
                        "&:hover": {
                          color: "#B18C50",
                        },
                      }}
                      onClick={() => handleCommandThatCommand()}
                    >
                      أطلب المنتج
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Box>
            <Box className="more-products" sx={{}}>
              <Typography
                variant="h4"
                className="fw-bold m-2"
                sx={{
                  color: "#B18C50",
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                }}
              >
                المزيد من منتجات {category}
              </Typography>
              <Box
                className="products my-4"
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    lg: "repeat(4, 1fr)",
                    md: "repeat(3, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xs: "repeat(1, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {loading ? (
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/loading_products.gif?alt=media&token=a4f48c3f-47c3-4b2b-9af4-448985881b7d"
                    alt=""
                    className="mt-5"
                  />
                ) : (
                  moreProducts
                    .filter((product) => product.id != id)
                    .map((product, index) => (
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
                            sx={{
                              height: { md: 300, xs: 350 },
                            }}
                          >
                            <a
                              href={`${product.attributes.category.data.attributes.root}/${product.id}`}
                            >
                              <div
                                id={`image-${index}`}
                                className="carousel slide carousel-fade"
                              >
                                <div className="carousel-inner">
                                  {product.attributes.prductImage.data.map(
                                    (img, index) => (
                                      <div
                                        className="carousel-item active"
                                        key={index}
                                      >
                                        <img
                                          className="rounded d-block w-100"
                                          src={
                                            img.attributes.formats.medium.url
                                          }
                                          alt={product.attributes.productTitile}
                                          style={{
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                                {product.attributes.prductImage.data.length !=
                                  1 && (
                                  <>
                                    <button
                                      className="carousel-control-prev"
                                      type="button"
                                      data-bs-target={`#image-${index}`}
                                      data-bs-slide="prev"
                                    >
                                      <span
                                        className="carousel-control-prev-icon bg-dark p-3 rounded-circle"
                                        aria-hidden="true"
                                      ></span>
                                      <span className="visually-hidden">
                                        Previous
                                      </span>
                                    </button>
                                    <button
                                      className="carousel-control-next"
                                      type="button"
                                      data-bs-target={`#image-${index}`}
                                      data-bs-slide="next"
                                    >
                                      <span
                                        className="carousel-control-next-icon bg-dark p-3 rounded-circle"
                                        aria-hidden="true"
                                      ></span>
                                      <span className="visually-hidden">
                                        Next
                                      </span>
                                    </button>
                                  </>
                                )}
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
                                  onClick={() =>
                                    handleAddToCart(product.id, "success")
                                  }
                                >
                                  <Tooltip
                                    title="أضف هذا المنتوج إلى سلة منتجاتك"
                                    arrow
                                  >
                                    <AddShoppingCartIcon className="fs-3" />
                                  </Tooltip>
                                </IconButton>
                              </div>
                            </div>
                          </Box>
                        </Box>
                      </motion.article>
                    ))
                )}
              </Box>
            </Box>
          </section>
        ) : (
          <img
            src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/loading_products.gif?alt=media&token=a4f48c3f-47c3-4b2b-9af4-448985881b7d"
            alt=""
            className="mt-5"
          />
        )}
      </div>
    </>
  );
};

export default SingleProduct;
