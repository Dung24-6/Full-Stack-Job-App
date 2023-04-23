import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { DomainVerificationOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  const [amount, setAmount] =useState(0)
  useEffect(()=>{
    const getAmount = async ()=>{
      try {
        const res = await publicRequest.get(`count/count${type.charAt(0).toUpperCase() + type.slice(1)}`);
        setAmount(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAmount();
  },[type])

  //temporary
  const diff = 20;

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        to:'/users',
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "company":
      data = {
        title: "COMPANIES",
        isMoney: false,
        link: "See all companies",
        to:'/companies',

        icon: (
          // <ShoppingCartOutlinedIcon
          //   className="icon"
          //   style={{
          //     backgroundColor: "rgba(218, 165, 32, 0.2)",
          //     color: "goldenrod",
          //   }}
          // />
          <ApartmentIcon className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "job":
      data = {
        title: "JOBS",
        isMoney: false,
        link: "See all jobs",
        to:'/users',

        icon: (
          // <MonetizationOnOutlinedIcon
          //   className="icon"
          //   style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          // />
          <WorkOutlineIcon className="icon"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        />
        ),
      };
      break;
    case "application":
      data = {
        title: "APPLICATIONS",
        isMoney: false,
        link: "See details",
        to:'/users',

        icon: (
          // <AccountBalanceWalletOutlinedIcon
          //   className="icon"
          //   style={{
          //     backgroundColor: "rgba(128, 0, 128, 0.2)",
          //     color: "purple",
          //   }}
          // />
          <DomainVerificationOutlined
          className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
          <Link to={data.to}>
        <span className="link">
        {data.link}
        </span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;