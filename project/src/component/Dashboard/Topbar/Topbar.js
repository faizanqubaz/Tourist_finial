import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  InputBase,
  Badge,
} from "@material-ui/core";
import { Link, NavLink } from 'react-router-dom'
import {
  Menu,
  Search,
  Notifications,
  SettingsPower,
  SettingsPhone,
  PersonPin,
} from "@material-ui/icons";

import "./Topbar.css";
import { useState } from 'react'
const Topbar = ({ userData }) => {
  console.log('userData',userData)
  const [display, setDisplay] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false);

  const displayLog = () => {

    setDisplay(!display)
  }

  const togglePopup = () => {
    console.log('Toggling popup visibility', popupVisible);
    setPopupVisible(!popupVisible);
    console.log('after', popupVisible)
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="topbar_slider_main">
          <div className="topbar_slider_smalldiv">
            <IconButton>
              <Menu style={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" noWrap>
              VACATION AWAITS
            </Typography>
            <div style={{ position: "relative" }}>
             
             
            </div>
          </div>

          <div className="topbar_slider_largediv" style={{
            display: 'flex',
            width: '18%',
            justifyContent: 'space-around'
          }}>

<Link to="/" style={{ marginTop: '25px', cursor: 'pointer',color:'white' }}>
              LOGOUT
            </Link>
            {/* https://wa.me/923557329249 */}
            <IconButton onClick={displayLog}>
              <Badge color='secondary'>
                <img src={userData?.picture}
  alt="Profile"
  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
  onError={(e) => {
    e.target.src = '/path/to/fallback-image.png';
  }} />
              </Badge>
            </IconButton>
            <span style={{ marginTop: '25px' }}>{userData?.username}</span>

          </div>
        </div>

      </Toolbar>



    </AppBar>
  );
};

export default Topbar;
