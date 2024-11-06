import React from 'react';

const BadgeGroup = ({data, valFontSize=20}) => {
    
  return (
    <div className='badgeGroup'>
        {
            data.map(d => 
                <div className='badge' key={d.name}>
                    <div className='label'>
                        <div className='icon mr-1' style={{color: d.color}}>{d.icon}</div>
                        <div className='name'>{d.name}</div>
                    </div>
                   
                        
                       
                    <div className={`val mainVal text-[${valFontSize}]`}>{d.val}</div>
                   
                </div>
            )
        }
    </div>
  )
}

export default BadgeGroup