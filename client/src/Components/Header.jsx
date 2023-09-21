import "../css/headerStyle.css";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";
import Badge from '@mui/material/Badge';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { FaTiktok } from "react-icons/fa";
import ReactWhatsapp from "react-whatsapp";
import FetchPages from "../api/fetchPages";
import { useState } from "react";

const Header = () => {
  if (localStorage.getItem("cart") === null)
    localStorage.setItem("cart", JSON.stringify([]));

  const principalColor = "#B18C50";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        className="offers-bord text-center py-3 rounded"
        component='header'
        sx= {
          {
            backgroundColor: '#B18C50',
            width: '100%'
          }
        }
      >
        <Typography
          variant="h2"
          className="fw-bold text-white text-decoration-none"
          sx= {
            {
              fontSize: {md: '2.5rem', sm: '2rem', xs: '1.5rem'}
            }
          }
        >
          لا توجد عروض بعد
        </Typography>
      </Box>
      <header className="row header-1">
        <div className="col d-flex justify-content-start align-items-center btn-langs">
          <Button
            variant="text"
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="btns fs-5"
            startIcon={<LanguageIcon className="ms-2" />}
            disabled
          >
            عربية
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>Français</MenuItem>
            <MenuItem onClick={handleClose}>Englais</MenuItem>
          </Menu>
        </div>
        <div className="col pt-2 d-flex align-items-center justify-content-center infos-contact">
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mr: 1, color: principalColor }}
            className="d-flex ms-3"
          >
            <CallIcon style={{ marginRight: 5 }} />{" "}
            <span className="text-dark me-2">0694940024</span>
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: principalColor }}
            className="d-flex"
          >
            <EmailIcon style={{ marginRight: 5 }} />{" "}
            <span className="text-dark me-2">EssileShop@gmail.com</span>
          </Typography>
        </div>
        <div className="col social-icons">
          <ul className="nav d-flex justify-content-end">
            <li className="nav-item">
              <ReactWhatsapp
                number="+212606-662991"
                message=""
                element="a"
                className="nav-link social-icons fs-2"
                style={{ cursor: "pointer" }}
              >
                <WhatsAppIcon />
              </ReactWhatsapp>
            </li>
            <li className="nav-item">
              <a
                href="https://web.facebook.com/profile.php?id=100008483202955&comment_id=Y29tbWVudDoxOTExMDcyMzc1ODEzOTYzXzE5MTEzMzM5MzkxMjExNDA%3D"
                target="black"
                className="nav-link social-icons fs-2"
              >
                <FacebookIcon />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://www.instagram.com/essile_mrc/"
                target="black"
                className="nav-link social-icons fs-2"
              >
                <InstagramIcon />
              </a>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a
                href="https://www.tiktok.com/@essile.com"
                target="black"
                className="nav-link social-icons fs-4"
              >
                <FaTiktok />
              </a>
            </li>
          </ul>
        </div>
      </header>
      <AppBar position="static" className="rounded bg-white header-2">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* logo */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                width: '160px',
                height: '100px',
              }}
              className="logo"
            >
              <Box
                component='img'
                src="../images/loading_logo.png" alt="" 
                sx = {
                  {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }
                }

              />
            </Typography>

            {/* menuBar */}
            <FetchPages />

            {/* cart */}
            <form action="/cart" method="get">
              <Tooltip
                title='سلة المشتريات'
                arrow
              >
                <IconButton
                  size="large"
                  type="submit"
                >
                  <Badge badgeContent={String(JSON.parse(localStorage.getItem('cart')).length)} color="error">
                    <LocalMallOutlinedIcon
                      style={{ color: principalColor }} 
                      className="fs-2"
                    />
                  </Badge >

                </IconButton>
              </Tooltip>
            </form>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
