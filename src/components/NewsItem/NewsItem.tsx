import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import newsLogo from "../../assets/news-logo.webp";
import "./NewsItem.css";
import { useState } from "react";

interface NewsItemProps {
  news: any;
  sourceType: "newsApi" | "guardian" | "newsApiOrg";
}

// NewsItem to display single news item in the list
const NewsItem = ({ news, sourceType }: NewsItemProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Global function to prepare data to display as all the apis provide different keys from json
  const getNewsData = () => {
    switch (sourceType) {
      case "newsApi":
        return {
          image: news?.image ? news?.image : newsLogo,
          title: news?.title?.replace(/[^\w\s]/gi, "").slice(0, 50),
          author: news?.authors.map((i: any) => i?.name).join(","),
          date: news?.dateTime,
          description: news?.body.replace(/[^\w\s]/gi, ""),
          url: `/${news.url}`,
          readMore: `/${news.source.uri}`,
        };

      case "guardian":
        return {
          image: news?.elements?.[0]?.assets?.[0]?.file
            ? news?.elements?.[0]?.assets?.[0]?.file
            : newsLogo,
          title: news?.webTitle?.replace(/[^\w\s]/gi, "").slice(0, 50),
          author: news?.webUrl,
          date: news?.webPublicationDate,
          description: news?.webTitle?.replace(/[^\w\s]/gi, ""),
          url: `/${news.slug}`,
          readMore: `/${news.slug}`,
        };

      case "newsApiOrg":
        return {
          image: news?.urlToImage ? news?.urlToImage : newsLogo,
          title: news?.title?.replace(/[^\w\s]/gi, "").slice(0, 50),
          author: news?.author,
          date: news?.publishedAt,
          description: news?.description?.replace(/[^\w\s]/gi, ""),
          url: `/${news.url}`,
          readMore: `/${news.url}`,
        };

      default:
        return null;
    }
  };

  const newsData = getNewsData();
  const navigate = useNavigate();

  // If image not loaded then show placeholder
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (!newsData) return null;

  return (
    <div
      className="news-container"
    >
      {/* Image */}
      {newsData.image && (
        <div className="news-image">
          {!isImageLoaded && (
            <div className="image-loading-placeholder">
              <span>Loading...</span>
            </div>
          )}

          <img
            src={newsData.image}
            width="735"
            height="300"
            alt="Article"
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </div>
      )}

      {/* Details */}
      <div className="news-details">
        <Link to={newsData.url} className="news-title">
          {newsData.title}
        </Link>
        {newsData?.author && (
          <div className="news-meta">
            <span>Written by</span>
            <a href={newsData?.url?.startsWith("/") ? newsData?.url.substring(1) : newsData?.url} className="news-link" target="_blank">
              {newsData?.author}
            </a>
            <span>on</span>
            <span>{format(new Date(newsData.date), "MMMM d, yyyy")}</span>
          </div>
        )}
        <div className="news-desc">
          {newsData?.description?.slice(0, 200)}
        </div>
        <a href={newsData?.url?.startsWith("/") ? newsData?.url.substring(1) : newsData?.url}className="news-read-more" target="_blank">
          Read More
        </a>
        <button className="news-view" onClick={() => navigate(`/news/${news?.id}`, { state: { newsData } })}>View</button>
      </div>
    </div>
  );
};

export default NewsItem;
