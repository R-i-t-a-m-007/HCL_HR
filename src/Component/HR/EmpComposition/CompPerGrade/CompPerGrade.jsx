import React, { useEffect, useState } from "react";
import { useChartData } from "../../../../context/ChartDataProvider";
import { NestedDropdown } from "../../../NestedDropdown";
import { StackedBarChart } from "../../../Charts/StackedBarChart";
import { Label } from "../../../Label";
import { useHRData } from "../../../../context/HRDataProvider";
import { CustomCard } from "../../Layout/CustomCard";

export const CompPerGrade = () => {
  const { HR_POSITIONS } = useChartData();
  const [selectedPosition, setSelectedPosition] = useState(
    HR_POSITIONS[0].name
  );

  const { empCountByCategory } = useHRData();

  const data = Object.keys(empCountByCategory[selectedPosition]).map((key) => ({
    name: key,
    male: empCountByCategory[selectedPosition][key].male,
    female: empCountByCategory[selectedPosition][key].female,

  }))
  const verticalChartColors = ["#002060", "#FFA800"];

  const StackedBarChartData = {
    series: [
      {
        name: "Male",
        data: data.map((d) => d.male),
      },
      {
        name: "Female",
        data: data.map((d) => d.female),
      },
    ],
    options: {
      chart: {
        type: "bar",
        width: "99%",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            total: {
              enabled: false,
            },
          },
          barHeight: "50%"
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: data.map((d) => d.name),
        labels: {
          show: true,
          style: {
            fontWeight: 900,
          },
        },
        axisBorder: {
          show: true, // This line hides the x-axis line
        },
        tickAmount: data.length, // This removes major ticks
        axisTicks: {
          show: false, // This removes minor ticks if any
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        title: {
          text: undefined,
        },
      },
      fill: {
        opacity: 1,
        colors: verticalChartColors,
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 40,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: verticalChartColors,
          // radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
      },
    },
  };

  return (
    <CustomCard width={32}>
      <Label>Employee Composition per Grade</Label>
      <div className="absolute right-7">
        <NestedDropdown
          className="minesDropdown shifts min-w-[113px_!important] right-0"
          value={selectedPosition}
          setter={setSelectedPosition}
          options={HR_POSITIONS}
        />
      </div>
      <StackedBarChart data={StackedBarChartData} />
    </CustomCard>
  );
};