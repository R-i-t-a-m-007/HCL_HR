import React from "react";

export const Label = ({ children, ...props }) => {
  return (
    <p className="text-center font-bold pb-6 text-black absolute left-0 right-0 text-[12.5px]" {...props}>
      {children}
    </p>
  );
};
