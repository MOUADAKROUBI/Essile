import { Typography } from "@mui/material";
import {} from "react";
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="hero my-5">
      <div className="row">
        <motion.div 
          className="col"
          initial={
            {opacity: 0, x:45}
          }
          transition={{duration: 1.5}}
          whileInView= {
            {opacity: 1, x:0}
          }
        >
          <Typography
            variant="h1"
            className="text-center tw-bold hero-title mb-2"
            sx={{
              // fontFamily: 'Noto Kufi Arabic, sans-serif',  
            }}
          >
            مرحبا بك في متجر <span className="brand-name fw-bold">إسيل</span>
          </Typography>
          <Typography
            variant="subtitle1" 
            className="text-muted fs-5 text-justify"
            
          >
            متجر اسيل هو وجهتك المثالية على الإنترنت لاختيار الهدايا الخاصة
            والفريدة في كل مناسبة. نحن نفهم أهمية الهدايا في تعبير مشاعر الحب
            والامتنان، ولذلك نقدم مجموعة متنوعة من الهدايا المميزة التي تناسب
            جميع الأذواق والمناسبات. مهما كانت المناسبة، ستجد لدينا تشكيلة رائعة
            من الهدايا تشمل الزهور الطازجة والهدايا اليدوية والمزيد. نسعى دائمًا
            لتقديم أفضل جودة وخدمة عملاء استثنائية. مع متجر اسيل، يمكنك أن تكون
            واثقًا من أن هديتك ستكون لحظة خاصة وذكرى لا تُنسى في كل مناسبة تحتفل
            بها. تسوق معنا اليوم واجعل هداياك لا تُنسى!
          </Typography>
        </motion.div>
        <motion.div 
          className="col d-flex justify-content-center"
          initial={
            {opacity: 0, y:-80}
          }
          transition={{duration: 0.5}}
          whileInView= {
            {opacity: 1, y:0}
          }
        >
          <iframe
            className="video-introduction rounded "
            src="https://www.youtube.com/embed/h4s0llOpKrU?si=65yc7ZXdoqMqu3O4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
