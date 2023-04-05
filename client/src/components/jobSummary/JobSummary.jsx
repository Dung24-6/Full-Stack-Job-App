import {
  faCalendar,
  faDollar,
  faHeart,
  faLocationDot,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./JobSummary.scss";

const JobSummary = () => {
  return (
    <div className="jobSummary">
      <h1>Frontend</h1>
      <div className="name">MB Bank</div>
      <div className="apply">
        <button>
          <Link to="/apply">Ứng tuyển</Link>
        </button>
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="overview">
        <div className="overview-item sallary">
          <FontAwesomeIcon icon={faDollar} />
          1000 - 2000 USD
        </div>
        <div className="overview-item">
          <FontAwesomeIcon icon={faLocationDot} />
          58 Nguyen Khanh Toan, Cau Giay, Ha Noi
        </div>
        <div className="overview-item">
          <FontAwesomeIcon icon={faUserAlt} />
          Tại văn phòng
        </div>
        <div className="overview-item time">
          <FontAwesomeIcon icon={faCalendar} />3 giờ trước
        </div>
      </div>
      <h2>Mô Tả Công Việc</h2>
      <p>
        ● Manage the international product development teams (including dev,
        tester, BA) to ensure that assigned duties meet the business
        requirements and the companys objectives. ● Build and manage the project
        plans to ensure works are identified, assigned and completed on time
        with good quality. ● Organize and run meetings to ensure the
        transparency of information between management and development. ● Manage
        changes to different aspects of the projects (scope, schedule, quality
        indexes, ...). ● Create and maintain comprehensive project documentation
        throughout the entire process. ● Identify, track, manage, prevent and
        resolve any project issues that may occur. ● Measure and report project
        performance using appropriate tools and techniques. ● Perform risk
        management to minimize project risks.
      </p>
      <h2>Yêu Cầu Công Việc</h2>
      <p>
        ● Bachelor’s degree in Computer Science or related field, advanced
        degree preferred, or equivalent. ● 3+ years of project management
        experience in the IT/Software industry ● Experience in traditional SDLC,
        Agile methodologies (SCRUM, Kanban,...) and have acceptable knowledge
        with the others. ● Have experience with people management and resource
        management for a medium-sized organization. ● Proven experience in scope
        definition, project estimation, quality management, resource management
        and/or risk management ● Strong familiarity with project management
        software tools, methodologies, and best practices. ● Ability to
        effectively present and report project status to high-level management.
        ● Ability to work with cross-functional and globally distributed
        development teams. ●Ability to react to project adjustments and
        alterations promptly and efficiently. ● Advanced English (fluent
        preferable). ● Excellent analytical, verbal, and written communication
        skills ● TOEIC 800+ or equivalent
      </p>
    </div>
  );
};

export default JobSummary;
