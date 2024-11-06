import React from "react";
import { RadialChart } from "../../../Charts/RadialChart";
import { VerticalKeyVal } from "../../../Legends/VerticalKeyVal";
import { Label } from "../../../Label";
import { CustomCard } from "../../Layout/CustomCard.jsx";
import { useHRData } from "../../../../context/HRDataProvider";
import { Divider } from "@mui/material";

const radialChartColors = ["#002060", "#FFA800", "#64A33F", "#909195"];

export const CompPerPosition = () => {
  const {
    positionCount: { junior = 0, senior = 0, intermediate = 0, trainee = 0 },
  } = useHRData();

  const total = junior + senior + intermediate + trainee;

  const radialChartData = [
    { name: "Senior", value: parseInt(senior/total*100) },
    { name: "Intermediate", value: parseInt(intermediate/total*100) },
    { name: "Junior", value: parseInt(junior/total*100) },
    { name: "Trainee", value: parseInt(trainee/total*100) },
  ];
  return (
    <CustomCard width={20}>
      <Label>Employee Composition per Position</Label>
      <div className="flex radialBar w-full h-[16.3rem] items-center">
        <RadialChart data={radialChartData} COLORS={radialChartColors} />
        <VerticalKeyVal data={radialChartData} COLORS={radialChartColors} />
      </div>

      <div className="flex justify-left">
        {/* <div className="radialBar w-[22rem] flex items-center">
          <RadialChart data={radialChartData} COLORS={radialChartColors} />
          <VerticalKeyVal data={radialChartData} COLORS={radialChartColors} />
        </div> */}
        <div className="bg-[#00000021] w-[2px] mx-1 my-5 ml-5">
          <Divider orientation="vertical" />
        </div>
        {/* <div className="radialBar w-[22rem] flex items-center">
          <VerticalBarChart data={verticalBarChartData} />
        </div> */}
      </div>
    </CustomCard>
  );
};
