import React, { useEffect, useState } from "react";
import "./Review.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Review = () => {
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");


  const location = useLocation();
  const companyId = location.pathname.split('/')[2];
  useEffect(() => {
    const getCompany = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/company/${companyId}`
        );

        setCompany(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCompany();
  }, []);

  const handleRating = (i) => {
    i === rating ? setRating(0) : setRating(i)
  }

  const handleSubmit = async () => {
    const newReview = {
      rating, comment, title
    }
    try {
      await axios.post(`http://localhost:8000/review/reviews/${companyId}`, newReview, {
        withCredentials: true,
      })
      window.location.href = `/company/${companyId}`;

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="review">
      <div className="container">
        <header>
          <h1>Đánh giá {company.name}</h1>
          <img src={company.logo_url} />
        </header>
        <span>Bạn chỉ mất 1 phút để hoàn thành bảng đánh giá này.</span>
        <span>
          Ý kiến của bạn sẽ giúp ích rất nhiều cho cộng đồng Developer đang tìm
          việc.
        </span>
        <h3>Đánh giá tổng quát</h3>
        <div className="rating">
          {[1, 2, 3, 4, 5].map(i => (
            <FontAwesomeIcon key={i} icon={faStar} className={i <= rating ? 'blue' : ''} onClick={() => handleRating(i)} />
          ))}

        </div>
        <h3>Tiêu đề</h3>
        <input placeholder="Tóm tắt" onChange={(e) => setTitle(e.target.value)} />
        <h3>Nhận xét của bạn</h3>
        <textarea placeholder="Bạn nghĩ gì về công ty?" name="" id="" cols="30" rows="10" onChange={(e) => setComment(e.target.value)}></textarea>
        <button onClick={handleSubmit}>Đánh giá</button>
      </div>
    </div>
  );
};

export default Review;
