import useFetchNews from "../../hooks/useFetchNews";
import NewsPage from "../NewsPage/NewsPage";
import "./HomePage.css";

const HomePage = () => {

  const { filterNewsItems } = useFetchNews();
  
  return (
    <div className="home-container">
        <div className="text-container">
          <h1 className="text">
          Your Destination for News, Insights, and Trends
          </h1>
          <p className="subtitle">
          Stay informed with the latest updates from multiple sources in one place.
          </p>
        </div>

      <div className="home-options">
        <button className="home-button primary">All News</button>
        <button className="home-button">Web Design</button>
        <button className="home-button">Development</button>
        <button className="home-button">Databases</button>
        <button className="home-button">Search Engines</button>
        <button className="home-button">Marketing</button>
        <span className="separator">|</span>
        <div className="home-search">
          <input type="text" className="search" placeholder="Search news..." onChange={(event) => filterNewsItems(event.target.value)}/>
        </div>
      </div>

      <NewsPage />
    </div>
  );
};

export default HomePage;
