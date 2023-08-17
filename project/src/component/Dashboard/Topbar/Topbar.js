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
const Topbar = () => {
  const [display,setDisplay]=useState(false)
  const displayLog=()=>{
setDisplay(!display)
  }
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
            <IconButton>
              <Badge>
                <SettingsPower style={{ color: "white" }} />
              </Badge>
            </IconButton>

            <IconButton>
              <Badge>
                <SettingsPhone style={{ color: "white" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={displayLog}>
              <Badge badgeContent='1' color='secondary'>
                <PersonPin style={{ color: "white" }} />
              </Badge>
            </IconButton>
          </div>
        </div>
      </Toolbar>
      {
        display ? 
        <NavLink to='map'>
        <div  style={{height:'200px',border:'1px solid black',backgroundColor:'white',
        width: '90px',
        position: 'absolute',
        right: '0',
        top: '46px',
        left: '1239px'
        
    }}>
    <div>
    
      <h4 style={{color:'red'}}>Map</h4>
      <hr />
      <h4 style={{color:'red'}}>Logout</h4>
      <hr />
    </div>
          </div>
          </NavLink>
          : null
      }
     
    </AppBar>
  );
};

export default Topbar;
