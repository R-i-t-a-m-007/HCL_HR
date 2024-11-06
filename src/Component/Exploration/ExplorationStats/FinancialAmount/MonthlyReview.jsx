import React, { useState } from "react";
import { Label } from "../../../Label";
import { CustomDropdown } from "../../../CustomDropdown";
import { SemiCircleBar } from "../../../SemiCircleBar";
import { ProgressBar } from "../../../Charts/ProgressBar";
import BadgeGroup from "../../../BadgeGroup";
import { PiTarget } from "react-icons/pi";
import { BsPatchCheck } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useExplorationData } from "../../../../context/ExplorationDataProvider";
import { CustomCard } from "../../Layout/CustomCard";


export const MonthlyReview = ({ data }) => {
  const {MONTHS, drillingStatusSelectedMonth, setDrillingStatusSelectedMonth} = useExplorationData();

  const unit = "m.";
  const badgeData = [
    {
      name: "Target",
      val: (
        <span className="inline-flex gap-1">
          {data.target} <span>{unit}</span>
        </span>
      ),
      icon: <PiTarget />,
      color: "#153373",
    },
    {
      name: "Achieved",
      val: (
        <span className="inline-flex gap-1">
          {data.achieved} <span>{unit}</span>
        </span>
      ),

      icon: <BsPatchCheck />,
      color: "var(--mauve)",
    },
    {
      name: "Gap",
      val: (
        <span className="inline-flex gap-1">
          {(data.target - data.achieved).toFixed(2)}<span>{unit}</span>
        </span>
      ),

      icon: null,
      color: null,
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
      <Label>Drilling Status</Label>
      <div className="absolute right-0">
        <CustomDropdown
          className="minesDropdown shifts min-w-[74px_!important] py-[6px_!important]"
          value={drillingStatusSelectedMonth}
          setter={setDrillingStatusSelectedMonth}
          options={MONTHS}
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
