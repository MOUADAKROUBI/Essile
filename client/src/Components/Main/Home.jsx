import Hero from "./Home/Hero";
import MostSallers from './Home/MostSallers';
import OffersAndCompetitions from './Home/offersAndCompetitions';
import NewslettreSignUp from './Home/NewslettreSignUp';
import "../../css/homeStyle.css";

const Home = () => {

  return (
      <>
        <Hero />
        <MostSallers />
        <OffersAndCompetitions />
        <NewslettreSignUp />
      </>
    );
  };

export default Home;
