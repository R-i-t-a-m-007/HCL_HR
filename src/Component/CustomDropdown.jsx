import React from "react";

export const CustomDropdown = ({ options, value, setter, containerStyle, type="card", ...props }) => {

  return (
    <div className={`dropDown ${type === "card" && "absolute right-3"} text-black`} style={containerStyle}>
      <select
        {...props}
        value={value}
        onChange={(e) => setter(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
