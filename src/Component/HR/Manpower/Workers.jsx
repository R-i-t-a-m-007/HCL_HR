import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import ReactApexChart from "react-apexcharts";
import PieChart from "../../Charts/PieChart";

const COLORS = [" #002060 ", "#ffc000 "];
const TEXT_COLORS = ["#ffc000 ", " #002060 "];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (radius - 7) * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={TEXT_COLORS[index % TEXT_COLORS.length]}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const Workers = ({ data }) => {
  const chartData = [
    { name: "Male", value: data.Male },
    { name: "Female", value: data.Female },
  ];
  return (
    <>
      <Box className=" w-[20rem] h-[12rem]">
        <CardContent>
          <Typography className="text-deepblue font-semibold">
            {data.label}
          </Typography>
          <Box className="flex justify-between mt-2 ">
            <Card className="bg-deepblue  h-32 w-32 text-center ">
              {["Male", "Female", "Total"].map((category) => (
                <div
                  className="flex justify-between font-medium items-center mt-4 px-3"
                  key={category}
                >
                  <h6 className="text-white ">{category} :</h6>
                  <h6 className="text-yellow-400">{data[category]}</h6>
                </div>
              ))}
            </Card>
            <Card className="rounded-md h-32 w-36">
              <PieChart
                chartData={chartData}
                COLORS={COLORS}
                renderCustomizedLabel={renderCustomizedLabel}
              />
            </Card>
          </Box>
        </CardContent>
      </Box>
    </>
  );
};

export default Workers;
