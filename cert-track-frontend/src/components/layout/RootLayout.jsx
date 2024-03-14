import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  return (
    <Grid container>
      <Grid item xs={1.8} 
      // sm={2} md={3}
      >
        <Sidebar/>
      </Grid>
      <Grid item xs={10.2}
      //  sm={10} md={9} 
       >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default RootLayout;
