import { Box, Typography } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { FaTiktok } from "react-icons/fa";
import "../css/footer.css";
import ReactWhatsapp from "react-whatsapp";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="shadow-lg justify-centent-center">
      <Box
        className=" text-white"
        sx={{
          display: "grid",
          gridTemplateColumns: { lg: "1fr 1fr 1fr", md: "2fr 1fr" },
          justifyContent: "center",
          gap: 3,
        }}
      >
        <motion.div 
        initial={
          {opacity: 0, x:45}
        }
        transition={{duration: 1}}
        whileInView= {
          {opacity: 1, x:0}
        }
      >
        <div className=" google-maps text-center">
          <Typography
            variant="h4"
            className="fs-4 fw-bold text-white text-center mb-4"
          >
            موقعناعلى الخريطة
          </Typography>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.612234183615!2d-9.563779725234534!3d30.047980618404576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb393d3bddcb8ef%3A0xd249679bcb38553b!2sEssile!5e0!3m2!1sen!2sma!4v1694089544401!5m2!1sen!2sma"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded"
            sx={{
              width: { sm: 550, xs: 350 },
              height: { sm: 400, xs: 250 },
            }}
          ></Box>
        </div>
      </motion.div>
      <motion.div 
        initial={
          {opacity: 0, y:80}
        }
        transition={{duration: 1}}
        whileInView= {
          {opacity: 1, y:0}
        }
      >
        <div className="col">
          <Typography
            variant="h4"
            className="fs-4 fw-bold text-white text-center mb-4"
          >
            للتواصل معنا
          </Typography>
          <div className="essile-info">
            <Typography variant="h6" className="mb-4">
              <span>
                <MapIcon className="fs-2" style={{ color: "#B18C50" }} />
              </span>{" "}
              Belfaa chtouka ait baha, Agadir, maroc
            </Typography>
            <Typography variant="h6" className="mb-4">
              <span>
                <LocalPhoneIcon className="fs-2" style={{ color: "#B18C50" }} />
              </span>{" "}
              0694940024
            </Typography>
            <Typography variant="h6" className="mb-4">
              <span>
                <EmailIcon className="fs-2" style={{ color: "#B18C50" }} />
              </span>{" "}
              Bnalimohamed54@gmail.com
            </Typography>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={
          {opacity: 0, x:-35}
        }
        transition={{duration: 1}}
        whileInView= {
          {opacity: 1, x:0}
        }
      >
        <div className="">
          <div>
            <Typography
              variant="h4"
              className="fs-4 fw-bold text-white text-center mb-4"
            >
              صفحاتنا على وسائل التواصل الاجتماعي
            </Typography>
          </div>
          <div className="d-flex justify-content-center mt-1 socialIcons">
            <ul className="nav">
              <li className="nav-item">
                <ReactWhatsapp
                  number="+212606-662991"
                  message=""
                  element="a"
                  className="nav-link social-icons"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/whatsapp-social-media-svgrepo-com%20(1).svg?alt=media&token=fa466d81-af02-47e5-b8f2-d225c8daa895"
                    alt=""
                    style={{ width: 25 }}
                  />
                </ReactWhatsapp>
              </li>
              <li className="nav-item">
                <a
                  href="https://web.facebook.com/profile.php?id=100008483202955&comment_id=Y29tbWVudDoxOTExMDcyMzc1ODEzOTYzXzE5MTEzMzM5MzkxMjExNDA%3D"
                  target="black"
                  className="nav-link social-icons"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/facebook-svgrepo-com.svg?alt=media&token=0134cab1-a504-4e56-a629-904fd1bc4d24"
                    alt=""
                    style={{ width: 25 }}
                  />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.instagram.com/essile_mrc/"
                  target="black"
                  className="nav-link social-icons"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/instagram-1-svgrepo-com.svg?alt=media&token=4199e442-6c17-4f3b-9534-2945bb957d23"
                    alt=""
                    style={{ width: 25 }}
                  />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.tiktok.com/@essile.com"
                  target="black"
                  className="nav-link social-icons"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/tiktok-icon-white-1-logo-svgrepo-com.svg?alt=media&token=aa9db365-f947-439d-8d8a-58abe329d200"
                    alt=""
                    style={{ width: 25 }}
                  />
                </a>
              </li>
            </ul>
          </div>
          <Typography
            paragraph
            className="text-muted fs-5 fw-bold mt-2 text-center"
          >
            متجر اسيل - هدايا فريدة لكل مناسبة. اختر مشاعرك معنا.
          </Typography>
        </div>
      </motion.div>
      </Box>
      <hr className="text-white" />
      <div className="text-center text-white">
        <span className="ms-1">{new Date().getFullYear()}</span>
        <span className="ms-2">
          <CopyrightIcon />
        </span>
        <span>جميع الحقوق محفوظة</span>
        <p>
          من تصميم و تطوير{" "}
          <span>
            <ReactWhatsapp
              number="+212612738376"
              message=""
              element="a"
              className="contactMe fs-5 fw-bold text-capitalize"
              style={{ cursor: "pointer" }}
            >
              mouad akroubi
            </ReactWhatsapp>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
