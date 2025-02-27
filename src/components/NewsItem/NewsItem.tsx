import { Link } from "react-router-dom";
import { format } from "timeago.js";
import "./NewsItem.css";

const NewsItem = (props: any) => {
    return(
        <div className="news-container">
        {/* image */}
        {props.news.image && (
          <div className="news-image">
            <img src={props.news.image} width="735" height="300" alt="Article" loading="lazy" />
          </div>
        )}
        {/* details */}
        <div className="news-details">
          <Link to={`/${props.news.slug}`} className="news-title">
            {props.news.title.replace(/[^\w\s]/gi, "").slice(0, 50)}
          </Link>
          <div className="news-meta">
            <span>Written by</span>
            <Link to={`/newss?author=${props.news.source.title}`}>
              {props.news.source.title}
            </Link>
            <span>on</span>
            <span>{format(new Date(props.news.dateTime), "MMMM d, yyyy")}</span>
          </div>
          <div className="news-desc">
          {props.news.body.replace(/[^\w\s]/gi, "").slice(0, 200)}
          </div>
          <Link to={`/${props.news.slug}`} className="news-read-more">
            Read More
          </Link>
        </div>
      </div>
    )
}

export default NewsItem;