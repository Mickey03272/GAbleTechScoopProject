import { React, useState, useEffect, Fragment } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../../../style/ApproveIncentive.css";
import APIServices from "../../../services/APIServices.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(4n+1)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

function Row(props) {
  const { incentiveRequest } = props;
  const [open, setOpen] = useState(false);

  const Approve1 = (ID, Year, Month, Date) => {
    let Approved = {
      id: ID,
      year: Year,
      month: Month,
      createDate: Date,
      status: 1,
    };
    APIServices.put("incentive-request", Approved, ID);
    alert(
      "Incentive for Year: " + Year + " Month: " + Month + " has been approved!"
    );
  };

  const Approve2 = (ID, cDate, eDate, active, iDate, pic, certID, empID) => {
    let Approved = {
      id: ID,
      createDate: cDate,
      expireDate: eDate,
      isActive: active,
      issueDate: iDate,
      picture: pic,
      status: 1,
      cert: { id: certID },
      employee: { id: empID },
    };
    APIServices.put("own-cert", Approved, ID);
    alert("Certificate for Employee ID: " + empID + " has been approved!");
  };

  const status = (x) => {
    switch (x) {
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "Created";
    }
  };

  const month = (x) => {
    switch (x) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid";
    }
  };

  return (
    <Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {incentiveRequest.year}
        </StyledTableCell>
        <StyledTableCell>{month(incentiveRequest.month)}</StyledTableCell>
        <StyledTableCell>
          {incentiveRequest.incentives.map(
            (incentive) => incentive.totalAmount + " (฿)"
          )}
        </StyledTableCell>
        <StyledTableCell>{status(incentiveRequest.status)}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Employee
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Employee ID</StyledTableCell>
                    <StyledTableCell>Employee Name</StyledTableCell>
                    <StyledTableCell>Amount (฿)</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {incentiveRequest.incentives.map((incentive) =>
                    incentive.incentiveDetails.map((incentiveDetail) => (
                      <StyledTableRow
                        key={
                          incentiveDetail.cert.employee.id +
                          incentiveDetail.cert.employee.firstName +
                          incentiveDetail.cert.employee.lastName
                        }
                      >
                        <StyledTableCell component="th" scope="row">
                          {incentiveDetail.cert.employee.id}
                        </StyledTableCell>
                        <StyledTableCell>
                          {incentiveDetail.cert.employee.firstName +
                            " " +
                            incentiveDetail.cert.employee.lastName}
                        </StyledTableCell>
                        <StyledTableCell>
                          {incentiveDetail.amount + " (฿)"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {status(incentiveDetail.cert.status)}
                        </StyledTableCell>
                        <StyledTableCell>
                          <button
                            key={incentiveDetail.cert.employee.id}
                            className="btn btn-primary"
                            style={{ marginRight: "5px" }}
                            onClick={(event) => {
                              Approve1(
                                incentiveRequest.id,
                                incentiveRequest.year,
                                incentiveRequest.month,
                                incentiveRequest.createDate
                              );
                              Approve2(
                                incentiveDetail.cert.id,
                                incentiveDetail.cert.createDate,
                                incentiveDetail.cert.expireDate,
                                incentiveDetail.cert.isActive,
                                incentiveDetail.cert.issueDate,
                                incentiveDetail.cert.picture,
                                incentiveDetail.cert.cert.id,
                                incentiveDetail.cert.employee.id
                              );
                            }}
                          >
                            Approve
                          </button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <br></br>
              <Typography variant="h6" gutterBottom component="div">
                Certificate
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Certificate ID</StyledTableCell>
                    <StyledTableCell>Certificate Name</StyledTableCell>
                    <StyledTableCell>Incentive Type</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incentiveRequest.incentives.map((incentive) =>
                    incentive.incentiveDetails.map((incentiveDetail) => (
                      <StyledTableRow
                        key={
                          incentiveDetail.cert.cert.id +
                          incentiveDetail.cert.cert.name
                        }
                      >
                        <StyledTableCell component="th" scope="row">
                          {incentiveDetail.cert.cert.id}
                        </StyledTableCell>
                        <StyledTableCell>
                          {incentiveDetail.cert.cert.name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {incentiveDetail.cert.cert.incentiveType}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </Fragment>
  );
}

export default function CollapsibleTable() {
  const [incentiveRequests, setIncentiveRequests] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    APIServices.get("incentive-request")
      .then((response) => {
        setIncentiveRequests(response);
      })
      .catch((error) => {
        console.error("Error fetching: " + error);
      });
  }, [reload]);

  return (
    <TableContainer component={Paper}>
      <h1 id="HeaderPage">Approved Incentive</h1>
      <Table aria-label="collapsible table" style={{ width: "98%" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <button
                className="btn btn-light"
                onClick={() => setReload((prev) => !prev)}
              >
                ⟳
              </button>
            </StyledTableCell>
            <StyledTableCell
              sx={{ fontWeight: "bold", fontSize: 25, fontFamily: "Poppins" }}
            >
              Year
            </StyledTableCell>
            <StyledTableCell
              sx={{ fontWeight: "bold", fontSize: 25, fontFamily: "Poppins" }}
            >
              Month
            </StyledTableCell>
            <StyledTableCell
              sx={{ fontWeight: "bold", fontSize: 25, fontFamily: "Poppins" }}
            >
              Total Amount (฿)
            </StyledTableCell>
            <StyledTableCell
              sx={{ fontWeight: "bold", fontSize: 25, fontFamily: "Poppins" }}
            >
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incentiveRequests.map((incentiveRequest) => (
            <Row
              key={incentiveRequest.id}
              incentiveRequest={incentiveRequest}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
