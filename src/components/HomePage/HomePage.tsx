import { useState } from "react";
import useFetchNews from "../../hooks/useFetchNews";
import NewsPage from "../NewsPage/NewsPage";
import "./HomePage.css";

const HomePage = () => {

  const { filterNewsItems, getNewsItemsFromSource } = useFetchNews();
  const [source, setSource] = useState("all");

  const onHandleGetNewsFromSource = (sourceType: string) => {
    setSource(sourceType);
    getNewsItemsFromSource(sourceType);
  }
  
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
        <button className={`home-button ${source === "all" ? "primary" : ""}`} >All News</button>
        <button className={`home-button ${source === "newsApi" ? "primary" : ""}`} onClick={() => onHandleGetNewsFromSource('newsApi')}>News Api</button>
        <button className={`home-button ${source === "guardian" ? "primary" : ""}`} onClick={() => onHandleGetNewsFromSource('guardian')}>Guardian</button>
        <button className={`home-button ${source === "newsApiOrg" ? "primary" : ""}`} onClick={() => onHandleGetNewsFromSource('newsApiOrg')}>News.org</button>
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
