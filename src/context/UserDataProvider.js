import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserDataContext = createContext();
export const useUserData = () => useContext(UserDataContext);

const userDataApi = "http://localhost:5000/get_user_data";
const ADMIN = {
  access: "all",
  department: "all",
  id: "admin",
  mail: "admin@gmail.com",
  name: "admin",
  password: "admin",
};
export const UserDataProvider = ({ children }) => {

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({
    access: "",
    department: "",
    id: "",
    mail: "",
    password: "",
  });

  const hasAccess = (department) =>
    currentUser &&
    (currentUser.access === "all" ||
      currentUser.access === department ||
      currentUser.access.split(",").includes(department));

  const fetchUserData = async () => {
    await axios.get(userDataApi).then((response) => {
      if (response) {
        const data = response.data ? response.data : [];
        setAllUsers(data);
        setLoading(false);
        // if(response.data && response.data.length > 0 && response.data.access) {
        //     const access = (response.data.access).split(",")
        //     setAllUsers({
        //         ...response.data,
        //         access: access
        //     })
        // } else {
        //     setAllUsers(response.data);
        // }
      }
    });
  };

  const getUserInfo = (mail, password) =>
    allUsers.find((user) => user.mail === mail && user.password === password);

  useEffect(() => {
    fetchUserData();
  }, []);

  const pageReloaded =
    performance.getEntriesByType("navigation")[0].type === "reload";

  useEffect(() => {
    if (pageReloaded && allUsers) {
      const mail = localStorage.getItem("mail");
      const password = localStorage.getItem("password");

      if (mail && password) {
        if (mail === ADMIN.mail && password === ADMIN.password) {
          setCurrentUser(ADMIN);
          return;
        }
        const userData = getUserInfo(mail, password);
        console.log(allUsers);
        if (userData) {
          // alert("Yo2")
          setCurrentUser(userData);
        }
      }
    }
  }, [pageReloaded, allUsers]);

  // useEffect(() => {}, [currentUser]);

  return (
    <UserDataContext.Provider
      value={{
        allUsers,
        fetchUserData,
        ADMIN,
        currentUser,
        setCurrentUser,
        getUserInfo,
        hasAccess,
        loading
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
