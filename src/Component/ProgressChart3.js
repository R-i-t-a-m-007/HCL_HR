
import React from 'react';
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressChart3 = ({ target, actual }) => {
  const targetPercentage = (actual / target) * 100;
  const progressBarHeight = 60;

  return (
    <div style={{width: 140, height: 160, margin: "auto"}}>
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
          <div style={{ height:120, width: 140 }}>
            <CircularProgressbar
              value={targetPercentage ? targetPercentage : 0}
              text={`${targetPercentage ? targetPercentage.toFixed(0) : 0}%`} 
              styles={buildStyles({
                // pathColor: '#067185',
                pathColor: 'var(--color-theme-purple)',
                trailColor: 'transparent',
                textSize:"25px",
                textColor: "var(--color-theme-blue)"
              })}
            />
          </div>
        </CircularProgressbarWithChildren>
    </div>
    
  );
};

export default ProgressChart3;
