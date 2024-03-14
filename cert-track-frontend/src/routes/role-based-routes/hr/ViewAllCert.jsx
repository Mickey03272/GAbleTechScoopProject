import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import APIServices from "../../../services/APIServices";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../style/ViewAllCert.css";
import { Button } from "@mui/material";

const ViewAllCert = () => {
  const [ownCert, setOwnCert] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responsOwnCert = [];
        if (state.cert?.ownCerts) {
          responsOwnCert = state.cert.ownCerts.map((map) => ({
            ...map.employee,
            status: map.status,
          }));
        }
        setOwnCert(responsOwnCert);
        console.log(responsOwnCert);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    navigate("/managecert");
  };

  const columns = [
    {
      field: "firstName",
      headerName: "Firstname",
      width: 250,
      renderHeader: () => <div className="header-styles">Firstname</div>,
    },
    {
      field: "lastName",
      headerName: "Lastname",
      width: 250,
      renderHeader: () => <div className="header-styles">Lastname</div>,
    },
    {
      field: "employeeID",
      headerName: "Employee ID",
      width: 200,
      renderHeader: () => <div className="header-styles">Employee ID</div>,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      renderHeader: () => <div className="header-styles">Email</div>,
      valueGetter: (params) => params.row.user.email,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderHeader: () => <div className="header-styles">Status</div>,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const status = params.row.status;
        let statusText = "";
        let statusColor = "";

        switch (status) {
          case 0:
            statusText = "CREATE";
            statusColor = "blue";
            break;
          case 1:
            statusText = "APPROVE";
            statusColor = "green";
            break;
          case -1:
            statusText = "REJECT";
            statusColor = "red";
            break;
          default:
            break;
        }

        return (
          <div style={{ textAlign: "center", color: statusColor }}>
            {statusText}
          </div>
        );
      },
    },
  ];

  return (
    <div className="ViewAllCert">
      <div className="container">
        {/* <h2 id="HeaderPage">AWS Certified DevOps - Professional</h2> */}
        <h2 id="HeaderPage">{state.cert?.name}</h2>
        <div style={{ width: "100%" }}>
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            rows={ownCert}
            columns={columns}
            disableColumnSelector
          />
        </div>
        <Button
          id="Backbtn"
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ViewAllCert;
