import React, { useState } from "react";
import { useChartData } from "../../context/ChartDataProvider";

export const Registration = () => {
    const {
        DEPARTMENTS
      } = useChartData();
    const [userCredentials, setUserCredentials] = useState({
        name: "",
        mail: "",
        department: "",
        password: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className="signUpFormContainer bg-white w-[30rem] h-fit rounded-2xl m-auto pb-6"> <form action="" className="signUpForm text-center pt-4">
      <h2>Registration Form</h2>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name..."
        value={userCredentials.name}
        onChange={(e) => setUserCredentials(prev => ({
            ...prev,
            name: e.target.value
        }))}
      />
      <input
        type="mail"
        id="mail"
        name="mail"
        placeholder="Email id..."
        value={userCredentials.mail}
        onChange={(e) => setUserCredentials(prev => ({
            ...prev,
            mail: e.target.value
        }))}
      />
      <br />
      <select
        value={userCredentials.department}
        onChange={(e) => setUserCredentials(prev => ({
            ...prev,
            department: e.target.value
        }))}
      >
        {DEPARTMENTS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select> <br />
      <input
        type="password"
        id="lname"
        name="lname"
        placeholder="Password..."
        value={userCredentials.password}
        onChange={(e) => setUserCredentials(prev => ({
            ...prev,
            password: e.target.value
        }))}
      />
      <br />
      <input type="submit" value="sign up" onClick={handleSubmit} />
    </form></div>
   
  );
};
