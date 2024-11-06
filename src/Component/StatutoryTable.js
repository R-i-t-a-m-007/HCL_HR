import * as React from "react";

const DataTable = ({ data }) => {
  const mineData = data ? data : {};


  return (
    <div
      className="grid grid-cols-5 gap-4 mt-2 ml-64 mr-8 p-6 rounded-3xl"
      style={{ backgroundColor: "#153373" }}
    >
      {mineData &&
        Object.keys(mineData).map((key, index) => (
          <div key={index}>
            <p
              className="font-semibold text-md"
              style={{
                color: "#e3e3e3",
                fontWeight: 900,
                textTransform: "capitalize",
              }}
            >
              {key}
            </p>
            <p
              className="font-semibold text-xl"
              style={{
                color: key.toString().includes("alert_type")
                  ? mineData[key].toString().startsWith("EXPIRED")
                    ? "red"
                    : mineData[key].toString().startsWith("EXPIRING SOON")
                    ? "yellow"
                    : "#59e759"
                  : "var(--blue)",
                  fontWeight: key.toString().includes("alert_type") ? 900 : "unset"
              }}
            >
              {mineData[key]}
            </p>
          </div>
        ))}
    </div>
  );
};

export default DataTable;
