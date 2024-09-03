import React, { useEffect, useState } from "react";
import logo from "../assets/sidebar/oasis-logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { FaUsersViewfinder } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { useTheme } from "../contexts/ThemeContext";
import profileImg from "../assets/sidebar/profile.jpeg";
import { IoNotificationsOutline } from "react-icons/io5";
import { showSuccessToast } from "../utilities/toastifySetup";

const SideBar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [active, setActive] = useState("");
  const { theme, toggleThemes } = useTheme();
  const navigate = useNavigate()

  const user = localStorage.getItem("user");

  const mainUser = JSON.parse(user);

  const handleTheme = () => {
    toggleThemes();
  };

  const logout = () => {
    showSuccessToast(`Goodbye ${mainUser.firstName} ${mainUser.lastName}`)
    localStorage.clear();
   return navigate("/")
  };

  // useEffect(() => {
  //   const loggedInUser = JSON.parse(localStorage.getItem("hr"));
  //   setUser(loggedInUser);
  // },[])

  return (
    <>
      <div
        className={`${
          sidebarActive ? "block" : "hidden"
        } md:block fixed w-[280px] z-200 px-4 py-2 lg:px-4 sm:px-0 md:px-0 h-screen bg-white`}
      >
        <div
          className={`${
            sidebarActive ? "block" : "hidden"
          }  bg-[#FAFAFB] w-[270px] h-full py-3 px-4 top-4 left-4 mb-6 z-200 rounded-xl md:block text-[#16151C]`}
        >
          <div className="flex flex-col text-xs md:text-sm">
            <section className="">
              <div className="flex gap-2">
                <img
                  src={logo}
                  alt="Oasis Logo"
                  width="50"
                  className="rounded-xl"
                />
                <h1 className="font-lexend text-center font-bold mt-[15px]">
                  Oasis People HRM
                </h1>
              </div>
            </section>
            <section className="mt-10">
              <nav>
                <ul className="flex gap-1 md:gap-1 flex-col">
                  <NavLink
                    to="/dashboard"
                    style={({ isActive }) => {
                      isActive ? setActive("dashboard") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "dashboard" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li
                        className={`flex gap-4 text-l w-full items-center p-[10px] font-lexend hover:text-[#7152F3] hover:cursor-pointer`}
                      >
                        <MdOutlineDashboard className="mt-[1px] text-xl" />{" "}
                        Dashboard
                      </li>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/employees"
                    style={({ isActive }) => {
                      isActive ? setActive("Employees") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "Employees" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li className="flex gap-4 text-l w-full items-center p-[10px] font-lexend hover:text-[#7152F3] hover:cursor-pointer">
                        <GoPeople className="mt-[1px] text-xl" /> All Employees
                      </li>
                    </div>
                  </NavLink>
                  {/* <NavLink
                    to="/departments"
                    style={({ isActive }) => {
                      isActive ? setActive("departments") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "departments" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li className="flex gap-4 text-l font-lexend hover:text-[#7152F3] hover:cursor-pointer w-full items-center p-[10px]">
                        <FaUsersViewfinder className="mt-[1px] text-xl" /> All
                        Departments
                      </li>
                    </div>
                  </NavLink> */}
                  <NavLink
                    to="/attendance"
                    style={({ isActive }) => {
                      isActive ? setActive("Attendance") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "Attendance" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li className="flex gap-4 text-l font-lexend hover:text-[#7152F3] hover:cursor-pointer w-full items-center p-[10px]">
                        <FaRegCalendarCheck className="mt-[1px] text-xl" />{" "}
                        Attendance
                      </li>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/all-leave"
                    style={({ isActive }) => {
                      isActive ? setActive("leaves") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "leaves" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li className="flex gap-4 text-l font-lexend hover:text-[#7152F3] hover:cursor-pointer w-full items-center p-[10px]">
                        <FcCalendar className="mt-[1px] text-xl" /> Leaves Requests
                      </li>
                    </div>
                  </NavLink>
                  {/* <NavLink
                    to="/notification"
                    className="block md:block lg:hidden sm:block"
                    style={({ isActive }) => {
                      isActive ? setActive("notification") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "leaves" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li className="flex gap-4 text-l font-lexend hover:text-[#7152F3] hover:cursor-pointer w-full items-center p-[10px]">
                        <IoNotificationsOutline className="mt-[1px] text-xl" />Notification
                      </li>
                    </div>
                  </NavLink> */}
                  <NavLink
                    to="/profile"
                    className="block md:block lg:hidden sm:block"
                    style={({ isActive }) => {
                      isActive ? setActive("profile") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "leaves" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li className="flex gap-4 text-l font-lexend hover:text-[#7152F3] hover:cursor-pointer w-full items-center p-[10px]">
                        <img
                          src={profileImg}
                          alt="profile image"
                          width="20"
                          className="rounded-lg"
                        />{" "}
                        Profile
                      </li>
                    </div>
                  </NavLink>
                  {/* <NavLink
                    to="/settings"
                    style={({ isActive }) => {
                      isActive ? setActive("settings") : null;
                      return {
                        backgroundColor: isActive ? "#F3F2FB" : "",
                        color: isActive ? "#7152F3" : "",
                        borderRadius: "10px",
                        fontWeight: isActive ? 800 : 100,
                      };
                    }}
                  >
                    <div className="flex">
                      {active === "settings" && (
                        <div className="bg-[#7152F3] inline-block h-[50px] w-1 rounded-lg"></div>
                      )}
                      <li className="flex gap-4 text-l font-lexend hover:text-[#7152F3] hover:cursor-pointer w-full items-center p-[10px]">
                        <IoSettingsOutline className="mt-[1px] text-xl" />{" "}
                        Settings
                      </li>
                    </div>
                  </NavLink> */}
                  <li
                    className="flex gap-4 text-l font-lexend font-thin hover:text-[#7152F3] hover:cursor-pointer w-full items-center p-[10px]"
                    onClick={() => logout()}
                  >
                    <IoIosLogOut className="mt-[1px] text-xl" /> Signout
                  </li>
                </ul>
              </nav>
            </section>
            <section className="bottom-5 absolute w-[230px] h-[60px] rounded-xl flex justify-center items-center">
              <div className="w-full h-full rounded-xl">
                <div className="flex bg-[#F6F6F7] justify-between w-full h-full rounded-xl">
                  <div
                    onClick={() => handleTheme()}
                    style={{
                      backgroundColor: `${
                        theme === "light" ? "#7152F3" : "#F6F6F7"
                      }`,
                      color: `${theme === "light" ? "white" : ""}`,
                    }}
                    className={`w-[50%] ${
                      theme === "light" ? "rounded-xl" : null
                    } rounded-tl-xl rounded-bl-xl flex justify-center gap-4 items-center text-l hover:text-[#7152F3] font-light hover:cursor-pointer`}
                  >
                    <CiLight className="text-xl" /> Light
                  </div>
                  <div
                    onClick={() => handleTheme()}
                    style={{
                      backgroundColor: `${
                        theme === "dark" ? "#7152F3" : "#F6F6F7"
                      }`,
                      color: `${theme === "dark" ? "white" : ""}`,
                    }}
                    className={`w-[50%] ${
                      theme === "dark" ? "rounded-xl" : null
                    } flex justify-center rounded-tr-xl rounded-br-xl gap-4 items-center text-l hover:text-[#7152F3] font-light hover:cursor-pointer`}
                  >
                    <GoMoon className="text-xl" /> Dark
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div
        onClick={() => setSidebarActive(!sidebarActive)}
        className="inline-block"
      >
        <div
          className={`md:hidden w-[30px] ${sidebarActive ? "hidden" : null}`}
        >
          <MdOutlineKeyboardDoubleArrowRight className="text-4xl" />
        </div>
        <div
          className={`md:hidden w-[30px] ${
            sidebarActive ? "ml-[300px]" : "ml-0"
          } ${!sidebarActive ? "hidden" : null}`}
        >
          <MdOutlineKeyboardDoubleArrowLeft className="text-4xl" />
        </div>
      </div>
    </>
  );
};

export default SideBar;
