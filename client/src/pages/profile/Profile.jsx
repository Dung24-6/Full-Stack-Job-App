import {
  faCamera,
  faEnvelope,
  faMagnifyingGlass,
  faPenToSquare,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Profile.scss";

const Profile = () => {
  const currentUser = useSelector((state) => {
    if (state.user.currentUser) {
      return state.user.currentUser.user;
    }
  });

  const skills = [
    "html",
    "css",
    "javascript",
    "react",
    "node",
    "php",
    "express",
    "java",
  ];

  const [openUser, setOpenUser] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openWork, setOpenWork] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openProject, setOpenProject] = useState(false);

  const [name, setName] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [skillSearch, setSkillSearch] = useState("");

  const [mySkill, setMySkill] = useState([]);

  const [file, setFile] = useState(null);

  const [about, setAbout] = useState("");

  const handleSubmitUser = async () => {
    if (file) {
      const data = new FormData();
      data.append("avatar", file);
      console.log(data);
      try {
        await axios.post("http://localhost:8000/upload/uploadAvatar",  data , {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
    setOpenUser(false);
  };
  const handleDelete = (s) => {
    const newSkill = mySkill.filter((item) => item != s);
    setMySkill(newSkill);
  };
  return (
    <div className="profile">
      <div className="container">
        <div className="userCard">
          {!openUser ? (
            <>
              <div className="userImg">
                <img
                  src="https://vn-test-11.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                  alt="avt"
                />
              </div>

              <div className="info">
                <h1>{name}</h1>
                <hr />
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                  {email}
                </span>
                <span>
                  <FontAwesomeIcon icon={faPhone} />
                  {phone}
                </span>
              </div>
              <div className="modify" onClick={() => setOpenUser(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </>
          ) : (
            <>
              <div className="userImg">
                <img
                  src="https://vn-test-11.slatic.net/p/4ae83987b3323025809f737933a4be41.jpg"
                  alt="avt"
                />
                <div className="edit">
                  <label htmlFor="avatar">
                    <FontAwesomeIcon icon={faCamera} />
                    Edit
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="info open">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="actions">
                <button className="primary" onClick={handleSubmitUser}>
                  Save
                </button>
                <button className="outline">Discard</button>
              </div>
            </>
          )}
        </div>

        <div className="info-item">
          <h2>About Me</h2>
          {!openAbout ? (
            <>
              {about ? (
                <p>{about}</p>
              ) : (
                <p>Introduce your strengths and years of experience</p>
              )}

              <div className="modify" onClick={() => setOpenAbout(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </>
          ) : (
            <>
              <textarea
                placeholder="Tell something about you"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <div className="actions">
                <button className="primary" onClick={() => setOpenAbout(false)}>
                  Save
                </button>
                <button className="outline">Discard</button>
              </div>
            </>
          )}
        </div>
        <div className="info-item">
          <h2>Work Experience</h2>

          {!openWork ? (
            <div className="modify" onClick={() => setOpenWork(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          ) : (
            <div className="actions">
              <button className="primary" onClick={() => setOpenWork(false)}>
                Save
              </button>
              <button className="outline">Discard</button>
            </div>
          )}
        </div>
        <div className="info-item">
          <h2>Skills</h2>
          {!openSkills ? (
            <>
              <div className="mySkill">
                {mySkill &&
                  mySkill.map((s) => (
                    <div className="skill" key={s}>
                      {s}
                    </div>
                  ))}
              </div>
              <div className="modify" onClick={() => setOpenSkills(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </>
          ) : (
            <>
              <div className="mySkill">
                {mySkill &&
                  mySkill.map((s) => (
                    <div className="skill" key={s}>
                      {s}
                      <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => handleDelete(s)}
                      />
                    </div>
                  ))}
              </div>
              <hr />
              <div className="">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                  type="text"
                  placeholder="Skills"
                  onChange={(e) => setSkillSearch(e.target.value)}
                />
              </div>
              {skillSearch &&
                skills
                  .filter(
                    (skill) =>
                      !mySkill.includes(skill) && skill.includes(skillSearch)
                  )
                  .map((skill) => (
                    <span
                      key={skill}
                      onClick={() => setMySkill((prev) => [...prev, skill])}
                    >
                      {skill}
                    </span>
                  ))}
              <div className="actions">
                <button
                  className="primary"
                  onClick={() => {
                    setOpenSkills(false);
                    setSkillSearch("");
                  }}
                >
                  Save
                </button>
                <button className="outline">Discard</button>
              </div>
            </>
          )}
        </div>

        <div className="info-item">
          <h2>Education</h2>

          {!openEducation ? (
            <div className="modify" onClick={() => setOpenEducation(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          ) : (
            <div className="actions">
              <button
                className="primary"
                onClick={() => setOpenEducation(false)}
              >
                Save
              </button>
              <button className="outline">Discard</button>
            </div>
          )}
        </div>
        <div className="info-item">
          <h2>Personal Project</h2>

          {!openProject ? (
            <div className="modify" onClick={() => setOpenProject(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
          ) : (
            <div className="actions">
              <button className="primary" onClick={() => setOpenProject(false)}>
                Save
              </button>
              <button className="outline">Discard</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
