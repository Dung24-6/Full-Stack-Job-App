import './ApplyList.scss'
import ApplyCard from '../../components/applyCard/ApplyCard'
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';


const ApplyList = ({ type }) => {
  const [applyList, setApplyList] = useState([]);
  useEffect(() => {
    const getApplyList = async () => {
      try {

        const res = await publicRequest.get(`application/${type}`)
        setApplyList(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getApplyList();
  }, [type]);

  return (
    <div className="applyList">
      <div className="container">
        <h1>Your Apply</h1>
        {applyList?.map(apply => (<ApplyCard key={apply.applicationId} apply={apply} setApplyList={setApplyList} />))}


      </div>
    </div>
  )
}

export default ApplyList