import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";

const New = ({ inputs, title }) => {
  const [logo_url, setLogo_url] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCompany = {
      name, email, password, logo_url, address, phone
    }
    try {
      await publicRequest.post('company/register', newCompany)
      window.location.href = '/companies'
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                logo_url
                  ? logo_url
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}
              <div className="formInput">
                <label>Logo_url</label>
                <input type='text' placeholder='' onChange={e => setLogo_url(e.target.value)} />
              </div>


              <div className="formInput">
                <label>Company Name</label>
                <input type='text' placeholder='' onChange={e => setName(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type='text' placeholder='' onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input type='password' placeholder='' onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input type='text' placeholder='' onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input type='text' placeholder='' onChange={e => setAddress(e.target.value)} />
              </div>


              <button onClick={e => handleSubmit(e)}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;