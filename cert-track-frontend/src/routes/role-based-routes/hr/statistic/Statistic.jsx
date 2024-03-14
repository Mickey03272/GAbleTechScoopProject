import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Axios from "axios";

export default function PieActiveArc() {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get("http://localhost:8080/api/employee/");
        console.log(response.data);
        const mappedData = response.data.map((item) => ({
          id: item.id,
          label: item.organizationFull,
          value: item.totalEmployees,
        }));
        setChartData(mappedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Stat for each Department
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Start Year"
            views={["year"]}
            renderInput={(props) => <TextField {...props} />}
            style={{ marginRight: "10px", color: "black" }} // Adjust margin for spacing
          />
          <DatePicker
            label="End Year"
            views={["year"]}
            renderInput={(props) => <TextField {...props} />}
            style={{ marginLeft: "10px" }} // Adjust margin for spacing
          />
        </DemoContainer>
      </LocalizationProvider>
      <br />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        style={{ padding: "1rem" }}
      >
        <LoadingButton loading={isLoading} variant="contained">
          Search
        </LoadingButton>
      </Stack>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={700}
      />
    </Box>
  );
}
