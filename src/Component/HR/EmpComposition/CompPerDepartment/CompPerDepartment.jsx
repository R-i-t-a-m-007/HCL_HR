import React, { useState } from "react";
import { CustomBarChart } from "../../../Charts/CustomBarChart";
import { CustomDropdown } from "../../../CustomDropdown";
import { useChartData } from "../../../../context/ChartDataProvider";
import { Label } from "../../../Label";
import { useHRData } from "../../../../context/HRDataProvider";
import { CustomCard } from "../../Layout/CustomCard.jsx";

const UNITS = ["H.O.", "ICC", "MCP", "KCC", "Cadre"];

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, name, value } = props;
  // console.log(props)
  const radius = 10;

  return (
    <g>
      {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" /> */}
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export const CompPerDepartment = () => {
  const { departmentCount } = useHRData();

  const getDepartmentData = (unit) =>
    Object.keys(departmentCount[unit]).map((department) => ({
      name: department,
      male: departmentCount[unit][department],
    }));

  const data = {
    "H.O.": getDepartmentData("HO"),
    ICC: getDepartmentData("ICC"),
    KCC: getDepartmentData("KCC"),
    MCP: getDepartmentData("MCP"),
    Cadre: getDepartmentData("Cadre")
  };

  const xdata = {
    "H.O.": [
      {
        name: "Finance",
        male: 116,
      },
      {
        name: "HR",
        male: 30,
      },
      {
        name: "IT",
        male: 12,
      },
      {
        name: "Sales",
        male: 89,
      },
      {
        name: "Op.",
        male: 60,
      },
      {
        name: "M&C",
        male: 17,
      },
      {
        name: "Mines",
        male: 122,
      },
    ],
    ICC: [
      {
        name: "Finance",
        male: 95,
      },
      {
        name: "HR",
        male: 38,
      },
      {
        name: "IT",
        male: 19,
      },
      {
        name: "Sales",
        male: 109,
      },
      {
        // name: "Operation",
        name: "Op.",
        male: 54,
      },
      {
        name: "M&C",
        male: 21,
      },
      {
        name: "Mines",
        male: 98,
      },
    ],
    MCP: [
      {
        name: "Finance",
        male: 55,
      },
      {
        name: "HR",
        male: 41,
      },
      {
        name: "IT",
        male: 9,
      },
      {
        name: "Sales",
        male: 89,
      },
      {
        // name: "Operation",
        name: "Op.",
        male: 34,
      },
      {
        name: "M&C",
        male: 25,
      },
      {
        name: "Mines",
        male: 106,
      },
    ],
    KCC: [
      {
        name: "Finance",
        male: 75,
      },
      {
        name: "HR",
        male: 28,
      },
      {
        name: "IT",
        male: 162,
      },
      {
        name: "Sales",
        male: 105,
      },
      {
        name: "Op.",
        male: 17,
      },
      {
        name: "M&C",
        male: 19,
      },
      {
        name: "Mines",
        male: 126,
      },
    ],
  };

  const [selectedUnit, setSelectedUnit] = useState(UNITS[0]);
  return (
    <CustomCard width={26}>
      <Label>Employee Composition per Department</Label>
      <CustomDropdown
        className="minesDropdown shifts min-w-[74px_!important] py-[6px_!important]"
        value={selectedUnit}
        setter={setSelectedUnit}
        options={UNITS}
      />

      <CustomBarChart
        data={data[selectedUnit]}
        customizedLabel={renderCustomizedLabel}
        size={{ w: 250, h: 200 }}
        legend={false}
        className="pt-8"
      />
    </CustomCard>
  );
};
