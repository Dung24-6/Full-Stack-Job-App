import { useEffect, useState } from 'react';
import './reportCard.scss'
import { publicRequest } from "../../requestMethods"

const ReportCard = ({ report }) => {
  const [user, setUser] = useState({});


  const [review, setReview] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const resUser = await publicRequest.get(`/users/${report.userId}`);
        const resReview = await publicRequest.get(`/review/${report?.reviewId}`);

        setUser(resUser.data);
        setReview(resReview.data)



      } catch (error) {
        console.log(error);
      }
    }
    if (report) {
      getData();
    }
  }, [report.userId, report.reviewId])
  return (
    <div className="reportCard">
      <h2>Review: {review.title}</h2>
      <p>Người report: {user.username}</p>
      <p>Ngày report: 10/10/2020</p>
      <h3>{report.reason}</h3>
      <div className='actions'>
        <button className='viewButton'>Xóa report</button>
        <button className='deleteButton'>Xóa review</button>
      </div>

    </div>
  )
}

export default ReportCard