import React, { useState } from "react";
import logo from "../../assets/sidebar/oasis-logo.png";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { useTheme } from "../../contexts/ThemeContext";
import { showSuccessToast } from "../../utilities/toastifySetup";
import { MdOutlineWavingHand } from "react-icons/md";

const EmployeeSidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
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
            <section className="mt-10 flex flex-col py-10 gap-20 px-2">
              <div className="flex items-center justify-center">
                <img src={mainUser.image} alt="profile image" width="150" className="rounded-lg" />
              </div>
              <div className="flex justify-center">Hello, Welcome {mainUser.firstName} <MdOutlineWavingHand className="ml-2 mt-1 text-[#A86232]" /></div>
            </section>
            <section className="mt-10 flex justify-center">
              <nav>
                <ul className="flex gap-1 md:gap-1 flex-col">
                  <li
                    className="flex gap-4 text-l font-lexend font-thin hover:text-[#7152F3] hover:cursor-pointer w-full items-center"
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

export default EmployeeSidebar;
