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
import {useDispatch} from "react-redux"
import {logout} from '../../redux/apiCalls'
const Sidebar = () => {
  const dispatch2 = useDispatch();
  const { dispatch } = useContext(DarkModeContext);

  const handleLogout = ()=>{
    logout(dispatch2);
  }

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
          <Link to="/companies">
            <li>
              <StoreOutlined />
              <span>Companies</span>
            </li>
          </Link>
          <Link to="/report">

          <li>
            <CreditCard />
            <span>Reports</span>
          </li>
          </Link>

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
          
          <Link to='/login' onClick={handleLogout}>
            <li>
              <Logout />
              <span>Logout</span>
            </li>
          </Link>
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
