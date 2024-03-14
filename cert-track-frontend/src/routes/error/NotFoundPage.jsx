import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";

const NotFoundPage = ({ authenticated, isAllowedRole }) => {
  const navigate = useNavigate();
  const message = "The page you are looking for might be in another castle.";

  return (
    <Container sx={{ minHeight: "100vh", display: "flex", alignItems: "center", "color": "black" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" align="center" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            {authenticated ? (
              isAllowedRole ? (
                message
              ) : (
                <>
                  {message}
                  <br />
                  <span style={{ color: "red" }}>Or you don't have permission to access this page.</span>
                </>
              )
            ) : (
              <>
                {message}
                <br />
                <span style={{ color: "red" }}>Or you are not logged in. Please log in to access this page.</span>
              </>
            )}
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Grid>
            {authenticated ? (
              <Grid item>
                <Button component={NavLink} to="/certificates" variant="contained" color="success">
                  Home
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button component={NavLink} to="/login" variant="contained" color="success">
                  Go to Login
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
