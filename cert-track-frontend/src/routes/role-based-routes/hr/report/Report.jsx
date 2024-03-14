import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Axios from "axios";

export default function CustomizedDataGrid() {
  const [data, setData] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/api/employee/");
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "Firstname", flex: 1 },
    { field: "lastName", headerName: "Lastname", flex: 1 },
    { field: "organizationFull", headerName: "Department", flex: 1 },
    {
      field: "ownList",
      headerName: "Amount",
      flex: 1,
      valueGetter: (params) => params.row.ownList.length,
    },
    { field: "totalAmount", headerName: "Total Amount", flex: 1 },
    { field: "importDate", headerName: "Date", flex: 1 },
  ];

  const rows = data.map((item, index) => ({
    id: index + 1,
    ownList: item.ownList, // สามารถเพิ่ม properties อื่น ๆ ตามต้องการ
  }));

  const handleFilterData = () => {
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM");
      const filteredRows = data.filter((row) => {
        const rowDate = dayjs(row.importDate).format("YYYY-MM");
        return rowDate === formattedDate;
      });
      setFilteredData(filteredRows);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div>
      <Paper style={{ marginBottom: "1rem" }}>
        <div
          style={{
            textAlign: "center",
            padding: "1rem 0",
          }}
        >
          <h1>Report</h1>
        </div>
        <div style={{ padding: "1rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              label="Select Month and Year"
              value={selectedMonthYear}
              onChange={(newValue) =>
                setSelectedMonthYear(newValue?.format("YYYY-MM"))
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            style={{ padding: "1rem" }}
          >
            <Button variant="contained" onClick={handleFilterData}>
              Submit
            </Button>
          </Stack>
        </div>
        <div style={{ overflowX: "auto" }}>
          <DataGrid
            autoHeight
            components={{
              Toolbar: GridToolbar,
            }}
            columns={columns}
            rows={filteredData}
            rowHeight={40}
          />
        </div>
      </Paper>
    </div>
  );
}
