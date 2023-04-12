import React from "react";
import "./ReviewCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const ReviewCard = ({ review }) => {
  const formattedDate = moment(review.create_at).fromNow();

  let rating = [];
  for (let i = 0; i < review.rating; i++) {
    rating.push(1);
  }
  for (let i = 0; i < 5 - review.rating; i++) {
    rating.push(0);
  }
  return (
    <div className="reviewCard">
      <h2>{review.title}</h2>
      <div className="rating">
        {rating.map((i, index) => (
          i === 1 ? <FontAwesomeIcon key={index} icon={faStar} className="blue" /> : <FontAwesomeIcon key={index} icon={faStar} />
        ))}



      </div>
      <div className="date">{formattedDate}</div>
      <div className="description">{review.comment}</div>
    </div>
  );
};

export default ReviewCard;
