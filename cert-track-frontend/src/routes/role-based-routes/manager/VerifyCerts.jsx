import React, { useContext, useEffect, useState } from 'react';
import VerifyCertsTable from '../../../components/VerifyCertsTable';
import { Grid, Container, Typography, MenuItem, Select, Button } from '@mui/material';
import APIServices from '../../../services/APIServices';
import { userContext } from '../../../util/userContext';

const VerifyCerts = () => {
  const [ownCerts, setOwnCerts] = useState([]);
  const [rows, setRows] = useState([]);
  const { currentUser } = useContext(userContext);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [columns, setColumns] = useState([
    { field: 'employee.firstName', headerName: 'First name', width: 150 },
    { field: 'employee.lastName', headerName: 'Last name', width: 150 },
    { field: 'employee.employeeID', headerName: 'Employee ID', width: 150 },
    {
      field: 'cert.name',
      headerName: 'Name of Certificate',
      width: 200,
    },
    {
      field: 'createDate',
      headerName: 'Submit Date',
      type: 'Date',
      width: 175,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIServices.getApproveOwnCertsByManagerId(currentUser.id);
        setOwnCerts(data);
        addRows(data);
        console.log('Fetched certificates data successfully!');
      } catch (error) {
        console.error('Error fetching owncerts data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const addRows = (data) => {
    let addedRows = [];
    data.forEach((ownCert) => {
      addedRows.push({
        id: ownCert.id,
        'employee.firstName': ownCert.employee.firstName,
        'employee.lastName': ownCert.employee.lastName,
        'employee.employeeID': ownCert.employee.employeeID,
        'cert.name': ownCert.cert.name,
        createDate: ownCert.createDate,
        status:
          ownCert.status === 0
            ? 'CREATE'
            : ownCert.status === 1
            ? 'APPROVE'
            : 'REJECT',
      });
    });
    setRows(addedRows);
  };

  const getOldestYear = () => {
    if (ownCerts.length > 0) {
      const oldestDate = new Date(Math.min(...ownCerts.map(cert => new Date(cert.createDate))));
      return oldestDate.getFullYear();
    }
    return new Date().getFullYear();
  };

  const filterRows = () => {
    let filteredRows = ownCerts.filter((cert) => {
      const certDate = new Date(cert.createDate);
      return (
        (selectedMonth === '' || certDate.getMonth() + 1 === parseInt(selectedMonth)) &&
        (selectedYear === '' || certDate.getFullYear() === parseInt(selectedYear))
      );
    });
    addRows(filteredRows);
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h2" align="center" color="textPrimary">
            Verify Certificates
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}  justifyContent="center">
            <Grid item>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Months</MenuItem>
                {Array.from({ length: 12 }, (_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {new Date(2000, index).toLocaleString('en-US', { month: 'long' })}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Years</MenuItem>
                {Array.from({ length: new Date().getFullYear() - getOldestYear() + 1 }, (_, index) => (
                  <MenuItem key={getOldestYear() + index} value={getOldestYear() + index}>
                    {getOldestYear() + index}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sx={{ marginTop: "8.5px" }}>
              <Button variant="contained" onClick={filterRows}>
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <VerifyCertsTable rows={rows} columns={columns} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default VerifyCerts;
