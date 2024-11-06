import React from 'react';
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressChart2 = ({ target, actual }) => {
  const targetPercentage = (actual / target) * 100;
  const progressBarHeight = 50;

  return (
    <div style={{width: 60, height: 80, margin: "auto"}}>
        <CircularProgressbarWithChildren

          height={progressBarHeight}
          value={target}
          strokeWidth={10}
          styles={buildStyles({
            // pathColor: 'rgb(88 28 135)',
            pathColor: 'var(--color-theme-grey)', 
            trailColor: 'transparent',
          })}
        >
          <div style={{ height:'50', width: 60 }}>
            <CircularProgressbar
              value={targetPercentage}
              text={`${targetPercentage.toFixed(0)}%`} 
              styles={buildStyles({
                // pathColor: '#067185',
                pathColor: 'var(--deepblue)',
                trailColor: 'transparent',
                textSize:"25px",
                textColor: "var(--deepblue)"
              })}
            />
          </div>
        </CircularProgressbarWithChildren>
    </div>
    
  );
};

export default ProgressChart2;
