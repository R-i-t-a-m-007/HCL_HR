import React, { useState } from "react";
import { BiSolidDashboard, BiSolidReport } from "react-icons/bi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { CgTimelapse } from "react-icons/cg";
import {
  BsFillCalendar2CheckFill,
  BsFillBox2Fill,
  BsFillBoxFill,
} from "react-icons/bs";
import { GiCoalWagon, GiNorthStarShuriken } from "react-icons/gi";
import { TbSettingsDollar } from "react-icons/tb";
import { MdNotificationAdd, MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import "./Sidebar.css";
import { useUserData } from "../../context/UserDataProvider";

const Sidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { pathname } = location;

  const [expanded_mines, setExpanded_mines] = useState({}); // Keep track of expanded items

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { setCurrentUser } = useUserData();

  const navItems = [
    {
      name: "Productions",
      type: "single",
      icon: <BiSolidDashboard />,
      routeTo: "/productions",
    },
    {
      name: "Explorations",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/exploration",
    },
    {
      name: "Human Resource",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/hr",
    },
    {
      name: "Legal",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/legal",
    },
    {
      name: "Sales & Marketing",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/sales",
    },
    {
      name: "Material & Contracts",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/m&c",
    },
    {
      name: "Contracts Monitoring",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/contractsmonitoring",
    },
    {
      name: "Finance",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/finance",
    },
    {
      name: "Statutory",
      type: "single",
      icon: <MdNotificationAdd />,
      routeTo: "/statutory",
    },
    {
      name: "Reports",
      type: "single",
      icon: <BiSolidReport />,
      // routeTo: "/reports",
    },
    {
      name: "Setting",
      type: "single",
      icon: <BsFillBox2Fill />,
      routeTo: "/adminTable",
    },
    {
      name: "Notification",
      type: "single",
      icon: <MdNotificationAdd />,
    },
    // {
    //   name: "Setting",
    //   type: "single",
    //   icon: <TbSettingsDollar />,
    // },
    {
      name: "Logout",
      type: "single",
      icon: <MdLogout />,
      action: () => {
        setCurrentUser({
          access: "",
          department: "",
          id: "",
          mail: "",
          password: "",
        });
        localStorage.removeItem("mail");
        localStorage.removeItem("password");
        navigate("/");
      },
    },
    // {
    //    name: "Departments",
    //    type: "nested",
    //    icon: <BsFillBoxFill />,
    //    sub: [
    //       {
    //          category: "Sales",
    //       },
    //       {
    //          category: "Marketing",
    //       },
    //       {
    //          category: "Finance",
    //       },
    //       {
    //          category: "Mines",
    //       },
    //       {
    //          category: "Statutory",
    //       }
    //    ],
    //    subIcon: <GiNorthStarShuriken />,
    //    classes: "navX"
    // },
    // {
    //   name: "Units",
    //   type: "single",
    //   icon: <BsFillBox2Fill />,
    //   routeTo: "/Units",
    // },
  ];

  const expandMines = (category) => {
    if (expanded_mines[category]) {
      setExpanded_mines({});
    } else {
      let obj = {};
      for (const key in expanded_mines) {
        // console.log(`key ${key}`)
        if (key === category) {
          obj[key] = true;
        } else {
          obj[key] = false;
        }
      }
      obj[category] = true;
      // console.log(obj)
      setExpanded_mines(obj);
    }
  };

  const [expanded_year, setExpanded_year] = useState(false);

  const [expanded_mineBtn, setExpanded_mineBtn] = useState(false);

  const [expanded_departments, setExpanded_departments] = useState(false);

  const expandYear = () => {
    if (expanded_year) {
      setExpanded_year(false);
    } else {
      setExpanded_year(true);
      setExpanded_mineBtn(false);
      setExpanded_departments(false);
      setExpanded_mines({});
    }
  };

  const expandDepartments = () => {
    if (expanded_departments) {
      setExpanded_departments(false);
    } else {
      setExpanded_departments(true);
      setExpanded_year(false);
      setExpanded_mineBtn(false);
      setExpanded_mines({});
    }
  };

  const expandMinesBtn = () => {
    if (expanded_mineBtn) {
      setExpanded_mineBtn(false);
    } else {
      setExpanded_mineBtn(true);
      setExpanded_year(false);
      setExpanded_departments(false);
      setExpanded_mines({});
    }
  };

  const handleExpand = (name, category = "") => {
    if (name === "Mines") {
      expandMinesBtn(category);
    } else if (name === "Year") {
      expandYear();
    } else if (name === "Departments") {
      expandDepartments();
    } else {
      return false;
    }
  };

  const getState = (name) => {
    if (name === "Mines") {
      return expanded_mineBtn;
    }
    if (name === "Year") {
      return expanded_year;
    }
    if (name === "Departments") {
      return expanded_departments;
    }
    return false;
  };

  const toggleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={`sidebar h-full ${sidebarIsOpen ? "fixedSideBar" : ""}`}>
        <div className="pt-6 subNav">
          {navItems.map((el) => (
            <span key={el.name}>
              <div
                className={`navItem ${
                  el.routeTo && pathname === el.routeTo && "active"
                } ${el.type === "single" ? "navGroup" : "expandableOption"} ${
                  el.classes && el.classes
                }`}
                onClick={() => (el.routeTo ? navigate(el.routeTo) : el.action ? el.action() : null)}
              >
                {el.type === "single" ? (
                  <>
                    {/* <div className='navIcon'>
                                  {el.icon}
                                </div> */}
                    <div className="navName">{el.name}</div>
                  </>
                ) : (
                  <>
                    <div
                      className="label navGroup"
                      onClick={() => handleExpand(el.name)}
                    >
                      {/* <div className='navIcon'>
                                      {el.icon}
                                  </div> */}
                      <div className="navName">{el.name}</div>
                      <div className="expandClose">
                        {getState(el.name) ? (
                          <AiOutlineLeft />
                        ) : (
                          <AiOutlineRight />
                        )}
                      </div>
                    </div>

                    {getState(el.name) && (
                      <div className="expandableSideNav">
                        {el.name === "Mines"
                          ? el.sub.map((item, i) => {
                              i++;
                              return (
                                <span key={item.category}>
                                  <div className="mine">
                                    <div className="expandableOption">
                                      <div
                                        className="label"
                                        onClick={() =>
                                          expandMines(item.category)
                                        }
                                      >
                                        <div className="pr-3">
                                          {/* <GiPolarStar /> */}
                                        </div>
                                        <div className="subNavName">
                                          {item.category}
                                        </div>
                                        <div>
                                          {expanded_mines[item.category] ? (
                                            <AiOutlineLeft />
                                          ) : (
                                            <AiOutlineRight />
                                          )}
                                        </div>
                                      </div>
                                      {expanded_mines[item.category] && (
                                        <div className="options block expandableSideNav">
                                          {item.names.map((opt, i) => {
                                            i++;
                                            return (
                                              <span key={opt.name}>
                                                <div className="subOption">
                                                  <div>{opt.name}</div>
                                                </div>
                                                {i < item.names.length && (
                                                  <hr className="lightDivider" />
                                                )}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {i < el.sub.length && (
                                    <hr className="lightDivider" />
                                  )}
                                </span>
                              );
                            })
                          : el.sub.map((subEl, i) => {
                              i++;
                              return (
                                <span key={subEl.category}>
                                  <div className="subOption">
                                    <div>{subEl.category}</div>
                                  </div>
                                  {i < el.sub.length && (
                                    <hr className="lightDivider" />
                                  )}
                                </span>
                              );
                            })}
                      </div>
                    )}
                  </>
                )}
              </div>
              {el.name === "Statutory" && <div className="divider"></div>}
            </span>
          ))}
        </div>
      </div>
      <button className="sidebarToggleBtn" onClick={toggleSidebar}>
        {sidebarIsOpen ? <IoMdClose /> : <RxHamburgerMenu />}
      </button>
    </>
  );
};

export default Sidebar;
