import { useEffect, useState } from 'react';
import './reportCard.scss'
import { publicRequest } from "../../requestMethods"
import moment from 'moment'

const ReportCard = ({ report,setList }) => {
  const [user, setUser] = useState({});
  const date = moment(report.created_at).format('DD/MM/YYYY')


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

  const handleDeleteReport = async () =>{
    try {
      await publicRequest.delete(`/report/${report?.reportId}`);
      setList(prev=>(prev.filter((item) =>item.reportId !== report.reportId)))
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteReview = async () =>{
    try {
      await publicRequest.delete(`/review/reviews/${report?.reviewId}`);
      setList(prev=>(prev.filter((item) =>item.reviewId !== report.reviewId)))

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="reportCard">
      <h2>Review: {review.title}</h2>
      <p>Người report: {user.username}</p>
      <p>Ngày report: {date}</p>
      <h3>{report.reason}</h3>
      <div className='actions'>
        <button className='viewButton' onClick={handleDeleteReport}>Xóa report</button>
        <button className='deleteButton' onClick={handleDeleteReview}>Xóa review</button>
      </div>

    </div>
  )
}

export default ReportCard