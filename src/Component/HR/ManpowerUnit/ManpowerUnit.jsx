import React, { useState } from "react";
import { CustomBarChart } from "../../Charts/CustomBarChart";
import { useChartData } from "../../../context/ChartDataProvider";
import DatePicker from "react-datepicker";
import Card from "@mui/material/Card";

import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../../Label";
import { CustomDropdown } from "../../CustomDropdown";

const data = {
  ICC: {
    "8am - 4pm": [
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Mining Eng.", male: 910, female: 250 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Mining Res.", male: 1205, female: 501 },
    ],
    "12am - 8pm": [
      { name: "Mining Res.", male: 1205, female: 501 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Mining Eng.", male: 910, female: 250 },
    ],
    "8pm - 4am": [
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "Mining Res.", male: 1205, female: 501 },
      { name: "Mining Eng.", male: 910, female: 250 },
    ],
  },
  KCC: {
    "8am - 4pm": [
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Mining Eng.", male: 910, female: 250 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Mining Res.", male: 1205, female: 501 },
    ],
    "12am - 8pm": [
      { name: "Mining Res.", male: 1205, female: 501 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Mining Eng.", male: 910, female: 250 },
    ],
    "8pm - 4am": [
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "Mining Res.", male: 1205, female: 501 },
      { name: "Mining Eng.", male: 910, female: 250 },
    ],
  },
  MCP: {
    "8am - 4pm": [
      { name: "Network Eng.", male: 496, female: 250 },  // Order changed
      { name: "Drilling Eng.", male: 380, female: 140 },  // Order changed
      { name: "Mining Eng.", male: 910, female: 250 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Mining Res.", male: 1205, female: 501 },
    ],
    "12am - 8pm": [
      { name: "Mining Res.", male: 1205, female: 501 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Mining Eng.", male: 910, female: 250 },
    ],
    "8pm - 4am": [
      { name: "IT Analyst", male: 899, female: 560 },
      { name: "Network Eng.", male: 496, female: 250 },
      { name: "Drilling Eng.", male: 380, female: 140 },
      { name: "DB Admin", male: 591, female: 100 },
      { name: "Mining Res.", male: 1205, female: 501 },
      { name: "Mining Eng.", male: 910, female: 250 },
    ],
  }
};

export const ManpowerUnit = ({ unit }) => {
  const { SHIFTS } = useChartData();
  const [startDate, setStartDate] = useState(new Date());

  const [selectedShift, setSelectedShift] = useState(SHIFTS[0]);
  return (
    // <div className="bg-white w-[45rem] h-80 mt-3 rounded-xl py-2 px-4">
    <Card className="w-[45rem] p-3 relative shadow-custom-shadow rounded-xl">
      <Label>Manpower as per Unit</Label>
      <div className="dropdowns flex gap-1">
        <CustomDropdown
          className="minesDropdown shifts w-[125px_!important] py-[6px_!important]"
          value={selectedShift}
          setter={setSelectedShift}
          options={SHIFTS}
        />
        <div className="absolute right-36">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>

      <CustomBarChart
        data={data[unit][selectedShift]}
        barCount={2}
        size={{ w: 250, h: 100 }}
        className="pt-10"
        height="80%"
      />
    </Card>
  );
};
