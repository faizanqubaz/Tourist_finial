import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  InputBase,
  Badge,
} from "@material-ui/core";
import {
  Menu,
  Search,
  Notifications,
  SettingsPower,
  SettingsPhone,
  PersonPin,
} from "@material-ui/icons";
import "./Topbar.css";
const Topbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <div className="topbar_slider_main">
          <div className="topbar_slider_smalldiv">
            <IconButton>
              <Menu style={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" noWrap>
              Material-UI
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
            <IconButton>
              <Badge badgeContent='1' color='secondary'>
                <PersonPin style={{ color: "white" }} />
              </Badge>
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
