import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { Container, Grid, Typography, Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function Import() {
  const [jsonData, setJsonData] = useState([]);
  const [jsonEmployee, setJsonEmployee] = useState([]);
  const [jsonUser, setJsonUser] = useState([]);

  // ? why needed import date column?

  function onStart(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const fileInput = event.target.querySelector('input[type="file"]');

    // Check if fileInput is null or undefined
    if (!fileInput) {
      return;
    }

    const file = fileInput.files[0];

    // Check if a file was selected
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const csvData = e.target.result;
        // Parse the CSV data using papaparse
        Papa.parse(csvData, {
          complete: function (results) {
            const [keys, ...values] = results.data;

            // Check if there is data to send
            if (values.length === 0) {
              alert("No data found in the file!");
              return;
            }

            // Use for display table for recheck
            const jsonData = values.map((value) => {
              const dateParts = value[keys.indexOf("importDate")].split("/");
              const importDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
            
              // Format the import date to exclude the time (hours)
              // const formattedImportDate = new Date(importDate.getFullYear(), importDate.getMonth(), importDate.getDate());
              const filteredImportDate = importDate.toISOString().split('T');

              return {
                firstName: value[keys.indexOf("first_name")],
                lastName: value[keys.indexOf("last_name")],
                employeeID: value[keys.indexOf("employee_id")],
                importDate: filteredImportDate[0],
                // importDate: importDate.toISOString(),
                // importDate: formattedImportDate.toISOString().split("T")[0], // Convert to ISO format and exclude time
                organizationId: parseInt(value[keys.indexOf("organization_id")]),
                username: value[keys.indexOf("username")],
                email: value[keys.indexOf("email")],
                password: value[keys.indexOf("password")],
                roles: value[keys.indexOf("roles")],
              };
            });
            
            

            const jsonEmployee = values.map((value) => {
              return {
                firstName: value[keys.indexOf("first_name")],
                lastName: value[keys.indexOf("last_name")],
                employeeID: value[keys.indexOf("employee_id")],
                importDate: value[keys.indexOf("import_date")],
                organization: {
                  id: parseInt(value[keys.indexOf("organization_id")]),
                },
                user: null,
              };
            });

            const jsonUser = values.map((value) => {
              return {
                username: value[keys.indexOf("username")],
                email: value[keys.indexOf("email")],
                password: value[keys.indexOf("password")],
              };
            });

            // Remove the last element if it's an empty object
            if (
              Object.keys(jsonEmployee[jsonEmployee.length - 1]).length === 0
            ) {
              jsonEmployee.pop();
            }

            // Convert JSON data to string for logging
            const jsonStringEmployee = JSON.stringify(jsonEmployee);
            const jsonStringUser = JSON.stringify(jsonUser);
            const jsonStringData = JSON.stringify(jsonData);
            console.log(jsonStringEmployee);
            console.log(jsonStringUser);
            console.log(jsonStringData);

            // Set jsonData state
            setJsonEmployee(jsonEmployee);
            setJsonUser(jsonUser);
            setJsonData(jsonData);
          },
        });
      };

      reader.readAsText(file);
    } else {
      alert("Please select a file!");
    }
  }

  function onSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if jsonData is empty
    if (jsonData.length === 0) {
      alert("No data to submit!");
      return;
    }

    // Send data to the server
    axios
      .post("http://localhost:8080/api/employee/addall", {
        employees: jsonEmployee,
        users: jsonUser,
      })
      .then((response) => {
        alert("Data has been updated!");
        console.log("Data sent successfully:", response);
        // Handle success if needed
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        // Handle error if needed
      });
  }

  // Use for DataGrid
  const columns = [
    {
      field: "employeeID",
      headerName: "Employee ID",
      width: 120,
      align: "center",
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      align: "center",
    },
    { field: "lastName", headerName: "Last Name", width: 150, align: "center" },
    {
      field: "importDate",
      headerName: "Import Date",
      type: "Date",
      width: 150,
      align: "center",
    },
    { field: "username", headerName: "Username", width: 150, align: "center" },
    { field: "email", headerName: "Email", width: 150, align: "center" },
    { field: "password", headerName: "Password", width: 150, align: "center" },
    {
      field: "organizationId",
      headerName: "Organization ID",
      type: "number",
      width: 120,
      align: "center",
    },
  ];

  const rows = jsonData.map((data, index) => ({
    id: index + 1,
    ...data,
    // importDate: data.importDate,
  }));

  return (
    <Container>
      <Grid
        container
        item
        xs={12}
        textAlign="center"
        spacing={4}
        justifyContent="center"
        mt={1}
      >
        <Typography variant="h3" align="center" color="orange">
          Import file
        </Typography>
      </Grid>

      <form onSubmit={onStart}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="left"
              color="black"
              fontWeight="bold"
              mt={2}
            >
              Choose CSV file for import user
            </Typography>
            <Input
              type="file"
              onChange={onStart}
              inputProps={{
                accept: ".csv",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
            >
              Create preview table
            </Button>
          </Grid>
        </Grid>
      </form>

      {jsonData.length > 0 && (
        <Box sx={{ height: 650, width: "100%" }} mt={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
          <Grid item xs={12}>
            <Typography variant="h6" align="left" color="orange" mt={2} mb={2}>
              Please check all employees are correct before submitting.
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onSubmit}
              type="submit"
              px={10}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
