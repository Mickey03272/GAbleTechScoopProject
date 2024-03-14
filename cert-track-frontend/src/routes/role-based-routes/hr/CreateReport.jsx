import React, { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Axios from "axios";
// import { saveAs } from "file-saver";

function Row(props) {
  const { dataRequest } = props;
  // console.log(dataRequest);
  const [open, setOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "green";
      case -1:
        return "red";
      case 0:
        return "blue";
      default:
        return "black";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Approve";
      case -1:
        return "Reject";
      case 0:
        return "Create";
      default:
        return "Unknown";
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{dataRequest.id}</TableCell>
        <TableCell align="left">{dataRequest.employeeID}</TableCell>
        <TableCell align="left">{dataRequest.firstName}</TableCell>
        <TableCell align="left">{dataRequest.lastName}</TableCell>
        <TableCell align="left">{dataRequest.organizationFull}</TableCell>
        <TableCell align="left">
          {dataRequest.name}
          {/* {dataRequest.incentives[0].totalAmount} */}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 10, paddingTop: 10 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Certificate Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">ID</TableCell>
                    <TableCell align="right">Certificate Name</TableCell>
                    <TableCell align="right">Issuer Name</TableCell>
                    <TableCell align="right">Expire Date</TableCell>
                    <TableCell align="right">Amount ($)</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataRequest.ownList?.map(
                    (data, index) =>
                      index < 10 && ( // limit to 10 rows
                        <TableRow key={index}>
                          {" "}
                          {console.log(data.cert.issuer.name)}
                          <TableCell align="right">{data.id}</TableCell>
                          <TableCell align="right">{data.cert.name}</TableCell>
                          <TableCell align="right">
                            {data.cert.issuer.name}
                          </TableCell>
                          <TableCell align="right">{data.expireDate}</TableCell>
                          <TableCell align="right">
                            {
                              dataRequest.incentives[0].incentiveDetails[0]
                                .amount
                            }
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ color: getStatusColor(data.status) }}
                          >
                            {getStatusText(data.status)}
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [incentiveData, setIncentiveData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/api/employee/");
        setEmployeeData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:8080/api/incentive-request/"
        );
        setIncentiveData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateReport = async () => {
    const csvData = incentiveData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((dataRequest, index) => {
        const employeeIndex = page * rowsPerPage + index;
        return `${dataRequest.id},${employeeData[employeeIndex]?.employeeID},${employeeData[employeeIndex]?.firstName},${employeeData[employeeIndex]?.lastName},${employeeData[employeeIndex]?.organizationFull},${dataRequest.totalAmount},${dataRequest.status}`;
      })
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "monthly_report.csv");

    const emailData = {
      subject: "Monthly Report",
      body: `
      Dear Manager,
  
      Please find the attached monthly report for your review.
  
      If you have any questions or need further information, feel free to reach out.
  
      Thank you,
      [Your Name]
      [Position]
      [Best Regards,]
    `, // กำหนด body ของอีเมล
    };

    // ส่งอีเมลพร้อมแนบไฟล์ CSV
    try {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("subject", emailData.subject);
      formData.append("body", emailData.body);
      await Axios.post("http://localhost:8080/api/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <div
        style={{
          textAlign: "center",
          padding: "1rem 0",
        }}
      >
        <h1>Create Report</h1>
      </div>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Employee ID</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Department</TableCell>
            <TableCell align="left">Total Amount (฿)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incentiveData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((dataRequest, index) => {
              const employeeIndex = page * rowsPerPage + index;
              return (
                <Row
                  key={dataRequest?.id}
                  dataRequest={{
                    ...dataRequest,
                    ...employeeData[employeeIndex],
                  }}
                />
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={incentiveData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        style={{ padding: "7rem" }}
      >
        <LoadingButton
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleCreateReport}
        >
          Create Report
        </LoadingButton>
      </Stack>
    </TableContainer>
  );
}
