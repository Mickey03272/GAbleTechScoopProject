import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CertificateBox from "../../../components/CertificateBox";
import APIServices from "../../../services/APIServices";
import { userContext } from "../../../util/userContext";
import {
  Typography,
  Button,
  CssBaseline,
  Container,
  Grid,
} from "@mui/material";

const MyCerts = () => {
  const [ownCerts, setOwnCerts] = useState([]);
  const [issuers, setIssuers] = useState([]);
  const [totalIncentive, setTotalIncentive] = useState(0.0);
  const [showInactiveCert, setShowInactiveCert] = useState(false);
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.getEmployeeByUserId(currentUser.id);
        console.log(data);
        console.log(data.ownList);
        setOwnCerts(data.ownList);
        const uniqueIssuers = getUniqueIssuers(data.ownList);
        setIssuers(uniqueIssuers);
        setTotalIncentive(getTotal(data.ownList));
        console.log("Fetched certificates data successfully!");
      } catch (error) {
        console.error("Error fetching owncerts data:", error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  const getUniqueIssuers = (ownCerts) => {
    const uniqueIssuers = Array.from(
      new Set(ownCerts.map((ownCert) => ownCert.cert.issuer.name))
    );
    return uniqueIssuers;
  };

  const getTotal = (ownCerts) =>
    ownCerts
      .filter((ownCert) => ownCert.isActive)
      .reduce((acc, ownCert) => acc + ownCert.cert?.proposed, 0);

  const inactiveCerts = () => {
    return ownCerts.filter((ownCert) => !ownCert.isActive);
  };

  useEffect(() => {
    const firstInactiveCert = ownCerts.find((ownCert) => !ownCert.isActive);
    if (firstInactiveCert) {
      setShowInactiveCert(true);
    }
  }, [ownCerts]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid item xs={12}
          textAlign="center"
          container spacing={4} justifyContent="center" mt={2} mb={2}>
          <Typography variant="h3" align="center" color="orange">
            My Certificate
          </Typography>
        </Grid>
        {ownCerts.length !== 0 ? (
          <>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Link
                  to="/my-certificates/add-certificate"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                  
                  size="medium"
                  variant="contained" 
                  color="primary"
                  >
                    + Add Certificate
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="h5" color="textPrimary">
                  Total Incentive : {totalIncentive} ฿
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              {issuers.map((issuer, index) => (
                <Grid item xs={12} key={index}>
                  <Typography
                    variant="h4"
                    mb={2}
                    bgcolor={"orange"}
                    p={1}
                  // textAlign={"center"}
                  > Issuer : {issuer}
                  </Typography>

                  <Grid container spacing={2}>
                    {ownCerts
                      .filter(
                        (ownCert) =>
                          ownCert.cert.issuer.name === issuer &&
                          ownCert.isActive
                      )
                      .map((filteredCert) => (
                        <Grid item xs={12} sm={4} md={3} key={filteredCert.id}>
                          <CertificateBox
                            cert={filteredCert}
                            isOwnCert={true}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" color="error.main" marginTop={"5%"}>
                  {showInactiveCert ? "Inactive Certificate" : null}
                </Typography>
                <Grid container spacing={2}>
                  {ownCerts
                    .filter((ownCert) => !ownCert.isActive)
                    .map((filteredCert) => (
                      <Grid item xs={12} sm={4} md={3} key={filteredCert.id}>
                        <CertificateBox cert={filteredCert} isOwnCert={true} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "50vh" }}
          >
            <Grid item align="center" marginTop={"15%"}>
              <Typography variant="h4" color="warning.main" align="center">
                You don't have any certificates.
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                align="center"
                style={{ marginTop: 16 }}
              >
                Explore certifications to get started!
              </Typography>
              <Grid item align="center" marginTop={"5%"}>
                <Link
                  to="/my-certificates/add-certificate"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" color="primary">
                    + Add Certificate
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MyCerts;
