import { Typography } from "@mui/material";
import {} from "react";

const Hero = () => {
  return (
    <section className="hero my-5">
      <div className="row">
        <div className="col">
          <Typography
            variant="h1"
            className="text-center tw-bold hero-title mb-2"
            sx={{}}
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
        </div>
        <div className="col d-flex justify-content-center">
          <iframe
            className="video-introduction rounded "
            src="https://www.youtube.com/embed/h4s0llOpKrU?si=65yc7ZXdoqMqu3O4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Hero;
