import { Link } from "react-router-dom";
import "./sidebar.scss";
import {
  AccountCircleOutlined,
  CreditCard,
  DashboardOutlined,
  InsertChartOutlined,
  LocalShippingOutlined,
  NotificationsOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
  SettingsSystemDaydreamOutlined,
  StoreOutlined,
  Logout,
  PsychologyOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <div className="logo">MY ADMIN</div>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li>
              <DashboardOutlined />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/users">
            <li>
              <PersonOutlineOutlined />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products">
            <li>
              <StoreOutlined />
              <span>Products</span>
            </li>
          </Link>

          <li>
            <CreditCard />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingOutlined />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>

          <li>
            <InsertChartOutlined />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsOutlined />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>

          <li>
            <SettingsSystemDaydreamOutlined />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlined />
            <span>Logs</span>
          </li>
          <li>
            <SettingsOutlined />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>

          <li>
            <AccountCircleOutlined />
            <span>Profile</span>
          </li>
          <li>
            <Logout />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({type:"LIGHT"})}></div>
        <div className="colorOption" onClick={() => dispatch({type:"DARK"})}></div>
      </div>
    </div>
  );
};

export default Sidebar;
