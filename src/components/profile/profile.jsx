import React, { useState, useEffect } from "react";
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

const Profile = () => {
  const [data, setData] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false); // State to manage visibility of contact info
  const controlBtns = ["Profile", "Activity & interests", "Articles (3)"];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetails() {
      const response = await fetch("http://localhost:3000/api/getAllData/1");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    }
    fetchDetails();
  }, []);

  const sections = [
    <ProfileSection userdata={data} />,
    <ActivitiesSection />,
    <ArticlesSection />,
  ];

  return (
    <>
      <section className="relative profile_page_container bg-indigo-100 dark:bg-[#1f2e44] min-h-screen">
        {/* Navbar */}
        <section className="w-full bg-transparent">
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
              <section className="h-full rounded-xl p-4 bg-gray-100 dark:bg-gray-900 profile_left_section w-[70%] flex flex-col gap-[3rem] ">
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
                      <span
                        className="px-2"
                        onClick={() =>
                          navigate(`/${data && data.basicInfo.userId}/editprofile`)
                        }
                      >
                        Edit Profile
                      </span>
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
                      {data && data.basicInfo.firstName} {data && data.basicInfo.lastName}
                      <div className="contact_info flex items-center text-[0.8rem] sm:text-[1rem] sm:px-8 p-2 rounded gap-2">
                        <BiSolidNavigation className="text-[#0B73DA]" />
                        <span>{data && data.basicInfo.location}</span>
                      </div>
                    </h1>
                    <p className="text-[14px]">{data && data.basicInfo.headline}</p>
                    <div className="user_misc_details flex items-center gap-2 font-semibold text-center">
                      <div
                        className="contact_info bg-sky-800 text-gray-200  text-[0.8rem] sm:text-[1rem] sm:px-8 p-2 rounded-lg cursor-pointer"
                        onClick={() => setShowContactInfo(!showContactInfo)}
                      >
                        Contact Info
                      </div>
                      <div className="contact_info border-2 text-sky-800  text-[0.8rem] sm:text-[1rem] sm:px-8 p-2 rounded-lg cursor-pointer">
                        {currentUser.connections} Connections
                      </div>
                    </div>
                    {/* Display contact info if showContactInfo is true */}
                    {showContactInfo && (
                      <div className="contact-info-details text-lg">
                        <p>
                          <span className="font-bold">Email:</span>{" "}
                          <span>{data && data.basicInfo.email}</span>
                        </p>
                        <p>
                          <span className="font-bold">Mobile:</span>{" "}
                          <span>{data && data.basicInfo.mobileNo}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </section>
                <hr className="bg-gray-900" />
                <div className="user-head-controls flex">
                  {controlBtns.map((btn, index) => (
                    <button
                      key={index}
                      className={`p-3 text-center rounded-lg mx-2 font-bold  flex-1 border-2 hover:font-bold hover:border-sky-800 ${
                        sectionIndex === index
                          ? `border-sky-800 text-black bg-gray-200 hover:text-white`
                          : `bg-transparent text-black hover:text-white dark:text-white rounded-lg`
                      }`}
                      onClick={() => setSectionIndex(index)}
                    >
                      {btn}
                    </button>
                  ))}
                </div>

                {data && sections[sectionIndex]}
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

export default Profile;
