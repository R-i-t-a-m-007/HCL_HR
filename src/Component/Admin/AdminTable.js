import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Button,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Checkbox,
  ListItemText,
  Select,
  OutlinedInput,
  Card,
  TextField,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { HiArrowNarrowLeft } from "react-icons/hi";
import React, { useState, useDeferredValue } from "react";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useUserData } from "../../context/UserDataProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { CustomBackdrop } from "../CustomBackdrop";
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

const AdminTable = () => {
  const { allUsers, fetchUserData, currentUser, ADMIN, loading } =
    useUserData();
  const navigate = useNavigate();

  const [deleteData, setDeleteData] = useState();

  const [departments, setDepartments] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDepartments(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      alert("Do you want delete it?");
      toast.success(`User deleted successfully`);
      await fetchUserData();
    } catch {
      console.log("error");
    }
  };
  // const handleDepartmentChange = (index, selected) => {

  //   const updateDepartments = [...departments];

  //   updateDepartments [index] = selected;

  //   setDepartments( updateDepartments );
  // };

  const handleEdit = (userData) => {
    navigate("/user", { state: { action: "edit", data: userData } });
  };

  const handlePasswordChange = () => {
    navigate("/user", {
      state: { action: "passwordChange", data: currentUser },
    });
  };

  return (
    <div className="h-screen w-full">
      <Sidebar />

      <div className="w-full" style={{ backgroundColor: "#0020600f" }}>
        <Navbar />
        <Box className="relative flex justify-center items-center h-[60rem]">
          {currentUser.mail === ADMIN.mail ? (
            <>
              {allUsers && allUsers.length > 0 ? (
                <TableContainer className=" absolute m-auto w-[50rem] max-h-[70vh] shadow-lg">
                  <Table className="h-full w-full" aria-label="simple table">
                    <TableHead>
                      <TableRow className="text-center ml-10">
                        <TableCell className="font-semibold">
                          {" "}
                          UserId{" "}
                        </TableCell>
                        <TableCell className="font-semibold"> Name </TableCell>
                        <TableCell className="font-semibold">
                          Department{" "}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {" "}
                          Access{" "}
                        </TableCell>
                        <TableCell className="font-semibold">
                          Actions{" "}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allUsers.map((d, index) => (
                        <>
                          {" "}
                          <StyledTableRow>
                            <TableCell> {d.mail} </TableCell>
                            <TableCell> {d.name} </TableCell>
                            <TableCell>{d.department}</TableCell>
                            <TableCell>
                              <FormControl sx={{ m: 1, width: 180 }}>
                                <InputLabel id="demo-multiple-checkbox-label text-sm">
                                  Departments
                                </InputLabel>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  multiple
                                  value={d.access.split(",")}
                                  onChange={handleChange}
                                  input={<OutlinedInput label="Departments" />}
                                  renderValue={(selected) =>
                                    selected.join(", ")
                                  }
                                  MenuProps={MenuProps}
                                >
                                  {options.map((option) => (
                                    <MenuItem
                                      key={option.label}
                                      value={option.value}
                                    >
                                      <Checkbox
                                        checked={
                                          d.access
                                            .split(",")
                                            .includes(option.value)
                                          // departments.indexOf(option.label) > -1
                                        }
                                      />
                                      <ListItemText primary={option.label} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell className="space-x-2">
                              <Button
                                className="rounded-md h-5 w-5 bg-[#64A33F] text-white text-xs"
                                onClick={() => handleEdit(d)}
                              >
                                Edit
                              </Button>
                              <Button
                                className="rounded-md h-5 w-5 bg-red-500 text-white text-xs"
                                onClick={() => handleDelete(d.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </StyledTableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : loading ? (
                <CustomBackdrop open={loading} />
              ) : (
                <h2>No user found</h2>
              )}

              <Button
                onClick={() => navigate("/user")}
                className="bg-[#64A33F] text-white absolute top-24 right-6"
              >
                Add User
              </Button>
            </>
          ) : currentUser.mail ? (
            <h2
              className="text-xl bg-white py-2 px-3 rounded-md cursor-pointer"
              onClick={handlePasswordChange}
            >
              Change password
            </h2>
          ) : loading ? (
            <CustomBackdrop open={loading} />
          ) : (
            <h2>Access denied</h2>
          )}
        </Box>
      </div>
    </div>
  );
};

export default AdminTable;
