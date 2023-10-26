/* eslint-disable no-useless-catch */
import {
  Box,
  IconButton,
  Link,
  Typography,
  Skeleton,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const FetchPages = () => {
  const principalColor = "#B18C50";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/categories",
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    }

    fetchData();
  }, []);
  const [openNav, setOpenNav] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenNav(open);
  };

  const list = () => (
    <Box
      sx={{
        width: { sm: 250, xs: 200 },
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <ListItem key={index}>
              <ListItemText>
                <Skeleton variant="rectangular" height={30} />
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <>
            <ListItem
              disablePadding
              className="text-end"
              sx={{
                transition: ".5s all",
                width: "fit-content",
                "&:hover": {
                  color: "#B18C50",
                  transform: "rotate(90deg)",
                  cursor: "pointer",
                },
              }}
            >
              <CloseIcon />
            </ListItem>
            {data.map((cate, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  transition: ".5s all",
                  "&:hover": {
                    color: "#B18C50",
                  },
                }}
              >
                <ListItemButton
                  className=""
                  onClick={() => {
                    window.location.pathname = cate.attributes.root;
                  }}
                >
                  <ListItemText
                    className="pagesinsm fs-4 fw-bold"
                    primary={cate.attributes.categoryTitle}
                    sx={{
                      fontFamily: "Noto Kufi Arabic, sans-serif",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );

  const inlg = () => {
    let className = "";
    const variants = {
      visible: {
        opacity: 1,
        x: 30,
        y:5,
      },
      transition: {duration: 1},
      hidden: {
        opacity: 0,
        x: -100,
      },
    };

    return (
      <Box
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }}}

      >
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={variants}
          style={{
            display: 'flex'
          }}
        >
          {data.map((page, index) => {
            if (page.attributes.root === "/" + window.location.href.split("/")[3])
              className = "fs-6 text-dark category-link active";
            else className = "fs-6 text-dark category-link";
        
            return (
              <motion.li
                variants={variants}
                key={index}
              >
                <Link
                  href={`${page.attributes.root}`}
                  sx={{
                    mr: 3,
                    color: { principalColor },
                    display: "block",
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                  }}
                  underline="none"
                  className={className}
                  variants={variants}
                >
                  {page.attributes.categoryTitle}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={toggleDrawer(true)}
          color={principalColor}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={openNav} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
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
        className="logo "
      >
        <img
          style={{ objectFit: "cover", width: "120px", height: "100px" }}
          src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/loading_logo.svg?alt=media&token=cb5f4bc1-110d-4174-b5ee-7a097109d215"
          alt=""
        />
      </Typography>
      {/* navList */}
      {loading ? (
        <Grid
          container
          wrap="wrap"
          gap={2}
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {Array.from(new Array(6)).map((i, a) => (
            <Skeleton key={a} variant="rounded" width={100} height={30} />
          ))}
        </Grid>
      ) : (
        inlg()
      )}
    </>
  );
};

export default FetchPages;
