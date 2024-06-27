import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Outlet } from "react-router-dom";
import { addDeviceEntry, addDeviceEntryIcon, analisiGUDEntry, analisiGUDEntryIcon, connectedDevicesEntry, connectedDevicesEntryIcon, productionControlEntry, productionControlEntryIcon } from "./components/MenuEntries/MenuEntries";
import * as Colors from "./utils/colors"
import ButtonUser from "./components/ButtonUser";
import AnalyticsIcon from "./assets/img/analytics.png";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: Colors.GreenColor
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: "#E8E8E8",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const [TittleAppBar, setTittleAppBar] = React.useState(<Typography variant="h6">Dispositivos Conectados</Typography>)
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const updateHeader = (newComponent) => {
    setTittleAppBar(newComponent);
  };
  

  return (
    <Box sx={{ display: "flex", position:"relative" } }>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {TittleAppBar}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{color:Colors.GreenColor}} />
          </IconButton>
        </Toolbar>
        <Divider   />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >    
          <List component="nav" sx={{py: 0, flexGrow: 1, ml:open ? 0 : 0.9}}>
            {open ? connectedDevicesEntry : connectedDevicesEntryIcon }
            <Divider sx={{ my: 0 }} />
            {open ? addDeviceEntry : addDeviceEntryIcon}
            <Divider sx={{ my: 0 }} />
            {open ? analisiGUDEntry : analisiGUDEntryIcon}
            <Divider sx={{ my: 0 }} />
            {open ? productionControlEntry : productionControlEntryIcon}
            <Divider sx={{ my: 0 }} />
          </List>
          <Box sx={{ p: 2, flexGrow: 0 }}>
            {open && <ButtonUser />}
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: '#3F3F3F',
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ mt: 4, mb: 4}}>
          <Outlet updateHeader={updateHeader} />
        </Container>
        <Box
          component="img"
          style={{ position: 'absolute', bottom: 10, right: 0}}
          src={AnalyticsIcon}
          alt="Custom Icon"
          sx={{ height: 26}}
          zIndex={0}
        />
      </Box>
      
    </Box>
  );
}
