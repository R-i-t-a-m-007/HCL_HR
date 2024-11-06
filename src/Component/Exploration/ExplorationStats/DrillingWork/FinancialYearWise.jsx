import React, { useState } from "react";
import { Label } from "../../../Label";
import { CustomDropdown } from "../../../CustomDropdown";
import { SemiCircleBar } from "../../../SemiCircleBar";
import { ProgressBar } from "../../../Charts/ProgressBar";
import { PiTarget } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";
import BadgeGroup from "../../../BadgeGroup";
import { useChartData } from "../../../../context/ChartDataProvider";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useExplorationData } from "../../../../context/ExplorationDataProvider";
import { CustomCard } from "../../Layout/CustomCard";

export const FinancialYearWise = ({ data }) => {
  const {FINANCIAL_YEAR_LIST, physicalWorkSelectedFY, setPhysicalWorkSelectedFY, getFormattedAmount} = useExplorationData();
  const sym = '₹ '
  const badgeData = [
    {
      name: "Target",
      // val: `₹ ${sym} + ${data.target}`,
      val: (
        <span className="inline-flex gap-1">
          {" "}
          {sym}
          {getFormattedAmount(data.target)}
        </span>
      ),
      icon: <PiTarget />,
      color: "#153373",
    },
    {
      name: "Achieved",
      val: (
        <span className="inline-flex gap-1">
          {" "}
          {sym}
          {getFormattedAmount(data.achieved)}
        </span>
      ),
      icon: <BsPatchCheck />,
      color: "var(--mauve)",
      //   unit:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      //   <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      // </svg>
    },
    {
      name: "Gap",
      val: (
        <span className="inline-flex gap-1">
          {" "}
          {sym}
          {getFormattedAmount((data.target - data.achieved).toFixed(2))}
        </span>
      ),
      icon: null,
      color: null,
      //   unit:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      //   <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      // </svg>
    },
  ];

  if (badgeData[0].val > badgeData[1].val) {
    badgeData[2].icon = <AiFillCaretDown />;
    badgeData[2].color = "var(--color-red)";
  } else {
    badgeData[2].icon = <AiFillCaretUp />;
    badgeData[2].color = "green";
  }
  return (
    <CustomCard width={70}>
      <Label>Physical Work Done (FY)</Label>
      <div className="absolute right-0">
        <CustomDropdown
          className="minesDropdown shifts min-w-[74px_!important] py-[6px_!important]"
          value={physicalWorkSelectedFY}
          setter={setPhysicalWorkSelectedFY}
          options={FINANCIAL_YEAR_LIST}
        />
      </div>
      <ProgressBar
        label="Achieved"
        val={
          data.achieved && data.target && data.target > 0
            ? parseInt((data.achieved / data.target) * 100)
            : 0
        }
        fillColor={"var(--deepblue)"}
      />
      <div>
        <BadgeGroup data={badgeData} valFontSize={17} />
      </div>
    </CustomCard>
  );
};
