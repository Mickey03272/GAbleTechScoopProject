import React, { useEffect, useState, useRef } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import APIServices from "../../../services/APIServices";
import "../../../style/ManageCert.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ManageCert = () => {
  const [cert, setCert] = useState([]);
  const [activeCertId, setActiveCertId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsCert = await APIServices.get("certificate");
        setCert(responsCert);
        console.log(responsCert);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    if (modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
    }
  }, []);

  const handleView = (id,cert) => {
    navigate("/hr/manage-certificates/" + id, { state: { cert: cert } });
    console.log("View clicked for ID:", id);
  };

  const handleEdit = (id) => {
    navigate("/hr/manage-certificates/edit/" + id);
    console.log("Edit clicked for ID:", id);
  };

  const handleCreate = () => {
    navigate("/hr/manage-certificates/create");
  };

  const handleStatus = async (id, newStatus) => {
    try {
      const updatedData = {
        ...cert.find((item) => item.id === id),
        isActive: newStatus,
      };

      const response = await APIServices.put("certificate/update-is-active", updatedData, id);

      console.log("Certificate status updated successfully:", response);

      // Update the certificate status in state
      const updatedCert = cert.map((item) =>
        item.id === id ? { ...item, isActive: newStatus } : item
      );
      setCert(updatedCert);
    } catch (error) {
      console.error(`Error updating certificate status: ${error}`);
      throw error;
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name of Certificate",
      width: 600,
      renderHeader: () => (
        <div className="header-styles">Name of Certificate</div>
      ),
    },
    {
      field: "issuer",
      headerName: "Issuer",
      width: 200,
      renderHeader: () => <div className="header-styles">Issuer</div>,
      renderCell: (params) => params.row.issuer.name,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <div className="header-styles">Status</div>,
      renderCell: (params) => {
        const status = params.value ? "Active" : "Inactive";
        let statusColor = "";
        switch (status) {
          case "Inactive":
            statusColor = "red";
            break;
          case "Active":
            statusColor = "green";
            break;
        }
        return (
          <div style={{ textAlign: "center", color: statusColor }}>
            {status.toUpperCase()}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 280,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => handleView(params.row.id,params.row)}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ mr: 2 }}
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color={params.row.isActive ? "error" : "success"}
            sx={{ mr: 2 }}
            onClick={() => {
              setActiveCertId(params.row.id);
              setActionType(params.row.isActive ? "Inactive" : "Active");
            }}
            data-bs-toggle="modal"
            data-bs-target="#certActionModal"
          >
            {params.row.isActive ? "Inactive" : "Active"}
          </Button>
        </div>
      ),
    },
  ];

  //custom toolbar
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 1,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
      </Box>
    );
  }

  return (
    <div>
      <div className="ManageCert">
        <div className="container">
          <h2 id="HeaderPage">Manage Certificates</h2>
          <div id="CreateCertBtn">
            <Link to={"/hr/manage-certificates/create"}>
              <Button variant="contained" color="primary">
                Create New Certificate
              </Button>
            </Link>
          </div>
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
              rows={cert}
              columns={columns}
              disableColumnSelector
              slots={{ toolbar: QuickSearchToolbar }}
            />
          </div>
        </div>
      </div>

      {/* Modal for Inactive/Active */}
      <div
        className="modal fade"
        id="certActionModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">
                Alert
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-dark">
              {actionType === "Active"
                ? "Activate This Certificate?"
                : "Deactivate This Certificate?"}
            </div>
            <div className="modal-footer">
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                data-bs-dismiss="modal"
              >
                Close
              </Button>
              <Button
                variant="contained"
                color={actionType === "Active" ? "success" : "error"}
                data-bs-dismiss="modal"
                onClick={() =>
                  handleStatus(activeCertId, actionType === "Active")
                }
              >
                {actionType}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCert;
