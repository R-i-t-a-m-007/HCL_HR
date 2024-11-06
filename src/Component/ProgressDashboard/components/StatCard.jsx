import React from "react";

export const StatCard = ({ label, children }) => {
  return (
    <div 
        className="statCard bg-white rounded-xl p-4 font-bold text-gray-500 text-center relative"
        style={{ maxHeight: "274px", minHeight: "240px", width: "100%", marginBottom: "0.5rem", fontSize:"22px" }}
    >
      <p className="text-center label" style={!label ? {opacity: 0} : null}>{label ? label : "Empty"}</p>
      {children}
    </div>
  );
};
