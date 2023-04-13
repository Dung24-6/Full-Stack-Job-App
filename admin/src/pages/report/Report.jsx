import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import ReportCard from '../../components/reportCard/ReportCard'
import Sidebar from '../../components/sidebar/Sidebar'
import './report.scss'
import { publicRequest } from "../../requestMethods"


const Report = () => {

  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    const getReport = async () => {
      try {
        const res = await publicRequest.get('/report');
        setReportList(res.data);

      } catch (error) {
        console.log(error);
      }
    }
    getReport();
  }, []);

  return (
    <div className="report">
      <Sidebar />
      <div className="reportContainer">
        <Navbar />
        <div className="reportList">
          <h1>Reports List</h1>
          {reportList.map(report =>
            (<ReportCard key={report.reportId} report={report} />)
          )}
          


        </div>

      </div>
    </div>
  )
}

export default Report