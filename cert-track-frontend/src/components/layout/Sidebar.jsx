import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  // Tooltip,
} from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../util/authContext";
import {
  Home,
  Assignment,
  AssignmentInd,
  VerifiedUser,
  Assessment,
  CloudUpload,
  ExitToApp,
  Analytics,
  // AnalyticsIcon
} from "@mui/icons-material";

const drawerWidth = "14%";

const Sidebar = () => {
  const { userRoles, doLogout } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const drawerStyle = {
    width: drawerWidth,
    flexShrink: 0,
    maxWidth: 160,
  };

  const drawerPaperStyle = {
    width: drawerWidth,
    backgroundColor: "black",
    color: "white",
  };

  const toolbarStyle = {};

  const routes = [
    { path: "/certificates", text: "Home", icon: <Home /> },
    {
      path: "/my-certificates",
      text: "My Certificates",
      icon: <Assignment />,
      allowedRoles: ["ROLE_USER"],
    },
    {
      path: "/statistic",
      text: "Statistic",
      icon: <Analytics />,
      allowedRoles: ["ROLE_HR", "ROLE_MANAGER", "ROLE_HRMANAGER"],
    },
    {
      path: "/hr/manage-certificates",
      text: "manage Certificates",
      icon: <AssignmentInd />,
      allowedRoles: ["ROLE_HR"],
    },
    {
      path: "/manager/verify-certificates",
      text: "Verify Certificates",
      icon: <VerifiedUser />,
      allowedRoles: ["ROLE_MANAGER"],
    },
    {
      path: "/hr-manager/approve-incentive",
      text: "Approve Incentive",
      icon: <Assessment />,
      allowedRoles: ["ROLE_HRMANAGER"],
    },
    {
      path: "/report",
      text: "Report",
      icon: <Assessment />,
      allowedRoles: ["ROLE_MANAGER", "HR_MANAGER"],
    },
    {
      path: "/hr/create-report",
      text: "Create Report",
      icon: <Assessment />,
      allowedRoles: ["ROLE_HR"],
    },
    {
      path: "/admin/import",
      text: "Import",
      icon: <CloudUpload />,
      allowedRoles: ["ROLE_ADMIN"],
    },
  ];

  const handleLogout = () => {
    try {
      doLogout();
      <Navigate to="/login" replace={true} />;
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getMenuItems = () => {
    return routes.map((route) => {
      const isActive = location.pathname === route.path;
      if (
        !route.allowedRoles ||
        userRoles.some((role) => route.allowedRoles.includes(role))
      ) {
        return (
          // <Tooltip key={route.path} title={route.text} placement="right">
            <ListItem
              button
              key={route.path}
              component={Link}
              to={route.path}
              title={route.text}
              sx={{
                paddingLeft: "5%",
                alignItems: "center",
                color: isActive ? "#FFBF46" : "white",
              }}
            >
              <ListItemIcon
                style={{
                  color: isActive ? "#FFBF46" : "white",
                  minWidth: 30,
                  marginRight: "0",
                }}
              >
                {route.icon}
              </ListItemIcon>
              <ListItemText
                primary={route.text}
                sx={{ paddingLeft: "5px", marginLeft: "0px" }}
              />
            </ListItem>
          // </Tooltip>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Drawer
        style={drawerStyle}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiPaper-root": {
            backgroundColor: "black",
            color: "white",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        classes={{
          paper: drawerPaperStyle,
        }}
        anchor="left"
      >
        <div style={toolbarStyle} />
        <List>
          <ListItem button component={Link} to="/certificates">
            <img
              src="https://gable-prod.s3.ap-southeast-1.amazonaws.com/logo_2e12331ff9_d9108c05a3.svg"
              alt="Logo"
              className="img-fluid"
            />
          </ListItem>
          <Divider />
          {getMenuItems()}
          <Divider />
          <ListItem button onClick={doLogout} sx={{ paddingLeft: "5%" }}>
            <ListItemIcon sx={{ minWidth: 30, marginRight: "0" }}>
              <ExitToApp style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ paddingLeft: "5px", marginLeft: "0px" }}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
