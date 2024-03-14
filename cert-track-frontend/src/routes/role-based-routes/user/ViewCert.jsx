import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

// APIservice
import APIServices from "../../../services/APIServices.js";

// Style
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import LoadingIndicator from "../../LoadingIndicator.jsx";
import { useContext } from "react";
import { userContext } from "../../../util/userContext.js";

const ViewCert = () => {
  const [viewCert, setViewCert] = useState(null);
  const { id } = useParams();
  // const [reload, setReload] = useState(true);

  // let arrayOfViewCert = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.get("own-cert", id);

        console.log(data);
        setViewCert({...data});
        // setReload(prev => !prev);
        // console.log(data.status);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };
    fetchData();

    // Cleanup function
    return () => {
      console.log("Component unmounted");
      // Cancel the request on component unmount
    };
  }, []);

  // console.log(viewCert);

  const BackButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red["A400"]),
    backgroundColor: red["A400"],
    "&:hover": {
      backgroundColor: red[800],
    },
  }));

  return viewCert === null ? (
    <LoadingIndicator authenticated={false} />
  ) : (
    <Container>
      <Container py={3}>
        {/* <form action=""> */}
        <Typography
          variant="h3"
          pt={2}
          pb={3}
          sx={{ color: "orange" }}
          align="center"
        >
          View My Certificate
        </Typography>
        <Grid
          container
          mt={3}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Grid item xs={12} md={6}>
            <img src={viewCert.picture} className="card-img" alt="certImg" />
          </Grid>

          <Grid item xs={12} md={6} pl={4} sx={{ marginTop: { xs: 2, md: 0 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Certificate Name :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert?.name}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Issuer :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert.issuer?.name}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Product-Vendor :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert.vendor?.name}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Certification Level :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert?.level}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Certification Demand :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert?.certDemand}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Demand Level :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert?.demand}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Incentive Type :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert?.incentiveType}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Incentive Proposed :
            </Typography>
            <Typography variant="body1" gutterBottom pb={2}>
              {viewCert.cert?.proposed}
            </Typography>
          </Grid>
        </Grid>

        <Box mt={5} mb={3} align="center">
          <NavLink to={-1} style={{ textDecoration: "none" }}>
            <BackButton
              size="large"
              variant="contained"
              type="submit"
              value="back"
              id="Backbtn"
            >
              Back
            </BackButton>
          </NavLink>
        </Box>

        {/* </form> */}
      </Container>
    </Container>
  );
};

export default ViewCert;
