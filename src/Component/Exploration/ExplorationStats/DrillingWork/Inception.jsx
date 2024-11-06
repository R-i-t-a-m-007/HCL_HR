import React, { useEffect, useState } from "react";
import { Label } from "../../../Label";
import CustomLegend from "../../../CustomLegend";
import LineChartComponent from "../../../LineChart2";
import { useExplorationData } from "../../../../context/ExplorationDataProvider";
import { CustomCard } from "../../Layout/CustomCard";

export const Inception = () => {
  const { formattedPhysicalInceptionChartData, getFormattedAmount } =
    useExplorationData();
  // console.log('physicalWorkFromInception', physicalWorkFromInception)
  const chartData = formattedPhysicalInceptionChartData;

  // const chartData =
  //   physicalWorkFromInception.length > 0
  //     ? physicalWorkFromInception.map((status) =>  ({
  //       name: status.month,
  //       Target: status.target,
  //       Achieved: status.achieved,
  //     }))
  //     : [];

  const getAchievedPercentage = () => {
    let target = 0;
    let achieved = 0;
    chartData.forEach((data) => {
      target += data.Target;
      achieved += data.Achieved;
    });
    if (target > 0) {
      return getFormattedAmount(((achieved / target) * 100).toFixed(2));
    }
    return 0;
  };

  const [achievedPercentage, setAchievedPercentage] = useState(0);

  useEffect(() => {
    const data = getAchievedPercentage();
    setAchievedPercentage(data);
  }, [chartData]);

  return (
    <CustomCard>
      <Label>Physical Work status from Inception to till date</Label>

      <div className="ml-10">
        {chartData.length > 0 ? (
          <>
            <LineChartComponent data={chartData} />
            <div className="flex">
              <CustomLegend
                leg1={"Target"}
                leg2={"Achieved"}
                col1={"#153373"}
                col2={"#ffc000"}
                type={"inception"}
              />
              <div>
                <strong>Achieved - </strong><span className="font-semibold text-[#64A33F]">{achievedPercentage} %</span>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-base text-center pt-20">No data available</h2>
        )}
      </div>
    </CustomCard>
  );
};
