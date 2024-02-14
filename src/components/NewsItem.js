import React from "react";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span class="badge rounded-pill bg-danger">
              {source}
            </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://images.moneycontrol.com/static-mcnews/2023/10/Earnings-with-MC-770x433.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small class="text-body-secondary">
                Published on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
