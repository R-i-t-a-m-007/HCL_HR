import React from "react";

export const DateCard = ({latestEtlDate}) => {
  return (
    <div className="text-end mx-4">
      <div className="lastUpdateDate rounded-md">
        Last Updated Files on {latestEtlDate}
      </div>
    </div>
  );
};
