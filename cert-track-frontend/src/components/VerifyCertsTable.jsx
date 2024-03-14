import React from "react";
import { DataGrid, GridToolbar  } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const VerifyCertsTable = ({ rows, columns }) => {
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    const id = params.row.id; // Assuming your row object has an 'id' field
    // navigate(`/manager/verify-certificates/approval/${id}`);
    navigate(`/manager/verify-certificates/approval/${id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <style>
        {`
          .MuiDataGrid-row:hover {
            background-color: #f0f0f0;
            cursor: pointer;
          }
        `}
      </style>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
          // Row: Row,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={handleRowClick}
      />
    </div>
  );
};
export default VerifyCertsTable;
