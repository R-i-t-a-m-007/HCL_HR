import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function EmployeeStatus({ data }) {
  return (
    <Box className="flex">
      {/* <Card className='shadow-custom-shadow hover:text-white  hover:bg-deepblue max-w-sm' sx={{borderRadius:3,width:300,height:130}}> */}
      <Card
        className="shadow-custom-shadow max-w-sm"
        sx={{ borderRadius: 3, width: "19.5rem", height: 130 }}
      >
        <CardContent>
          <Typography
            className="text-center text-deepblue font-bold text-sm"
            color="text.secondary"
            gutterBottom
          >
            {data.label}
          </Typography>

          <Box className="flex" sx={{ justifyContent: "space-around" }}>
            {data.sub.map((subData, i) => (
              <React.Fragment key={i}>
                <Box className="mt-5 ">
                  <Typography
                    className="text-deepblue font-bold text-xs pb-1"
                    color="text.secondary"
                  >
                    {subData.label}
                  </Typography>
                  {/* <Typography  className='text-deepblue font-medium text-2xl'  color="text.secondary">
                    {subData.val}
                  </Typography> */}
                  <div className="text-2xl font-semibold text-deepblue">{subData.val}</div>
                </Box>
                {data.sub.length !== i + 1 && (
                  <Divider
                    className="divide-y-6  border-gray-400 border"
                    orientation="vertical"
                    variant="middle"
                    flexItem
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
