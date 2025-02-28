import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import newsLogo from '../../assets/news-logo.webp';
import "./NewsItem.css";

interface NewsItemProps {
  news: any;
  sourceType: "newsApi" | "guardian" | "newsApiOrg";
}

const NewsItem = ({ news, sourceType }: NewsItemProps) => {

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
          image: news?.elements?.[0]?.assets?.[0]?.file ? news?.elements?.[0]?.assets?.[0]?.file : newsLogo,
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


  if (!newsData) return null;

  return (
    <div className="news-container" onClick={() => navigate(`/news/${news?.id}`, { state: { newsData } })}>
      {/* Image */}
      {newsData.image && (
        <div className="news-image">
          <img src={newsData.image} width="735" height="300" alt="Article" loading="lazy" />
        </div>
      )}

      {/* Details */}
      <div className="news-details">
        <Link to={newsData.url} className="news-title">
          {newsData.title}
        </Link>
          {
            newsData?.author &&
            <div className="news-meta">
            <span>Written by</span>
            <Link to={`/newss?author=${newsData?.author}`}>{newsData?.author}</Link>
            <span>on</span>
            <span>{format(new Date(newsData.date), "MMMM d, yyyy")}</span>
            </div>
          }
        <div className="news-desc">{newsData?.description?.slice(0, 200)}</div>
        <Link to={newsData.readMore} className="news-read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
