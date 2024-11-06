import React from "react";
import etlLogo from "../etlLogo.svg";
import { useNavigate } from "react-router-dom";

export const LogoContainer = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="logoContainer cursor-pointer" onClick={handleNavigate}>
      <div className="etlLogo m-auto" style={{ height: 60 }}>
        <img src={etlLogo} alt="etl" />
      </div>
      {/* <div>
        <img width={117} src="logo.png" alt="" />
      </div> */}
    </div>
  );
};
