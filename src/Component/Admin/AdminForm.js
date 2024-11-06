import React, { useEffect, useState } from "react";
import { useChartData } from "../../context/ChartDataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import {
  MenuItem,
  FormHelperText,
  FormControl,
  Checkbox,
  ListItemText,
  Select,
  InputLabel,
  OutlinedInput,
  Alert,
  Stack,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserData } from "../../context/UserDataProvider";
const options = [
  {
    value: "Productions",
    label: "Productions",
  },
  {
    value: "Explorations",
    label: "Explorations",
  },
  {
    value: "Human Resource",
    label: "Human Resource",
  },
  {
    value: "Legal",
    label: "Legal",
  },
  {
    value: "Sales & Marketing",
    label: "Sales & Marketing",
  },
  {
    value: "Material & Contracts",
    label: "Material & Contracts",
  },
  {
    value: "Contracts Monitoring",
    label: "Contracts Monitoring",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Statutory",
    label: "Statutory",
  },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AdminForm = () => {
  const location = useLocation();

  const { DEPARTMENTS } = useChartData();

  const navigate = useNavigate();
  const { fetchUserData, currentUser, ADMIN } = useUserData();

  const action = location.state ? location.state.action : "";
  const defaultUser = location.state
    ? location.state.data
    : {
        id: -1,
        name: "",
        mail: "",
        department: DEPARTMENTS[0],
        password: "",
      };

  const [departments, setDepartments] = useState(() =>
    action ? defaultUser.access.split(",") : []
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDepartments(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [userCredentials, setUserCredentials] = useState(defaultUser);
  const [error, setError] = useState("");
  const handleInsert = async () => {
    try {
      const response = await axios.post("http://localhost:5000/insertuser", {
        ...userCredentials,
        access: departments.toString(),
      });

      setUserCredentials(defaultUser);
      toast.success(`User created successfully`);
      await fetchUserData();
      navigate("/adminTable");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/updateuser", {
        ...userCredentials,
        access: departments.toString(),
      });

      // setUserCredentials(defaultUser);
      toast.success(`User updated successfully`);
      await fetchUserData();
      navigate("/adminTable");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !(
        userCredentials.name !== "" &&
        userCredentials.mail !== "" &&
        userCredentials.password !== "" &&
        userCredentials.departments !== ""
      )
    ) {
      setError("All fields are required");
      return;
    }
    //  else if(userCredentials.mail!==" /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/"){
    //   setError("Invalid email address")
    //   return
    //    }
    if (action === "edit" || action === "passwordChange") {
      await handleUpdate();
    } else {
      await handleInsert();
    }
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/insertuser",
    //     {
    //       ...userCredentials,
    //       access: departments.toString()
    //     }
    //   );
    //   console.log(response.data);
    //   setUserCredentials(defaultUser);
    //   toast.success(`User ${action === "create" ? "created" : "updated"} successfully`);
    //   await fetchUserData();
    //   navigate("/adminTable");
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#0020600f]">
      <Sidebar />
      <div className="w-full">
        <Navbar />

        <div className="signUpFormContainer mt-24 bg-white w-[30rem] h-fit rounded-2xl m-auto pb-6">
          <div className="mb-3">
            {error ? <Alert severity="error">{error}</Alert> : ""}
          </div>
          <form
            action="/submit"
            method="post"
            className="signUpForm text-center pt-6 mt-6"
          >
            {action === "edit" ? (
              <h2>Edit User</h2>
            ) : action === "passwordChange" ? (
              <h2>Change Password</h2>
            ) : (
              <h2>Create an User</h2>
            )}
            {action !== "passwordChange" && (
              <>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name..."
                  value={userCredentials.name}
                  required="true"
                  onChange={(e) =>
                    setUserCredentials((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <br />
                <input
                  type="mail"
                  id="mail"
                  name="mail"
                  placeholder="Email id..."
                  value={userCredentials.mail}
                  onChange={(e) =>
                    setUserCredentials((prev) => ({
                      ...prev,
                      mail: e.target.value,
                    }))
                  }
                />
                <br />
                <select
                  value={userCredentials.department}
                  onChange={(e) =>
                    setUserCredentials((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                >
                  {DEPARTMENTS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>{" "}
                <br />
              </>
            )}

            <input
              type="password"
              id="lname"
              name="lname"
              placeholder="Password..."
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <br />
            {action !== "passwordChange" && (
              <>
                <FormControl sx={{ m: 1, width: 330 }}>
                  <InputLabel id="demo-multiple-checkbox-label text-sm">
                    Access Rights
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    multiple
                    value={departments}
                    onChange={handleChange}
                    input={<OutlinedInput label="Departments" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        <Checkbox
                          checked={departments.includes(option.value)}
                        />
                        <ListItemText primary={option.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
              </>
            )}

            <input
              type="submit"
              value={action === "edit" || action === "passwordChange" ? "Update" : "Submit"}
              className="mt-5 bg-green-700"
              onClick={handleSubmit}
            />
            <input
              type="button"
              value="Cancel"
              className="mt-5 bg-red-700"
              onClick={() => navigate("/adminTable")}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
