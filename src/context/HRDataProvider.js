import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const HRDataContext = createContext();
export const useHRData = () => useContext(HRDataContext);

const employeeCountApi = "http://localhost:5002/employee_counts";
const disabilityStatusApi = "http://localhost:5002/handicapped_counts";
const categoryCountApi = "http://localhost:5002/category_counts";
const positionCountApi = "http://localhost:5002/position_counts";
const employeeManpowerApi = "http://localhost:5002/sex_counts";
const bloodGroupApi = "http://localhost:5002/bloodgroup_counts";
const departmentCountApi = "http://localhost:5002/department_counts";
const empCountByCategoryApi = "http://localhost:5002/employee_category_counts";
const empDesignationApi = "http://localhost:5002/designation_counts";

const UNITS = ["ICC", "KCC", "MCP"];

export const HRDataProvider = ({ children }) => {
  const [employeeCount, setEmployeeCount] = useState({
    executives: 0,
    technical: 0,
    nonTechnical: 0,
  });

  const [disabilityStatus, setDisabilityStatus] = useState({
    disabled: 0,
    nonDisabled: 0,
  });

  const [categoryCount, setCategoryCount] = useState({
    general: 0,
    sc: 0,
    st: 0,
    obc: 0,
  });

  const [positionCount, setPositionCount] = useState({
    junior: 0,
    senior: 0,
    intermediate: 0,
    trainee: 0,
  });

  const [empManpower, setEmpManpower] = useState({
    Male_Executive: 0,
    Female_Executive: 0,
    Male_NonExecutive: 0,
    Female_NonExecutive: 0,
  });

  const [bloodGroupCount, setBloodGroupCount] = useState({
    ICC: {
      "A+": 0,
      "A-": 0,
      "AB+": 0,
      "AB-": 0,
      "B+": 0,
      "B-": 0,
      "O+": 0,
      "O-": 0,
    },
    KCC: {
      "A+": 0,
      "A-": 0,
      "AB+": 0,
      "AB-": 0,
      "B+": 0,
      "B-": 0,
      "O+": 0,
      "O-": 0,
    },
    MCP: {
      "A+": 0,
      "A-": 0,
      "AB+": 0,
      "AB-": 0,
      "B+": 0,
      "B-": 0,
      "O+": 0,
      "O-": 0,
    },
  });

  const [departmentCount, setDepartmentCount] = useState({
    HO: {
      Finance: 0,
      HR: 0,
      IT: 0,
      "M&C": 0,
      Mines: 0,
      Operation: 0,
      Sales: 0,
    },
    ICC: {
      Finance: 0,
      HR: 0,
      IT: 0,
      "M&C": 0,
      Mines: 0,
      Operation: 0,
      Sales: 0,
    },
    KCC: {
      Finance: 0,
      HR: 0,
      IT: 0,
      "M&C": 0,
      Mines: 0,
      Operation: 0,
      Sales: 0,
    },
    MCP: {
      Finance: 0,
      HR: 0,
      IT: 0,
      "M&C": 0,
      Mines: 0,
      Operation: 0,
      Sales: 0,
    },
    Cadre: {
      Finance: 0,
      HR: 0,
      IT: 0,
      "M&C": 0,
      Mines: 0,
      Operation: 0,
      Sales: 0,
    },
  });

  const [empCountByCategory, setEmpCountByCategory] = useState({
    Executive: {
      E0: { male: 0, female: 0 },
      E1: { male: 0, female: 0 },
      E2: { male: 0, female: 0 },
      E3: { male: 0, female: 0 },
      E4: { male: 0, female: 0 },
      E5: { male: 0, female: 0 },
      E6: { male: 0, female: 0 },
      E7: { male: 0, female: 0 },
      E8: { male: 0, female: 0 },
      E9: { male: 0, female: 0 },
      E10: { male: 0, female: 0 },
      E11: { male: 0, female: 0 },
    },
    Technical: {
      T1: { male: 0, female: 0 },
      T2: { male: 0, female: 0 },
      T3: { male: 0, female: 0 },
      T4: { male: 0, female: 0 },
      T5: { male: 0, female: 0 },
      T6: { male: 0, female: 0 },
      T7: { male: 0, female: 0 },
      T8: { male: 0, female: 0 },
      T9: { male: 0, female: 0 },
      T10: { male: 0, female: 0 },
    },
    "Non-Technical": {
      C1: { male: 0, female: 0 },
      C2: { male: 0, female: 0 },
      C3: { male: 0, female: 0 },
      C4: { male: 0, female: 0 },
      C5: { male: 0, female: 0 },
      C6: { male: 0, female: 0 },
    },
  });

  const fetchEmployeeCount = async () => {
    await axios.get(employeeCountApi).then((response) => {
      if (response) {
        const data = response.data ? response.data : {};
        setEmployeeCount(data);
      }
    });
  };

  const fetchDisabilityStatus = async () => {
    await axios.get(disabilityStatusApi).then((response) => {
      if (response) {
        const data = response.data ? response.data : {};
        setDisabilityStatus(data);
      }
    });
  };

  const fetchCategoryCount = async () => {
    await axios.get(categoryCountApi).then((response) => {
      if (response) {
        const data = response.data ? response.data : {};
        setCategoryCount(data);
      }
    });
  };

  const fetchPositionCount = async () => {
    await axios.get(positionCountApi).then((response) => {
      if (response) {
        const data = response.data ? response.data : {};
        setPositionCount(data);
      }
    });
  };

  const fetchEmployeeManpower = async () => {
    await axios.get(employeeManpowerApi).then((response) => {
      const data = response.data ? response.data : {};
      setEmpManpower(data);
    });
  };

  const fetchBloodGroupCountByUnit = async (unit) => {
    let endpoint = `${bloodGroupApi}?unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data ? response.data : {};
        setBloodGroupCount((prev) => ({
          ...prev,
          [unit]: data,
        }));
      }
    });
  };

  const fetchBloodGroupCount = async () => {
    UNITS.forEach(async (unit) => {
      await fetchBloodGroupCountByUnit(unit);
    });
  };

  const fetchDepartmentCountByUnit = async (unit) => {
    let endpoint = `${departmentCountApi}?unit=${unit}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data ? response.data : {};
        setDepartmentCount((prev) => ({
          ...prev,
          [unit]: data,
        }));
      }
    });
  };

  const fetchDepartmentCount = async () => {
    const units = ["HO", "ICC", "MCP", "KCC","Cadre"];
    units.forEach(async (unit) => {
      await fetchDepartmentCountByUnit(unit);
    });
  };

  const fetchEmpCountByCategory = async (employeeType) => {
    let endpoint = `${empCountByCategoryApi}?employee_type=${employeeType}`;
    await axios.get(endpoint).then((response) => {
      if (response) {
        const data = response.data ? response.data : {};
        setEmpCountByCategory((prev) => ({
          ...prev,
          [employeeType]: data,
        }));
      }
    });
  };

  const fetchEmpCount = async () => {
    const categories = ["Executive", "Technical", "Non-Technical"];
    categories.forEach(async (unit) => {
      await fetchEmpCountByCategory(unit);
    });
  };

  useEffect(() => {
    fetchEmployeeCount();
    fetchDisabilityStatus();
    fetchCategoryCount();
    fetchPositionCount();
    fetchEmployeeManpower();
    fetchBloodGroupCount();
    fetchDepartmentCount();
    fetchEmpCount();
  }, []);

  return (
    <HRDataContext.Provider
      value={{
        employeeCount,
        disabilityStatus,
        categoryCount,
        positionCount,
        empManpower,
        bloodGroupCount,
        departmentCount,
        empCountByCategory,
      }}
    >
      {children}
    </HRDataContext.Provider>
  );
};
