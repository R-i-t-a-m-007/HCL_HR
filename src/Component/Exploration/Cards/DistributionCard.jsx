import { Divider } from "@mui/material";
import React, { Fragment, useState } from "react";
import numWords from "num-words";
import { CustomDropdown } from "../../CustomDropdown";
export const DistributionCard = ({ data, width = "17.5", showSvg }) => {
  const [filter, setFilter] = useState(() =>
    data.dropdown && data.dropdown._options ? data.dropdown._options[0] : null
  );
  const sym = "₹ ";

  return (
    <div
      className={`distributionCard w-[${width}rem] h-[8rem] mt-3 flex-row py-3 px-8 rounded-xl cursor-pointer bg-white text-[#002060] shadow-[4px_9px_10px_0px_rgba(0,0,0,0.13)] hover:bg-[#002060] hover:text-white`}
    >
      <div className="flex pb-3 justify-between items-center">
        <div className="font-medium">{data.label}</div>
        <div className="total font-semibold text-[#64A33F] text-[1.3rem]">
          {data.total}
        </div>
        {filter && (
          <CustomDropdown
            options={data.dropdown._options}
            value={data.dropdown.value}
            setter={data.dropdown.setter}
            type="normal"
            className="bg-[#f7f7fa] rounded-md px-4 py-1 outline-none hover:text-[#002060]"
          />
        )}
      </div>

      <div className="category flex justify-between">
        {data.sub.map((subData, idx) => {
          return (
            <Fragment key={subData.label}>
              <div className="flex-col">
                <div className="text-sm font-medium pb-1 pl-1">
                  {subData.label}
                </div>
                <div className="flex items-center gap-1">
                  {/* Display SVG if showSvg is true */}
                  {showSvg && <p>{sym}</p>}

                  {/* Convert numeric value to words and display as tooltip */}
                  <div
                    className="text-xl font-semibold"
                    title={numWords(subData.val)}
                  >
                    {subData.val}
                  </div>
                </div>
              </div>
              {/* Add divider if not the last item */}
              {data.sub.length !== idx + 1 && (
                <div style={{ background: "#A1ACC4", width: 2 }}>
                  <Divider orientation="vertical" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
