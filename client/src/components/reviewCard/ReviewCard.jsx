import React from "react";
import "./ReviewCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useSelector } from "react-redux";

const ReviewCard = ({ review,setOpen,setReviewSelect }) => {
  const formattedDate = moment(review.created_at).fromNow();
  const currentCompany = useSelector((state) => {
    if (state.company.currentCompany) {
      return state.company.currentCompany.company;
    }
  });
  const currentUser = useSelector((state) => {
    if (state.user.currentUser) {
      return state.user.currentUser.user;
    }
  });

  let rating = [];
  for (let i = 0; i < review.rating; i++) {
    rating.push(1);
  }
  for (let i = 0; i < 5 - review.rating; i++) {
    rating.push(0);
  }
  const handleOpen = ()=>{
    setOpen(true);
    setReviewSelect(review.reviewId);
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
      
      {(!currentCompany)&&currentUser && 
      <button className="primary" onClick={handleOpen}>Report</button>}
            
          

    </div>

  );
};

export default ReviewCard;
