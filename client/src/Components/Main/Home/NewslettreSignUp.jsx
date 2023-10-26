import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

const NewslettreSignUp = () => {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      data: {
        emailOfCostumer: email,
      }
    };
    await axios
      .post(import.meta.env.VITE_API_URL + "/newslettres", data, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("شكرا على ثقتك بنا")
          setEmail('')
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <section className="my-5">
      <motion.div 
        initial={
          {opacity: 0, x:80}
        }
        transition={{duration: 1}}
        whileInView= {
          {opacity: 1, x:0}
        }
      >
        <div className="form mt-3 shadow rounded py-5 px-2 text-center">
          <Typography
            variant="h2"
            mb={2}
            className="fw-bold text-decoration-none"
            sx={{
              fontSize: {
                md: "3.75rem",
                sm: "3rem",
                xs: "2rem",
              },
            }}
          >
            إشترك في موقعنا حتى يصلك جديد منتوجاتنا
          </Typography>
          <Typography
            paragraph
            mb={2}
            className="fw-bold fs-4 text-muted"
            sx={{
              fontSize: {
                md: "2rem",
                sm: "1rem",
                xs: ".2rem",
              },
            }}
          >
            إسيل للهدايا دائما معكم في كل المناسبات
          </Typography>
          <form action="/" method="post" onSubmit={handleSubmit}>
            <Box
              className="input-btnSubmit"
              sx={{
                display: { sm: "flex", xs: "block" },
              }}
            >
              <div className="input-div w-100 ps-3">
                <TextField
                  required
                  id="filled-required"
                  label="المرجو إدخال بريدك الإكتروني"
                  variant="filled"
                  type="email"
                  inputProps={{ dir: "ltr" }}
                  className="w-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="btnSubmit-btn">
                <Button
                  variant="contained"
                  startIcon={<SendIcon className="ps-2 fs-4 fw-bold" />}
                  className="btn-submit fs-4 fw-bold"
                  type="submit"
                  sx={{
                    marginTop: { xs: 2, sm: 0 },
                  }}
                >
                  أرسل
                </Button>
              </div>
            </Box>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default NewslettreSignUp;
