import React from "react";
import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import "./ganttStyles.css";
import { useChartData } from "../../context/ChartDataProvider";

const TaskListTable = ({ tasks, rowWidth, rowHeight, onExpanderClick }) => {
  return (
    <div style={{ border: "1px solid #dfe1e5" }}>
      {tasks.map((item, i) => {
        return (
          <div
            key={item.id}
            style={{
              height: rowHeight,
              width: 401,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "auto",
              fontFamily: "sans-serif",
              background: i % 2 === 0 ? "#e3e3e3" : "#f4f5f7",
              padding: 10,
              paddingLeft: 40,
              fontSize: 15
            }}
          >
            <p
              onClick={() => onExpanderClick(item)}
              style={{
                minWidth: 400,
                display: "flex",
                alignItems: "center",
                margin: 0,
              }}
            >
              <span style={{ minWidth: "45px" }}>
                {item.sl}
              </span>
              {item.task}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const parseDate = (dateString) => {

  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return null; // Handle invalid format
  }
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed
  const day = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  if (isNaN(date.getTime())) {
    return null; // Handle invalid date values
  }

  return date;
};

// Helper function to check if a date is valid
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

// Init
const Chart = () => {
  const { mineData } = useChartData();

  // Format data for the Gantt chart
  const formattedTasks = mineData
    .map((task, idx) => {
      const startDate = parseDate(task.StartDate);
      const endDate = parseDate(task.EndDate);

      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        console.error("Invalid date format:", task.StartDate, task.EndDate);
        return null;
      }

      return {
        start: startDate,
        end: endDate,
        task: task.Task,
        name: `Completed - ${parseInt(task.Progress*100, 10)}%`,
        id: task.Task,
        progress: parseInt(task.Progress*100, 10),
        type: "task",
        hideChildren: false,
        displayOrder: idx + 1,
        sl: task.Sl,
        styles: { progressColor: '#153373', progressSelectedColor: '#ff9e0d' },
      };
    })
    .filter(Boolean);
  // const [view, setView] = React.useState(ViewMode.Day);
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 100;

  const handleClick = (task) => {
    
  };

  const handleSelect = (task, isSelected) => {
  };

  return (
    <div className="Wrapper rounded-xl">
      {formattedTasks.length > 0 && (
        <Gantt
          tasks={formattedTasks}
          viewMode={"Month"}
          // onClick={handleClick}
          // onSelect={handleSelect}
          listCellWidth={isChecked ? "295px" : ""}
          columnWidth={columnWidth}
          rowHeight={40}
          todayColor="var(--blue)"
          timeStep={100}
          TaskListHeader={({ headerHeight }) => (
            <div
              style={{
                height: headerHeight,
                fontFamily: "sans-serif",
                fontWeight: "bold",
                paddingLeft: 40,
                margin: 0,
                marginBottom: -1,
                display: "flex",
                alignItems: "center",
                background: "white",
                border: "1px solid rgb(223, 225, 229)"
              }}
              className="text-gray-500"
            >
              <div style={{ minWidth: 45 }}>
                Sl
              </div>
              <div>
                Tasks
              </div>
            </div>
          )}
          TaskListTable={(props) => 
          <TaskListTable 
            {...props} 
          />
          }
          
        />
      )}
    </div>
  );
};

export default Chart;
