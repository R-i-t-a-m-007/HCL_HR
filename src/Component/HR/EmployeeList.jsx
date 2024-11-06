import React from 'react';

const Employees = [
    "Aarav Patel",
    "Neha Sharma",
    "Arjun Singh",
    "Priya Mehta",
    "Aanya Gupta",
    "Rohan Shah",
    "Ananya Kumar",
    "Karan Verma",
    "Sneha Reddy",
    "Aditya Desai",
    "Ishaan Choudhary",
    "Avani Joshi",
    "Vivek Mishra",
    "Ayesha Singh",
    "Aryan Malhotra",
    "Pooja Patel",
    "Akash Sharma",
    "Neha Singh",
    "Rajiv Kapoor",
    "Deepika Sharma"
];

export const EmployeeList = () => {
  return (
    <div className='bg-amber-950 text-white fixed px-12 pt-4 bottom-0 top-24 text-right flex rounded-tr-3xl'>
        <div id='label' className='h-full mr-5 bg-amber-100 mt-36 relative' style={{width: 2}}>
            <span className='-rotate-90 inline-block w-full whitespace-nowrap bg-amber-950 z-10 absolute left-0' style={{top: -18}}>
                Employee's Names
            </span>
        </div>
        <ul>
            {
                Employees.map(emp => 
                    <li className='py-1' key={emp}>{emp}</li>
                )
            }
        </ul>
    </div>
  )
}
