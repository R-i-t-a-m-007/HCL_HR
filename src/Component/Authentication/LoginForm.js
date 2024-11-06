import React from "react";
// import {BsInfoCircle} from "react-icons/bs"
// import etlLogo from '../etlLogo.svg';
import { useNavigate } from "react-router-dom";
import { useChartData } from "../../context/ChartDataProvider";
import { useUserData } from "../../context/UserDataProvider";

const LoginForm = () => {
  // const {
  //   // DEPARTMENTS,
  //   // department,
  //   // setDepartment,
  //   userName,
  //   setUserName,
  //   userId,
  //   setUserId,
  //   ADMIN,
  // } = useChartData();

  const { currentUser, setCurrentUser, ADMIN, getUserInfo } = useUserData();

  const navigate = useNavigate();

  const handleLocalStorage = (mail, password) => {
    localStorage.setItem("mail", mail);
    localStorage.setItem("password", password);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if(currentUser.mail === ADMIN.mail && currentUser.password === ADMIN.password) {
      setCurrentUser(ADMIN);
      handleLocalStorage(currentUser.mail, currentUser.password);
      navigate("/productions");
    } else {
      const userData = getUserInfo(currentUser.mail, currentUser.password);
      if(userData) {
        setCurrentUser(userData);
        handleLocalStorage(currentUser.mail, currentUser.password);
        navigate("/productions");
      } else {
        alert("Invalid user");
      }
    }
  };

  return (
    <form action="" className="signUpForm text-center pt-4">
      <h2>Login Form</h2>
      <input
        type="text"
        id="mail"
        name="mail"
        placeholder="Username..."
        value={currentUser.mail}
        onChange={(e) =>
          setCurrentUser((prev) => ({
            ...prev,
            mail: e.target.value,
          }))
        }
      />
      <br />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password..."
        value={currentUser.password}
        onChange={(e) => setCurrentUser((prev) => ({
          ...prev,
          password: e.target.value
        }))}
      />
      <br />
      <input type="submit" value="sign in" onClick={(e) => handleLogin(e)} />
    </form>
  );
};

export default LoginForm;
