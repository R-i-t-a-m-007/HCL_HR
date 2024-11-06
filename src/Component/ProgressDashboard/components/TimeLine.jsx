import React from "react";
import "./TimeLine.css";

const parseDate = (dateString) => {
  const [day, month] = dateString.split("/").map(Number);
  const year = 2023; // Assuming the year is 2023
  return new Date(year, month - 1, day);
};

const daysBetween = (fromDate, toDate) => {
  const date1 = parseDate(toDate);
  const date2 = parseDate(fromDate);

  // Calculate the difference in milliseconds
  const timeDifference = date1 - date2;

  // Convert the time difference to days
  return timeDifference / (1000 * 60 * 60 * 24);
};

export const TimeLine = ({ start, actualStart, end, actualEnd }) => {
  const totalDays = daysBetween(start, end);
  const getWidth = (date1, date2) => {
    const days = daysBetween(date1, date2);
    const percentage = parseInt((days / totalDays) * 100);
    return percentage;
  };
  const width1 = getWidth(start, actualStart);
  const width2 = getWidth(actualStart, end);
  const width3 = getWidth(end, actualEnd);

  return (
    <div className="timeLine">
      <div id="bar">
        <div
          id="a"
          style={{ width: `${width1}%`, backgroundColor: "var(--mauve)" }}
        >
            <div className="percentage">{width1}%</div>
          <div className="datePointer">{start}</div>
        </div>
        <div
          id="b"
          style={{ width: `${width2}%`, backgroundColor: "var(--blue)" }}
        >
            <div className="percentage">{width2}%</div>
          <div className="datePointer">{actualStart}</div>
        </div>
        <div
          id="c"
          style={{ width: `${width3}%`, backgroundColor: "var(--deepblue)" }}
        >
            <div className="percentage">{width3}%</div>
          <div className="datePointer">{end}</div>
        </div>
      </div>
      <div id="end"></div>
      <div className="dateRange">
        <div className="datePointer" style={{ right: 0 }}>
          {actualEnd}
        </div>
      </div>
    </div>
  );
};
