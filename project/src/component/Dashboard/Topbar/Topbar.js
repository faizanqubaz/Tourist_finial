import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  InputBase,
  Badge,
} from "@material-ui/core";
import {Link,NavLink} from 'react-router-dom'
import {
  Menu,
  Search,
  Notifications,
  SettingsPower,
  SettingsPhone,
  PersonPin,
} from "@material-ui/icons";
import "./Topbar.css";
import {useState} from 'react'
const Topbar = ({ userData }) => {
  const [display,setDisplay]=useState(false)
  const [popupVisible, setPopupVisible] = useState(false); 

  const displayLog=()=>{
    
setDisplay(!display)
  }

  const togglePopup = () => {
    console.log('Toggling popup visibility',popupVisible);
    setPopupVisible(!popupVisible);
    console.log('after',popupVisible)
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
              <Search
                style={{
                  position: "absolute",
                  left: "8px",
                  bottom: "0",
                  zIndex: "2",
                  top: "4px",
                  color: "black",
                }}
              />
              <InputBase
                style={{ backgroundColor: "white", borderRadius: "7px" }}
              />
            </div>
          </div>

          <div className="topbar_slider_largediv" style={{display: 'flex',
    width: '18%',
    justifyContent: 'space-around'}}>
            <IconButton>
              <Badge badgeContent='4' color="secondary">
                <Notifications style={{ color: "white" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={togglePopup}> 
              <Badge>
                <SettingsPower style={{ color: "white" }} />
              </Badge>
            </IconButton>

           

            <IconButton onClick={displayLog}>
  <Badge  color='secondary'>
    <img src={userData?.picture} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
  </Badge>
</IconButton>
<span style={{marginTop:'25px'}}>{userData?.username}</span>
          </div>
        </div>
      </Toolbar>
    
      {popupVisible && (
        <div className="popup_boxxx">
          <div>
            <h4 style={{ color: 'red' }}>Map</h4>
            <hr />
            <h4 style={{ color: 'red' }}>Logout</h4>
            <hr />
          </div>
        </div>
      )}
     
    </AppBar>
  );
};

export default Topbar;
