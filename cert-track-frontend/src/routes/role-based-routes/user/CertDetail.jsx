import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

// APIservice
import APIServices from "../../../services/APIServices.js";

// Style
import Container from "@mui/material/Container";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const CertDetail = () => {
  const [cert, setCert] = useState(null);
  const { certName } = useParams();

  // console.log(cert);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.getByName("certificate", certName);

        setCert({...data});
        console.log(data);
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

  // console.log("Cert = ",cert);
  // console.log(cert.issuer.name);

  const BackButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red["A400"]),
    backgroundColor: red["A400"],
    "&:hover": {
      backgroundColor: red[800],
    },
  }));

  return cert === null ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <Box mt={2}>
        <form action="/allcert">
          <Box>
            <Box>
              <Typography variant="h3" pt={2} pb={3} sx={{ color: "orange" }}>
                AWS Certified Data Analytics
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Issuer :
              </Typography>
              <Typography variant="body1" gutterBottom pb={2}>
                {cert.issuer?.name}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Product-Vendor :
              </Typography>
              <Typography variant="body1" gutterBottom pb={2}>
                {cert.vendor?.name}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Certification Level :
              </Typography>
              <Typography variant="body1" gutterBottom pb={2}>
                {cert.level}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Certification Demand :
              </Typography>
              <Typography variant="body1" gutterBottom pb={2}>
                {cert.certDemand}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Demand Level :
              </Typography>
              <Typography variant="body1" gutterBottom pb={2}>
                {cert.demand}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Incentive Type :
              </Typography>
              <Typography variant="body1" gutterBottom pb={2}>
                {cert.incentiveType}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Incentive Proposed :
              </Typography>
              <Typography variant="body1" gutterBottom pb={2}>
                {cert.proposed}
              </Typography>
            </Box>

            <Box mt={5} mb={3}>
              <NavLink to={-1} style={{ textDecoration: "none" }}>
                <BackButton
                  size="large"
                  variant="contained"
                  type="submit"
                  value="back"
                  id="submitBtn"
                >
                  Back
                </BackButton>
              </NavLink>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CertDetail;
