import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ChartDataProvider from "./context/ChartDataProvider";
import { StyledEngineProvider } from "@mui/material";
import { HRDataProvider } from "./context/HRDataProvider";
import { UserDataProvider } from "./context/UserDataProvider";
import { ExplorationDataProvider } from "./context/ExplorationDataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <UserDataProvider>
        <ChartDataProvider>
          <HRDataProvider>
            <ExplorationDataProvider>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </ExplorationDataProvider>
          </HRDataProvider>
        </ChartDataProvider>
      </UserDataProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
