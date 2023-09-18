import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import cities from "../../api/cities";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  if (!localStorage.getItem("cart"))
    localStorage.setItem("cart", JSON.stringify([]));

  const [cartProduct, setCartProduct] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  const [CommandID, setCommandID] = useState(uuidv4());
  const [NameComplete, setNameComplete] = useState("");
  const [Telephone, setTelephone] = useState(null);
  const [city, setCity] = useState("");
  const [Address, setAddress] = useState("");
  const [counters, setCounters] = useState(cartProduct.map(() => 1));

  let sum = 0;
  let newarray = cartProduct.map(
    (product, index) =>
      parseFloat(product.attributes.productPrice) * counters[index]
  );
  sum = newarray.reduce((partialSum, a) => partialSum + a, 0);

  function handleDeleteProduct(id, variant) {
    const newCartProduct = cartProduct.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCartProduct));
    setCartProduct(newCartProduct);
    enqueueSnackbar("تم حذف هذا المنتج ينجاح", { variant });
  }
  function handleDeleteAllProductsInCart(variant) {
    localStorage.clear();
    setCartProduct([]);
    enqueueSnackbar("تم حذف جميع المنتجات من سلة المشتريات ينجاح", { variant });
  }

  function incrementCounter(index) {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
  }

  function decrementCounter(index) {
    if (counters[index] > 1) {
      const newCounters = [...counters];
      newCounters[index] -= 1;
      setCounters(newCounters);
    }
  }

  function sendCommande(e) {
    e.preventDefault();
    const postData = {
      data: {
        commandID: CommandID,
        nameComplete: NameComplete,
        telephone: Telephone,
        city: city,
        adresse: Address,
        products: cartProduct.map( product => product.id)
      },
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/commands`, postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        if(response.data) {
          enqueueSnackbar('ثم إرسال طلبك بنجاح', "success")
          setCommandID(uuidv4())
          setNameComplete('')
          setAddress('')
          setCity('')
          setTelephone('')
        }
      })
      .catch((error) => {
        if(error.data)
          enqueueSnackbar('ثم رفض طلبك المرجو إدخال المعلومات بشكل صحيح', 'error')
      });
  }

  return (
    <Box
      component="section"
      className={
        cartProduct.length
          ? "my-5"
          : "my-5 d-flex align-items-center text-center"
      }
      sx={!cartProduct.length ? { height: "78vh" } : { height: "100%" }}
    >
      {cartProduct.length ? (
        <Box className="cart" sx={{}}>
          <Box
            className="form-products"
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 2fr", xs: "1fr" },
              gap: { xs: 3, lg: 4 },
            }}
          >
            <Box
              className="command-form rounded shadow p-3"
              sx={{
                height: 400,
                width: { sm: "100%", xs: "85%" },
              }}
            >
              <form
                action="/send-command"
                method="post"
                className=""
                onSubmit={sendCommande}
              >
                <Box className="name-box mb-3 ">
                  <TextField
                    id="name"
                    label="الاسم الكامل"
                    variant="filled"
                    className="w-100"
                    value={NameComplete}
                    onChange={(e) => setNameComplete(e.target.value)}
                  />
                </Box>
                <Box className="tele-box mb-3">
                  <TextField
                    id="telephone"
                    label="رقم الهاتف"
                    variant="filled"
                    className="w-100"
                    value={Telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                  />
                </Box>
                <Box className="city-box mb-3">
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    className="fs-4"
                  >
                    المدينة
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    variant="filled"
                    id="demo-simple-select-filled"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoWidth
                    label="المدينة"
                    className="w-100"
                  >
                    {cities.cities.data.map((city) => (
                      <MenuItem key={city.names.en} value={city.names.ar}>
                        {city.names.ar}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box className="adress mb-3">
                  <TextField
                    id="adress"
                    label="العنوان"
                    variant="filled"
                    className="w-100"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Box>
                <Box className="sendCommandBtn-box mb-3 text-center">
                  <Button
                    variant="contained"
                    startIcon={<SendIcon className="ms-3" />}
                    type="submit"
                    className="fs-5"
                    sx={{
                      backgroundColor: "#B18C50",
                      "&:hover": {
                        background: "white",
                        color: "#B18C50",
                      },
                    }}
                  >
                    إرسال الطلبية
                  </Button>
                </Box>
              </form>
            </Box>
            <Box className="cart-content text-center" sx={{}}>
              {cartProduct.map((product, index) => (
                <Box
                  key={index}
                  className="single-product mb-3 p-4 rounded border"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Box
                    className="product-img"
                    sx={{
                      width: 150,
                      height: 150,
                    }}
                  >
                    <img
                      src={
                        "http://localhost:1337" +
                        product.attributes.prductImage.data[0].attributes
                          .formats.small.url
                      }
                      alt={
                        product.attributes.prductImage.data[0].attributes
                          .formats.small.url
                      }
                      style={{ width: "100%", height: "100%" }}
                      className="rounded"
                    />
                  </Box>
                  <div className="product-title-quantity text-center">
                    <Typography
                      variant="h4"
                      className="mb-5"
                      sx={{
                        fontSize: { sm: "2.125rem", xs: "1.9rem" },
                      }}
                    >
                      {product.attributes.productTitile}
                    </Typography>
                    <Box
                      className="quantity p-2 rounded align-items-center d-flex"
                      sx={{
                        
                      }}
                    >
                      <Typography
                        component="div"
                        className="quantity-btns-title text-end fw-bold"
                      >
                        الكمية:
                      </Typography>
                      <Box className="quantity-btns-box d-flex">
                        <Button
                          variant="filled"
                          className="ms-2 d-flex align-items-center"
                          onClick={() => incrementCounter(index)}
                        >
                          <AddIcon className="ms-2" />
                        </Button>
                        <span className="mt-2 fw-bold">{counters[index]}</span>
                        <Button
                          variant="filled"
                          className="ms-2"
                          sx={{
                            position: "relative",
                            top: -5,
                          }}
                          onClick={() => decrementCounter(index)}
                        >
                          <MinimizeIcon className="" />
                        </Button>
                      </Box>
                    </Box>
                  </div>
                  <Box className="deleteCommand-price text-start" sx={{}}>
                    <Tooltip title="حذف هذا المنتج من سلة المشتريات">
                      <IconButton
                        className="mb-5"
                        onClick={() =>
                          handleDeleteProduct(product.id, "success")
                        }
                      >
                        <DeleteIcon className="text-danger fw-bold fs-4" />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="h4"
                      className="fw-bold"
                      sx={{
                        fontSize: { sm: "2.225rem", xs: "1.9rem" },
                      }}
                    >
                      {product.attributes.productPrice * counters[index]} درهم
                    </Typography>
                  </Box>
                </Box>
              ))}
              <hr className="my-4" />
              <Box
                className="summ-of-prices d-flex justify-content-between"
                sx={{}}
              >
                <Typography
                  variant="h3"
                  className="fw-bold"
                  sx={{
                    fontSize: { sm: "3rem", xs: "2rem" },
                  }}
                >
                  المجموع
                </Typography>
                <Typography
                  variant="h3"
                  className="summ fw-bold"
                  sx={{
                    color: "#B18C50",
                    fontSize: { sm: "3rem", xs: "2rem" },
                  }}
                >
                  {sum}درهم
                </Typography>
              </Box>
              <Button
                variant="secondary"
                className="text-danger fw-bold fs-5"
                onClick={() => handleDeleteAllProductsInCart("success")}
              >
                <DeleteIcon /> حذف جميع المنتجات من سلة المشتريات
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography
          variant="h3"
          className="fw-bold"
          sx={{
            fontSize: { md: "2.5rem", sm: "2rem", xs: "1.5rem" },
          }}
        >
          <span>
            {" "}
            سلة المشتريات خالية! اكتشف تشكيلتنا و{" "}
            <a href="/" className="" style={{ color: "#B18C50" }}>
              ابدأ بالتسوق
            </a>{" "}
            في متجرنا الآن للعثور على أفضل العروض والمنتجات الرائعة
          </span>
        </Typography>
      )}
    </Box>
  );
};

export default Cart;