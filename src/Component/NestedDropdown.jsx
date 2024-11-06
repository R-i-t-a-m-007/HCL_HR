import React from "react";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

export const NestedDropdown = ({
  options,
  value,
  setter
}) => {
  return (
    <Dropdown title={value} style={{ width: 113 }}>
      {options.map((opt) => (
        <React.Fragment key={opt.name}>
          {opt.type === "single" ? (
            <Dropdown.Item
              onClick={() => {
                setter(opt.name);
              }}
            >
              {opt.name}
            </Dropdown.Item>
          ) : (
            <Dropdown.Menu title={opt.name}>
              {opt.subOptions.map((subOpt) => (
                <Dropdown.Item
                  key={subOpt}
                  onClick={() => {
                    setter(subOpt);
                  }}
                >
                  {subOpt}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          )}
        </React.Fragment>
      ))}
    </Dropdown>
  );
};
