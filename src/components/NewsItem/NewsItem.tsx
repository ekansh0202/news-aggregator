// import { Link } from "react-router-dom";
// import { format } from "timeago.js";
// import "./NewsItem.css";

// const NewsItem = (props: any) => {
//   // Dynamic component to handle data from each api

//   const newsApiItem = (
//     <div className="news-container">
//       {/* image */}
//       {props.news?.image && (
//         <div className="news-image">
//           <img
//             src={props.news?.image}
//             width="735"
//             height="300"
//             alt="Article"
//             loading="lazy"
//           />
//         </div>
//       )}
//       {/* details */}
//       <div className="news-details">
//         <Link to={`/${props.news.slug}`} className="news-title">
//           {props.news?.title?.replace(/[^\w\s]/gi, "").slice(0, 50)}
//         </Link>
//         <div className="news-meta">
//           <span>Written by</span>
//           <Link to={`/newss?author=${props.news?.source?.title}`}>
//             {props.news.source.title}
//           </Link>
//           <span>on</span>
//           <span>{format(new Date(props.news?.dateTime), "MMMM d, yyyy")}</span>
//         </div>
//         <div className="news-desc">
//           {props.news.body.replace(/[^\w\s]/gi, "").slice(0, 200)}
//         </div>
//         <Link to={`/${props.news.slug}`} className="news-read-more">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );

//   const guardianApiItem = (
//     <div className="news-container">
//       {/* image */}
//       {props.news?.elements?.length > 0 && props.news?.elements[0]?.assets[0]?.file && (
//         <div className="news-image">
//           <img
//             src={props.news?.elements[0]?.assets[0]?.file}
//             width="735"
//             height="300"
//             alt={props.news?.elements[0]?.assets[0]?.typeData?.caption}
//             loading="lazy"
//           />
//         </div>
//       )}
//       {/* details */}
//       <div className="news-details">
//         <Link to={`/${props.news.slug}`} className="news-title">
//           {props.news?.webTitle.replace(/[^\w\s]/gi, "").slice(0, 50)}
//         </Link>
//         <div className="news-meta">
//           <span>Written by</span>
//           <Link to={`/newss?author=${props.news.source.title}`}>
//             {props.news?.webUrl}
//           </Link>
//           <span>on</span>
//           <span>{format(new Date(props.news?.webPublicationDate), "MMMM d, yyyy")}</span>
//         </div>
//         <div className="news-desc">
//           {props.news?.webTitle.replace(/[^\w\s]/gi, "").slice(0, 200)}
//         </div>
//         <Link to={`/${props.news.slug}`} className="news-read-more">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );

//   const newsApiOrgItem = (
//     <div className="news-container">
//       {/* image */}
//       {props.news?.urlToImage && (
//         <div className="news-image">
//           <img
//             src={props.news?.urlToImage}
//             width="735"
//             height="300"
//             alt="Article"
//             loading="lazy"
//           />
//         </div>
//       )}
//       {/* details */}
//       <div className="news-details">
//         <Link to={`/${props.news.slug}`} className="news-title">
//           {props.news?.title?.replace(/[^\w\s]/gi, "").slice(0, 50)}
//         </Link>
//         <div className="news-meta">
//           <span>Written by</span>
//           <Link to={`/newss?author=${props.news?.source?.title}`}>
//             {props.news?.author}
//           </Link>
//           <span>on</span>
//           <span>{format(new Date(props.news?.publishedAt), "MMMM d, yyyy")}</span>
//         </div>
//         <div className="news-desc">
//           {props.news?.description.replace(/[^\w\s]/gi, "").slice(0, 200)}
//         </div>
//         <Link to={`/${props.news.slug}`} className="news-read-more">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );

//   return(

//   )
// };

// export default NewsItem;

import { Link } from "react-router-dom";
import { format } from "timeago.js";
import newsLogo from '../../assets/news-logo.webp';
import "./NewsItem.css";

interface NewsItemProps {
  news: any;
  sourceType: "newsApi" | "guardianApi" | "newsApiOrg";
}

const NewsItem = ({ news, sourceType }: NewsItemProps) => {

  const getNewsData = () => {
    switch (sourceType) {
      case "newsApi":
        return {
          image: news?.image ? news?.image : newsLogo,
          title: news?.title?.replace(/[^\w\s]/gi, "").slice(0, 50),
          author: news?.source?.title,
          date: news?.dateTime,
          description: news?.body.replace(/[^\w\s]/gi, "").slice(0, 200),
          url: `/${news.slug}`,
          readMore: `/${news.slug}`,
        };

      case "guardianApi":
        return {
          image: news?.elements?.[0]?.assets?.[0]?.file ? news?.elements?.[0]?.assets?.[0]?.file : newsLogo,
          title: news?.webTitle?.replace(/[^\w\s]/gi, "").slice(0, 50),
          author: news?.webUrl,
          date: news?.webPublicationDate,
          description: news?.webTitle?.replace(/[^\w\s]/gi, "").slice(0, 200),
          url: `/${news.slug}`,
          readMore: `/${news.slug}`,
        };

      case "newsApiOrg":
        return {
          image: news?.urlToImage ? news?.urlToImage : newsLogo,
          title: news?.title?.replace(/[^\w\s]/gi, "").slice(0, 50),
          author: news?.author,
          date: news?.publishedAt,
          description: news?.description?.replace(/[^\w\s]/gi, "").slice(0, 200),
          url: `/${news.slug}`,
          readMore: `/${news.slug}`,
        };

      default:
        return null;
    }
  };

  const newsData = getNewsData();

  if (!newsData) return null;

  return (
    <div className="news-container">
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
        <div className="news-meta">
          <span>Written by</span>
          <Link to={`/newss?author=${newsData.author}`}>{newsData.author}</Link>
          <span>on</span>
          <span>{format(new Date(newsData.date), "MMMM d, yyyy")}</span>
        </div>
        <div className="news-desc">{newsData.description}</div>
        <Link to={newsData.readMore} className="news-read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
