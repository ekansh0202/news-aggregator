import useFetchNews from "../../hooks/useFetchNews";
import NewsPage from "../NewsPage/NewsPage";
import "./HomePage.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// HomePage of the application - Contains the buttons for different news sources and the NewsPage containing all the articles
const HomePage = () => {

  const { getNews, filterNewsItems, getNewsItemsFromSource, setSource } = useFetchNews();
  const { articles, sourceType, status } = useSelector((state: RootState) => state.news);

  const onHandleGetNewsFromSource = (sourceType: string) => {
    setSource(sourceType);
    getNewsItemsFromSource(sourceType);
  }

  // To prevent multiple options to be enabled to get articles
  const isLoading = status === "loading";

  // Fetching all the articles at the start
  useEffect(() => {
    getNews();
    setSource("all");
  }, []);
  
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
        <button className={`home-button ${sourceType === "all" ? "primary" : ""}`} disabled={isLoading} onClick={() => onHandleGetNewsFromSource('all')}>All News</button>
        <button className={`home-button ${sourceType === "newsApi" ? "primary" : ""}`} disabled={isLoading} onClick={() => onHandleGetNewsFromSource('newsApi')}>News Api</button>
        <button className={`home-button ${sourceType === "guardian" ? "primary" : ""}`} disabled={isLoading} onClick={() => onHandleGetNewsFromSource('guardian')}>Guardian</button>
        {/* <button className={`home-button ${sourceType === "guardian" ? "primary" : ""}`} disabled={isLoading} onClick={() => onHandleGetNewsFromSource('nyt')}>New York Times</button> */}
        <button className={`home-button ${sourceType === "newsApiOrg" ? "primary" : ""}`} disabled={isLoading} onClick={() => onHandleGetNewsFromSource('newsApiOrg')}>News.org</button>
        <span className="separator">|</span>
        <span className="count">Count: {articles.length}</span>
        <div className="home-search">
          <input type="text" className="search" placeholder="Search news..." onChange={(event) => filterNewsItems(event.target.value)}/>
        </div>
      </div>

      <NewsPage />
    </div>
  );
};

export default HomePage;
