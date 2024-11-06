import React from "react";
import ProgressChart2 from "./ProgressChart2";
import { AlertMessage } from "./AlertMessage";
import { CustomCard } from "./CustomCard";
import { Label } from "./Label";
import { Divider } from "@mui/material";

const params = ["target", "achieved", "gap"];

const UnitStatus = ({ type, data, options, val, valSetter }) => {
  const dropdownOptions = options;

  return (
    <CustomCard width={40}>
      <div className=" justify-center ml-20">
        <Label>MIC {type} Unit Production Status</Label>
        <div className="dropDown absolute right-[3.5rem]">
          <select
            name=""
            className="minesDropdown"
            value={val}
            onChange={(e) => valSetter(e.target.value)}
          >
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="charts flex justify-evenly mt-12">
          {data.map((item, idx) => (
            <div className="text-center mb-3" key={idx}>
              <h6>{item.unit}</h6>
              <ProgressChart2 target={item.target} actual={item.achieved} />
              <div className="flex ml-4 relative">
                <div className="params">
                  {params.map((p, idx) => (
                    <div key={idx} className="param flex gap-3">
                      <div className="label text-black min-w-[56px] text-left">
                        {p.charAt(0).toUpperCase() + p.substring(1)}
                      </div>

                      <div className="val font-semibold text-black">
                        {item[p]}
                      </div>
                    </div>
                  ))}{" "}
                </div>
                {params.length !== idx + 1 && (
                  <div style={{ background: "#A1ACC4", width: 2, height: 57,marginLeft:"15px"}} className="absolute right-[-38px]">
                    <Divider orientation="vertical" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AlertMessage>No data available</AlertMessage>
      )}
    </CustomCard>
  );
};

export default UnitStatus;
