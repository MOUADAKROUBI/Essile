/* eslint-disable no-useless-catch */
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
const access_token =
  "b2373a287887f23ba5b2cec58eebbe67f2c6a8ed4915d6b5aee148915c0fafa755d5134af15818913567e3557eb31fa0810667c1de1ee1a9a035b907b6ab25630d495a2ec0b2d0ce5f07cb4c5b4add1073ff9ab770a31aa2d30a568727e64f2ade10ef5cc5297e3fc180412d9ddac544d7788db3c76224b35ad5683cae447dd8";
const api_url = "http://localhost:1337/api";

const FetchPages = () => {
  const principalColor = "#B18C50";

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(api_url + "/categories", {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${access_token}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        throw error;
      }
    }

    fetchData();
  }, []);

  const insm = () => {
    return data.map((page, index) => (
      <MenuItem key={index} onClick={handleCloseNavMenu}>
        <Typography
          textAlign="center"
          className="fs-4 fw-bold text-dark "
          component="a"
          href={`${page.attributes.root}`}
        >
          {page.attributes.categoryTitle}
        </Typography>
      </MenuItem>
    ));
  };

  const inlg = () => {
    let className= '';

    return data.map((page, index) => {
      if (page.attributes.root === "/" + window.location.href.split("/")[3])
        className= 'fs-6 fw-bold text-dark category-link active'
      else
        className= 'fs-6 fw-bold text-dark category-link'

      return (
        <Link
          key={index}
          href={`${page.attributes.root}`}
          onClick={handleCloseNavMenu}
          sx={{
            mr: 3,
            color: { principalColor },
            display: "block",
          }}
          underline="none"
          className={className}
        >
          {page.attributes.categoryTitle}
        </Link>
      )
  });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color={principalColor}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {insm()}
        </Menu>
      </Box>
      {/* logo */}
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
        }}
        className="logo"
      >
        <img src="../../images/logo_essile_ar.png" alt="" />
      </Typography>
      {/* navList */}
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {inlg()}
      </Box>
    </>
  );
};

export default FetchPages;
