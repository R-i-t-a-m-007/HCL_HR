import React from 'react';
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TwoSeriesProgressChart = ({ target, actual }) => {
  const targetPercentage = ((actual + target) > 0) ? ((actual / target) * 100) : 0;
  const progressBarHeight = 60;

  return (
    <div className='twoSeriesProgressChart' style={{width: 134, height: 180, margin: "auto"}}>
        <CircularProgressbarWithChildren

          height={progressBarHeight}
          value={target}
          strokeWidth={7}
          styles={buildStyles({
            pathColor: 'var(--deepblue)', 
            trailColor: 'transparent',
          })}
        >
          <div style={{ height:'80', width: `${100 - 1.35 * 10}%` }}>
            <CircularProgressbar
              value={targetPercentage}
              text={`${targetPercentage.toFixed(0)}%`} 
              styles={buildStyles({
                pathColor: 'var(--color-theme-grey)',
                trailColor: 'transparent',
                textSize:"20px",
                textColor: "var(--color-theme-grey)",
                fontWeight: "700px"
              })}
            />
          </div>
        </CircularProgressbarWithChildren>
    </div>
    
  );
};

export default TwoSeriesProgressChart;
