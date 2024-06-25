import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Navbar from "../helper/navbar";
import "./profile.css";
import RequestBox from "../helper/requestbox";
import { FaRegEdit } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidNavigation } from "react-icons/bi";
import ProfileSection from "./profileSection";
import ActivitiesSection from "./activitiesSection";
import ArticlesSection from "./articlesSection";
import { currentUser } from "./UserData";
import { useNavigate } from "react-router-dom";
const profile = () => {
  const sections = [
    <ProfileSection />,
    <ActivitiesSection />,
    <ArticlesSection />,
  ];
  const [sectionIndex, setSectionIndex] = useState(0);
  const controlBtns = ["Profile", "Activity & interests", "Articles (3)"];
  const navigate = useNavigate();
  return (
    <>
      <section className=" relative profile_page_container bg-indigo-100 dark:bg-[#1f2e44] min-h-screen">
        {/* Navbar */}
        <section className=" w-full  bg-transparent">
          <Navbar />
        </section>
        {/* Profile Page container */}
        <div className="lg:w-5/6 lg:pl-12 w-full mx-auto">
          <main className="mx-[3%] my-[1rem] min-h-[80vh]">
            <button
              className="back_btn text-[2rem] p-0 text-black bg-transparent hover:bg-transparent hover:left-[1.5rem] dark:text-white absolute left-[2rem]"
              onClick={() => navigate("/dashboard")}
            >
              <IoMdArrowRoundBack />
            </button>
            <div className="page_components h-full flex py-[2rem] gap-[1rem]">
              <section className=" h-full rounded-xl p-4 bg-gray-100 dark:bg-gray-900 profile_left_section w-[70%]  flex flex-col gap-[3rem] ">
                <div className="bg-img relative">
                  <img
                    src={currentUser.coverImg}
                    alt="Cover"
                    width="100%"
                    className="h-[180px] rounded-lg"
                  />
                  <div className="absolute top-5 right-5 edit-options flex w-fit ml-auto gap-4">
                    <button className="profile-control-options py-2 px-3 rounded-full bg-[#0D0D0D99] flex justify-between items-center hover:bg-[#0b72da24] ml-auto text-white ">
                      <FaRegEdit />
                      <span className="px-2"
                      onClick={() => navigate("/editprofile")}>Edit Profile</span>
                    </button>
                    <button className="profile-control-options py-2 px-3 rounded-full bg-[#0D0D0D99] flex justify-between items-center hover:bg-[#0b72da24] ml-auto text-white">
                      <SlOptionsVertical />
                    </button>
                  </div>
                </div>
                <section className="user-profile-head flex gap-4 items-center px-[1rem] mt-[-2rem]">
                  <img
                    src={currentUser.userImg}
                    alt={currentUser.userName}
                    width="170px"
                    height="170px"
                    className="rounded-full border-8 border-black mt-[-4rem] z-10 dark:border-white"
                  />
                  <div className="user_head_desc flex-1 flex flex-col gap-2 ">
                    <h1 className="flex justify-between items-baseline text-[18px] font-bold">
                      {currentUser.userName}
                      <div className="contact_info flex items-center text-[0.8rem] sm:text-[1rem] sm:px-8 p-2 rounded gap-2">
                        <BiSolidNavigation className="text-[#0B73DA]" />
                        <span>City, country</span>
                      </div>
                    </h1>
                    <p className="text-[14px]">{currentUser.userTitle}</p>
                    <div className="user_misc_details flex items-center gap-2 font-semibold text-center">
                      <div className="contact_info bg-sky-800 text-gray-200  text-[0.8rem] sm:text-[1rem] sm:px-8 p-2 rounded-lg cursor-pointer">
                        Contact Info
                      </div>
                      <div className="contact_info  border-2 text-sky-800  text-[0.8rem] sm:text-[1rem] sm:px-8 p-2 rounded-lg cursor-pointer">
                        {currentUser.connections} Connections
                      </div>
                    </div>
                  </div>
                </section>
                <hr className="bg-gray-900" />
                <div className="user-head-controls flex">
                  {controlBtns.map((btn, index) => (
                    <button
                      key={index}
                      className={`p-3 text-center rounded-lg mx-2 font-bold  flex-1 border-2 hover:font-bold hover:border-sky-800 ${
                        sectionIndex == index
                          ? `border-sky-800 text-black bg-gray-200 hover:text-white`
                          : `bg-transparent text-black hover:text-white dark:text-white rounded-lg`
                      }`}
                      onClick={() => setSectionIndex(index)}
                    >
                      {btn}
                    </button>
                  ))}
                </div>

                {sections[sectionIndex]}
              </section>
              <section className="h-full profile_right_section flex-1">
                <RequestBox />
              </section>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default profile;
