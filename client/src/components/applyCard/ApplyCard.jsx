import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';
import './ApplyCard.scss'

const ApplyCard = ({ apply, setApplyList }) => {
    const [job, setJob] = useState({});
    const [company, setCompany] = useState({});
    const [user, setUser] = useState({});

    const downloadFile = async () => {
        try {
            const response = await publicRequest.get(`application/${apply.applicationId}`);
            const fileData = response.data.cv.replace(
                "..\\client\\public",
                "\\public"
            );
            console.log(fileData);
            window.open(fileData, '_blank');
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async () => {
        try {
            await publicRequest.delete(`application/${apply.applicationId}`);
            setApplyList(prev => prev.filter(obj => obj.applicationId !== apply.applicationId))
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseJob = await publicRequest.get(`job/searchJobById/${apply.jobId}`);
                const responseCompany = await publicRequest.get(`company/${apply.companyId}`);
                const responseUser = await publicRequest.get(`users/${apply.userId}`);

                setJob(responseJob.data);
                setCompany(responseCompany.data);
                setUser(responseUser.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [apply])
    return (
        <div className="applyCard">
            <h1>{job.title} tại {company.name}</h1>
            <h2>Name: {user.username}</h2>
            <p>{apply.description}</p>
            <div className='action'>
                <button className='outline' onClick={handleDelete}>Delete</button>
                <button className='primary' onClick={downloadFile}>Download CV</button>
            </div>
        </div>
    )
}

export default ApplyCard