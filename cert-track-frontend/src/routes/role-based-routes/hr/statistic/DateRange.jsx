import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

export default function DateRange() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Start Year"
          views={["year"]}
          renderInput={(props) => <TextField {...props} />}
          style={{ marginRight: "10px" }} // Adjust margin for spacing
        />
        <DatePicker
          label="End Year"
          views={["year"]}
          renderInput={(props) => <TextField {...props} />}
          style={{ marginLeft: "10px" }} // Adjust margin for spacing
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
