/* eslint-disable no-useless-catch */
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import FetchProducts from "../../api/fetchProducts";
import { useEffect, useState } from "react";
import axios from "axios";

export const Categories = ({ category }) => {
  const [filterByName, setFilterByName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const minAndMax = data
    .map((product) => product.attributes.productPrice)
    .sort(function (a, b) {
      return a - b;
    });
  console.log(minAndMax);
  const [filterByPrice, setFilterByPrice] = useState(minAndMax[0]);

  useEffect(() => {
    async function fetchData() {
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
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    }

    fetchData();
  }, [category]);

  async function handleFilterByName(e) {
    setFilterByName(e.target.value);
    await axios
      .get(
        import.meta.env.VITE_API_URL +
          `/products?populate=*&filters[category][categoryTitle][$eq]=${category}&filters[productTitile][$startsWith]=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  async function handleFilterByPrice(e) {
    setFilterByPrice(e.target.value);
    await axios
      .get(
        import.meta.env.VITE_API_URL +
          `/products?populate=*&filters[category][categoryTitle][$eq]=${category}&filters[productPrice][$lte]=${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <Box className="categories-section my-5">
      <Typography
        variant="h3"
        className="category-title text-muted fw-bold text-decoration-none mb-4"
      >
        {category}
      </Typography>
      <Box
        className=""
        sx={{
          display: "grid",
          gridTemplateColumns: { lg: "1fr 4fr", md: "1fr 3fr" },
          gridTemplateRows: { xs: "1fr", md: "1fr" },
          gap: 2,
        }}
      >
        <Box
          className="rounded p-2 align-items-center"
          sx={{
            width: { sm: "50%", xs: "70%", md: "100%" },
            margin: { xs: "auto", md: 0 },
          }}
        >
          <Typography variant="h5">البحث</Typography>
          <TextField
            fullWidth
            label={`إبحث عن ${category} التي تناسبك`}
            id="product-search"
            type="search"
            inputProps={{ dir: "rtl" }}
            className="mb-4"
            value={filterByName}
            onChange={handleFilterByName}
          />
          <Typography variant="h5">السعر (DH)</Typography>
          <Slider
            aria-label="price"
            defaultValue={filterByPrice}
            value={filterByPrice}
            valueLabelDisplay="auto"
            step={20}
            marks
            min={minAndMax[0]}
            max={minAndMax[minAndMax.length - 1]}
            sx={{
              color: "#B18C50",
            }}
            onChange={handleFilterByPrice}
          />
          <InputLabel
            id="demo-select-small-label"
            className="h5 fs-3 text-dark"
          >
            ترتيب المنتوجات
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value="every"
            label="ترتيب المنتوجات"
          >
            <MenuItem value="every">
              <em>الكل</em>
            </MenuItem>
            <MenuItem value="nto">من الأحدث الى الأقدم</MenuItem>
            <MenuItem value="otn">من الأقدم إلى الاحدث</MenuItem>
          </Select>
        </Box>
        <Box className="display-products">
          <FetchProducts
            data={data}
            loading={loading}
            category={category}
            name={filterByName}
          />
        </Box>
      </Box>
    </Box>
  );
};
