import { MdOutlineWavingHand } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import profileImg from "../assets/navbar/profile.jpeg";
import { IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import { getCurrentGreeting } from "../utilities/helpers";

const NavBar = () => {
  const [searchItem, setSearchItem] = useState("");
  
  const [profile, setProfile] = useState(false);

  const user = localStorage.getItem("user");

  const mainUser = JSON.parse(user);

  const greeting = getCurrentGreeting();

  return (
    <>
      <div className="lg:ml-[290px] bg-white md:ml-[290px] sm:ml-0 p-1 px-4 flex flex-col">
        <div className="flex justify-between sm:justify-around">
          <section className="w-[50%] md:w-[30%] h-[10%]">
            <div className="flex gap-2 font-lexend font-bold">
              Hello {mainUser.firstName}{" "}
              <MdOutlineWavingHand className="mt-1 text-[#A86232]" />
            </div>
            <div className="text-sm font-thin">{greeting}</div>
          </section>
          <section className="flex w-[80%] md:w-[40%] lg:w-[100%] gap-4 justify-normal md:justify-normal sm:justify-normal lg:justify-end">
            <div className="justify-center items-center w-[60%] md:w-[100%] sm:w-[100%] lg:w-[50%]">
              <input
                placeholder="Search"
                className="border p-2 rounded-lg w-[100%] md:w-[100%] sm:w-[100%] flex"
              />
            </div>
            <div className="h-[70%] px-2 py-2 mt-1 bg-[#F6F6F6] rounded-lg justify-center items-center hidden md:hidden lg:block">
              <IoNotificationsOutline className="text-2xl" />
            </div>
            <div className="gap-2 rounded-lg border p-1 hidden md:hidden lg:flex">
              <div className="flex gap-2 rounded-lg">
                <div className="">
                  <img
                    src={profileImg}
                    alt="profile image"
                    width="45"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-lexend font-bold">
                    {mainUser.firstName} {mainUser.lastName}
                  </span>{" "}
                  <span className="text-sm font-thin">{mainUser.designation}</span>
                </div>
              </div>
              <div className="flex justify-center items-center hover:cursor-pointer">
                {!profile && (
                  <IoIosArrowDown onClick={() => setProfile(true)} />
                )}
                {profile && <IoIosArrowUp onClick={() => setProfile(false)} />}
              </div>
            </div>
          </section>
        </div>
        {profile && (
          <section className="flex items-end justify-end">
            <div className=" right-0 flex mt-1 justify-center w-[10%] border-2 hover:cursor-pointer hover:bg-[#7152F3] hover:text-white font-thin rounded-lg p-2">
              View Profile
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default NavBar;
