import { format } from "timeago.js";
import "./SingleNewsPage.css";
import { useLocation } from "react-router-dom";

// SingleNewsPage
const SingleNewsPage = () => {

    const location = useLocation();
    const { newsData } = location.state || {};

  return (
    <div className="flex-container">
      {/* detail */}
      <div className="detail-container">
        <div className="content">
          <h1 className="title">{newsData?.title}</h1>
          {
            newsData?.author &&
            <div className="meta">
            <span>Written by</span>
            <a href={newsData?.url?.startsWith("/") ? newsData?.url.substring(1) : newsData?.url} className="username" target="_blank">
              {newsData?.author}
            </a>
            <span>on</span>
            <span>{format(newsData?.date)}</span>
          </div>
          }
          <p className="description">{newsData?.description}</p>
        </div>
        {newsData?.image && (
          <div className="image-container">
            <img src={newsData?.image} alt="Image" className="rounded-image" />
          </div>
        )}
      </div>

      {/* content */}
      <div className="content-main">
        {/* text */}

        {/* menu */}
        <div className="menu">
          <h1 className="menu-title">Author</h1>
          <div className="author-info">
            {newsData?.image && (
              <img src={newsData?.image} alt="Author" className="author-img" />
            )}
            <a href={newsData?.url?.startsWith("/") ? newsData?.url.substring(1) : newsData?.url} className="author-username" target="_blank">
              {newsData?.author}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNewsPage;
