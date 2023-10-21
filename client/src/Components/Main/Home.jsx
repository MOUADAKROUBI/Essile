import Hero from "./Home/Hero";
import MostSallers from "./Home/MostSallers";
import OffersAndCompetitions from "./Home/offersAndCompetitions";
import NewslettreSignUp from "./Home/NewslettreSignUp";
import "../../css/homeStyle.css";
import { Helmet } from "react-helmet";
import reactGa from 'react-ga'
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    reactGa.pageview(window.location.pathname)
  }, [])

  return (
    <>
      <Helmet>
        <title>إسيل || للهدايا دائما معكم في كل المناسبات</title>
        <meta name="description" content="الصفحة الرئيسية" />
      </Helmet>
      <Hero />
      <MostSallers />
      <OffersAndCompetitions />
      <NewslettreSignUp />
    </>
  );
};

export default Home;
