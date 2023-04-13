import { useState } from 'react';
import './Report.scss'
import { publicRequest } from '../../requestMethods';


const Report = ({setOpen,reviewSelect}) => {
  const [reason,setReason]= useState('');
  const handleSubmit = async ()=>{
    await publicRequest.post(`/report/reviews/${reviewSelect}`,{reason})
    setOpen(false)
  }
  return (
    <div className="report">
        <div className="container">
            <header>
                <h1>Report this comment</h1>
            </header>
            <h3>Reason</h3>
            <textarea name="" id="" cols="30" rows="10" placeholder='Your reason?' onChange={e=>setReason(e.target.value)}></textarea>
            <button className='primary' onClick={handleSubmit}>Report</button>
        </div>
    </div>
  )
}

export default Report