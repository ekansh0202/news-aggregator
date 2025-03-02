import { useEffect, useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import NewsItem from "../NewsItem/NewsItem";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useFetchNews from "../../hooks/useFetchNews";

import "./NewsPage.css";

const NewsPage = () => {
  const [open, setOpen] = useState(false);
  const [newsData, setNewsData] = useState<any[]>([]);

  useFetchNews(); // Custom hook

  const { status, articles } = useSelector((state: RootState) => state.news);
  
  useEffect(() => {
    setNewsData(articles.slice(0, 10));
  }, [articles]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles]); 
  

  const loadMore = () => {
    if (newsData.length >= articles.length) return;

    setNewsData((prev) => [
      ...prev,
      ...articles.slice(prev.length, prev.length + 10),
    ]);
  };

  return (
    <div className="news-container">
      <h1 className="news-title"></h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="filter-button"
      >
        {open ? "Close" : "Filter or Search"}
      </button>

      {<div className="content-wrapper">
        <div className="news-list">
          {status === "loading" ? (
            <p className="loading-text">Loading news...</p>
          ) : newsData.length > 0 ? (
            newsData.map((item, index) =>  {
              return(
                // item?.image && <NewsItem key={index} news={item} /> // This condition for newsApi
                <NewsItem key={index} news={item} sourceType={item?.sourceType} />
              )
            })
          ) : (
            <p className="no-news-text">No news available.</p>
          )}
        </div>
        <div className={`side-menu ${open ? "show" : ""}`}>
          <SideMenu />
        </div>
      </div> }
    </div>
  );
};

export default NewsPage;
