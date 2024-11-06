import React from "react";
import HorizontalBar from "../../HorizontalBar";
import { RadialBar } from "../../RadialBar";
import { useChartData } from "../../../context/ChartDataProvider";
import { Divider } from "@mui/material";
// import { AlertMessage } from "../../AlertMessage";

const stringToInt = (str) => parseInt(str.substring(3).replaceAll(",", ""));
// parseInt(str.replaceAll(",|?|$|' '", ""))

export const TaskDetails = () => {
  const { mineData } = useChartData();
  // const budget = mineData ? stringToInt(mineData.Budget) : 0;
  // const actual = mineData ? stringToInt(mineData.Actual) : 0;

  const data = mineData && mineData[0] ? mineData[0] : null;

  return (
    <div
      className="taskDetails rounded-xl p-4 font-bold text-gray-500 w-full text-left bg-white"
      style={{
        marginRight: "0.5rem",
        marginBottom: "0.5rem",
        // backgroundColor: "#e3e3e3",
      }}
    >
      {data && (
        <div className="details px-6">
          <h2 className="text-center label" style={{ fontSize: "22px" }}>
            Project Details
          </h2>
          <div className="info pt-4">
            <div>
              <span className="label">Unit: </span>
              <span className="val">{data.Units}</span>
            </div>
            <div>
              <span className="label">Mine: </span>
              <span className="val">{data.Mines}</span>
            </div>
            <div>
              <span className="label">Contractor: </span>
              <span className="val">{data.Contractors}</span>
            </div>

            <p className="separator" />

            <div>
              <span className="label">Issue of LOI: </span>
              <span className="val">{data.LOI}</span>
            </div>
            <div>
              <span className="label">Mobilisation: </span>
              <span className="val">{data.Mobilisation}</span>
            </div>
            <div>
              <span className="label">Start Date: </span>
              <span className="val">{data.StartDate}</span>
            </div>
            <div>
              <span className="label">Finish Date: </span>
              <span className="val">{data.EndDate}</span>
            </div>

            <p className="separator" />

            <div>
              <span className="label">Actual Start Date: </span>
              <span className="val">{data.ActualStart}</span>
            </div>
            <div>
              <span className="label">Actual End Date: </span>
              <span className="val">{data.ActualEnd}</span>
            </div>

            <p className="separator" />

            <div>
              <span className="label">Date: </span>
              <span className="val">{data.today}</span>
            </div>
            <div>
              <span className="label">Target %: </span>
              <span className="val">{Math.round(data.Target_percentage*100)}%</span>
            </div> 
            <div>
              <span className="label">Achieved %: </span>
              <span className="val" style={{color: "var(--color-theme-grey)"}}>{parseInt(data.Progress*100)}%</span>
            </div>  

          </div>
        </div>
      )}
    </div>
  );
};
