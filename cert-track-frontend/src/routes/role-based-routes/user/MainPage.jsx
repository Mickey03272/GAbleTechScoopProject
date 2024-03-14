import React, { useState, useEffect } from "react";
import CertificateBox from "../../../components/CertificateBox";
import APIServices from "../../../services/APIServices";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList"; // Import FilterListIcon
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  RadioGroup,
  Radio,
  ListItemIcon, // Add ListItemIcon
} from "@mui/material";

const MainPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [issuers, setIssuers] = useState([]);
  const [showIssuerFilter, setShowIssuerFilter] = useState(false);
  const [selectedIssuers, setSelectedIssuers] = useState([]);
  const [showInactive, setShowInactive] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.getCertsByPartialName(searchInput);
        console.log(data);
        setCertificates(data);
        const uniqueIssuers = getUniqueIssuers(data);
        console.log(uniqueIssuers);
        setIssuers(uniqueIssuers);
        console.log("test")
        console.log("Fetched own certificates data successfully!");
      } catch (error) {
        console.error("Error fetching certificates data:", error);
      }
    };
    fetchData();

    // Cleanup function
    return () => {
      console.log("Component unmounted");
      // Cancel the request on component unmount
    };
  }, [searchInput]);

  const getUniqueIssuers = (certs) => {
    const uniqueIssuers = Array.from(
      new Set(certs.map((cert) => cert?.issuer.name))
    );
    return uniqueIssuers;
  };

  const handleClickIssuerFilter = () => {
    setShowIssuerFilter((prev) => !prev);
  };

  const handleCheckboxChange = (issuer) => {
    setSelectedIssuers((prev) => {
      if (prev.includes(issuer)) {
        return prev.filter((item) => item !== issuer);
      } else {
        return [...prev, issuer];
      }
    });
  };

  const handleInactiveCheckboxChange = () => {
    setShowInactive((prev) => !prev);
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      (selectedIssuers.length === 0 ||
        selectedIssuers.includes(cert.issuer.name)) &&
      (showInactive || cert.isActive)
  );

  // Filter issuer names based on selected issuers
  const filteredIssuers = issuers.filter((issuer) =>
    filteredCertificates.some((cert) => cert.issuer.name === issuer)
  );

  // Group certificates by issuer
  const groupedCertificates = filteredIssuers.map((issuer) => ({
    issuer,
    certificates: filteredCertificates.filter(
      (cert) => cert.issuer.name === issuer
    ),
  }));

  return (
    <Container sx={{ color: "black", alignItems: "center" }}>
      <Grid container spacing={4} justifyContent="center" mt={1}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h3" align="center" color="orange">
            All Certificates
          </Typography>
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
              columnGap: "1rem",
            }}
          >
            <TextField
              label="Search by certificate name"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              fullWidth
              style={{ width: "100%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                variant="h5"
                component="h5"
                onClick={handleClickIssuerFilter}
                style={{ cursor: "pointer" }}
                mt={4}
                pl={2}
                color="black"
                fontWeight="bold"
                width="195px"
              >
                <ListItemIcon style={{ minWidth: "35px" }}>
                  <FilterListIcon //sx={{ paddingTop: "3px" }} 
                  />
                </ListItemIcon>
                Issuer Filter
              </Typography>
              {showIssuerFilter && (
                <FormGroup>
                  {issuers.map((issuer, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={selectedIssuers.includes(issuer)}
                          onChange={() => handleCheckboxChange(issuer)}
                          sx={{
                            color: "orange",
                            "&.Mui-checked": {
                              color: "orange",
                            },
                            // ml: 0.7,
                          }}
                        />
                      }
                      label={<Typography variant="h6">{issuer}</Typography>}
                      sx={{
                        width: `${issuer.length + 42}px`,
                        marginLeft: "6.8px",
                      }}
                    />
                  ))}
                </FormGroup>
              )}
            </Grid>

            <Grid container item xs={12} sm={12} md={12}>
              <Grid item xs={6} sm={6} md={4}>
                <Typography
                  variant="h5"
                  component="h5"
                  // mt={2}
                  pl={2}
                  color="black"
                  fontWeight="bold"
                >
                  Certificate Status
                </Typography>
                <RadioGroup sx={{ marginLeft: 2, width: "130px" }}>
                  <FormControlLabel
                    value="active"
                    control=<Radio
                      checked={!showInactive}
                      onChange={handleInactiveCheckboxChange}
                    />
                    label={
                      <Typography variant="h5">
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          Active
                        </span>
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="inactive"
                    control=<Radio
                      checked={showInactive}
                      onChange={handleInactiveCheckboxChange}
                    />
                    label={
                      <div>
                        <Typography variant="h5">
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            Inactive
                          </span>
                        </Typography>
                      </div>
                    }
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {groupedCertificates.map((group, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="h3" mb={2} bgcolor={"orange"} p={1}>
              {" "}
              Issuer : {group.issuer}
            </Typography>
            <Grid container spacing={2}>
              {group.certificates.map((certificate, index) => (
                <Grid item xs={12} sm={4} md={3} key={index}>
                  <CertificateBox cert={certificate} isOwnCert={false} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
        {!certificates.some((cert) => cert.name.includes(searchInput)) && (
          <Typography variant="h5" style={{ color: "orange" }}>
            No certificates found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MainPage;
