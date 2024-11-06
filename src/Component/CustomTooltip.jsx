import React from 'react'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p>{`Month: ${monthNames[label - 1]}`}</p>
            <p>{`${payload[0].name}: ${payload[0].value}`}</p>
          </div>
        );
      }
    
      return null;
}
