import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

// APIservice
import APIServices from "../../../services/APIServices";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, styled } from "@mui/material";
import { green, red } from "@mui/material/colors";
import LoadingIndicator from "../../LoadingIndicator";

// Style


const ApproveCert = () => {
  const [apprCert, setApprCert] = useState(null);
  const { id } = useParams();
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(apprCert);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.get("own-cert", id);

        setApprCert({...data});
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

  // console.log(apprCert.picture);

  const handleUpdateStatus = async (status) => {
    try {
      if(status === 1){
        setModalMessage('Your certification has been Approved!');
      } else if (status === -1) {
        setModalMessage('Your certification has been Rejected!');
      }
      setIsModalOpen(true);
  
      const response = await APIServices.updateOwnCertStatus(id, status);
      
      console.log("Own Certificate status updated successfully:", response);
    } catch (error) {
      console.error("Error updating certificate status:", error);
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Style button
  const AppButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      color: theme.palette.getContrastText(green['A400']),
      backgroundColor: green['A400'],
    },
  }))

  const RjButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red['A400']),
    backgroundColor: red['A400'],
    '&:hover': {
      backgroundColor: red[800],
    },
  }))

  return apprCert === null ? <LoadingIndicator /> : (
    <Container>
      <Container>
        {/* <form action=""> */}
          <Typography variant="h3" pt={2} pb={3} sx={{ color: 'orange' }} align='center'>Approve Certificate</Typography>
          <Grid container mt={3} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
            <Grid item xs={12} md={6}>
              <img src={apprCert?.picture} className="card-img" alt="certImg" />
            </Grid>

            <Grid item xs={12} md={6} pl={4} sx={{ marginTop: { xs: 2, md: 0 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Name : </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="body1" gutterBottom pb={2}>{apprCert.employee?.firstName}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom pb={2}>{apprCert.employee?.lastName}</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Employee ID :</Typography>
              <Typography variant="body1" gutterBottom pb={2}>{apprCert.employee?.employeeID}</Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Certification Name :</Typography>
              <Typography variant="body1" gutterBottom pb={2}>{apprCert.cert?.name}</Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Issuer name :</Typography>
              <Typography variant="body1" gutterBottom pb={2}>{apprCert.cert.issuer?.name}</Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Date of submission :</Typography>
              <Typography variant="body1" gutterBottom pb={2}>{apprCert.createDate}</Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Issue Date :</Typography>
              <Typography variant="body1" gutterBottom pb={2}>{apprCert.issueDate}</Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Expiration Date :</Typography>
              <Typography variant="body1" gutterBottom pb={2}>{apprCert.expireDate}</Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Certification Level :</Typography>
              <Typography variant="body1" gutterBottom pb={2}>{apprCert.cert?.level}</Typography>
            </Grid>
          </Grid>

          <Box mt={5} mb={3} align='center'>

            <AppButton
              key={apprCert.id}
              sx={{ marginRight: 2 }}
              type="button"
              id="appr-btn"
              onClick={event => handleUpdateStatus(1)}
            >
              Approve
            </AppButton>

            <RjButton
              sx={{ paddingX: 2, marginLeft: 2 }}
              type="button"
              id="rej-btn"
              onClick={event => handleUpdateStatus(-1)}
            >
              Reject
            </RjButton>


            {/* <!-- Modal --> */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
              <DialogTitle>Certificate Status</DialogTitle>
              <DialogContent>
                {modalMessage}
              </DialogContent>
              <DialogActions>
                <NavLink to="/manager/verify-certificates">
                  <Button variant="contained">OK</Button>
                </NavLink>
              </DialogActions>
            </Dialog>

          </Box>

        {/* </form> */}


      </Container>
    </Container>

  )
};

export default ApproveCert;
