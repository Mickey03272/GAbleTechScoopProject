import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import React from "react";
import Sidebar from "../components/layout/Sidebar";

const LoadingIndicator = ({ authenticated }) => {
  return authenticated ? (
    <Grid container>
      <Grid item xs={1.8}>
        <Sidebar />
      </Grid>
      <Grid item xs={10.2}>
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            // flexWrap="wrap"
            style={{ minHeight: "100vh" }}
          >
            <Grid item textAlign="center">
              <CircularProgress size={60} thickness={4} color="warning" />
              <Typography variant="h6" color="textSecondary" mt={2}>
                Loading ...
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  ) : (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        // flexWrap="wrap"
        style={{ minHeight: "100vh" }}
      >
        <Grid item textAlign="center">
          <CircularProgress size={60} thickness={4} color="warning" />
          <Typography variant="h6" color="textSecondary" mt={2}>
            Loading ...
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoadingIndicator;
