import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useChartData } from "../../../context/ChartDataProvider";
import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";
import { Box } from "@mui/material";
import "./../../DataGridStyles.css";

// const useStyles = makeStyles(() => ({
//   highProgressRow: {
//     backgroundColor: 'var(--mauve-light)', // Change this to your desired color
//   },
//   lowProgressRow: {
//     backgroundColor: 'var(--blue-light)', // Change this to your desired color
//   },
//   normal: {
//     backgroundColor: 'white'
//   }
// }));

const DataTable = ({ onRowClick }) => {
  const { allData } = useChartData();
  // const classes = useStyles();

  const columns = [
    {
      field: "Units",
      headerName: "Units",
      headerClassName: "header",
    },
    { field: "Mines", headerName: "Mines", flex: 1, headerClassName: "header", },
    { field: "Task", headerName: "Task", flex: 1, headerClassName: "header", },
    { field: "Contractors", headerName: "Contractors", flex: 1, headerClassName: "header", },
    // { field: "StartDate", headerName: "StartDate", flex: 1, headerClassName: "header", },
    { field: "Duration", headerName: "Duration", flex: 1, headerClassName: "header", },
    // { field: "EndDate", headerName: "EndDate", flex: 1, headerClassName: "header", },
    { field: "DaysCompleted", headerName: "DaysCompleted", flex: 1, headerClassName: "header", },
    { field: "Progress", headerName: "Progress", flex: 1, headerClassName: "header", },
  ];

  // const getRowClassName = (params) => {
  //   const prg = parseInt(params.row.Progress.substring(-1))
  //   if (prg === 100) {
  //     return classes.highProgressRow;
  //   } else if (prg === 0) {
  //     return classes.lowProgressRow;
  //   }
  //   return classes.normal; // Default row color
  // };

  const handleDataDownload = () => {
    const data = allData.map((item) => ({
      id: item.id,
      Units: item.Units,
      Mines: item.Mines,
      Task: item.Task,
      Contractors: item.Contractors,
      StartDate: item["StartDate"],
      Duration: item.Duration,
      EndDate: item["EndDate"],
      DaysCompleted: item["DaysCompleted"],
      Progress: item.Progress,
      Budget: item.Budget,
      Actual: item.Actual,
      Remaining: item.Remaining,
    }));

    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, "filename");
    } else {
      link.href = URL.createObjectURL(blob);
      link.download = `Patients_data_${uuidv4()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="dataTable">
      <Box 
        sx={{ 
          marginTop: '20px', 
          '& .header': {
            backgroundColor: 'var(--color-lightpurple)',
          }, 
          boxShadow: '0px 7px 10px 3px rgba(0,0,0,0.10)'
        }}>
        {/* <DataGrid
          sx={{ background: "white" }}
          autoHeight
          getRowId={(row) => row.id}
          rows={allData}
          columns={columns}
          // getRowClassName={getRowClassName}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          rowHeight={45}
          onRowClick={onRowClick}
        /> */}
      </Box>

      <div className="downLoadDataSection">
        <button className="saveBtn" onClick={handleDataDownload}>
          Download Data
        </button>
      </div>
    </div>
  );
};

export default DataTable;
