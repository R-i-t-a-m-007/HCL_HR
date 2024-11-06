import React from "react";
import { Charts } from "./Charts";
import { ContractDetails } from "./ContractDetails";
import { TaskDetails } from "./TaskDetails";
import styled from "styled-components";

const DetailsSection = styled.div`
  display: flex;
  width: 100%;
`

export const Statistics = () => {

  return (
    <div className="statistics flex">
      <Charts />
      <DetailsSection>
        <TaskDetails />
        <ContractDetails />
      </DetailsSection>
    </div>
  );
};
