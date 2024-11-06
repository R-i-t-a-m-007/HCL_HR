import React from 'react';
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export const NavigationBtn = ({text, redirectTo}) => {
    const navigate = useNavigate();
  return (
    <div className='navigationBtn flex gap-2 items-center cursor-pointer' onClick={() => navigate(redirectTo)}>
        <div>{text}</div>
        <FiExternalLink size={18} />
    </div>
  )
}
