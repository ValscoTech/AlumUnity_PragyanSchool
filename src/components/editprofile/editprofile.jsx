import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import DashBoardNavBar from "../helper/DashBoardNavBar";
import RequestBox from "../helper/requestbox";
import ProfileSection from "./profileSection";
import ActivitiesSection from "./activitiesSection";
import ArticlesSection from "./articlesSection";
import { useNavigate } from "react-router-dom";
import EditProfile from "./editprofile";
import "./profile.css";

const Profile = () => {
  const sections = [
    <ProfileSection />,
    <ActivitiesSection />,
    <ArticlesSection />,
    <EditProfile />,
  ];
  const [sectionIndex, setSectionIndex] = useState(0);
  const controlBtns = ["Profile", "Activity & interests", "Articles (3)"];
  const navigate = useNavigate();

  const [isCurrent, setIsCurrent] = useState(false);
  const [startDate, setStartDate] = useState({ month: '', year: '' });
  const [endDate, setEndDate] = useState({ month: '', year: '' });

  const handleCheckboxChange = () => {
    setIsCurrent(!isCurrent);
    if (!isCurrent) {
      setEndDate({ month: '', year: '' });
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = [
    "2024", "2023", "2022", "2019", "2018", "2017",
    "2016", "2015", "2014", "2013", "2012", "2011"
  ];

  const handleStartDateChange = (e) => {
    const { name, value } = e.target;
    setStartDate((prev) => ({ ...prev, [name]: value }));
  };

  const handleEndDateChange = (e) => {
    const { name, value } = e.target;
    setEndDate((prev) => ({ ...prev, [name]: value }));
  };

  const [isPrivate, setIsPrivate] = useState(true);

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };

  return (
    <>
      <div>
        <DashBoardNavBar />
      </div>
      <section className="relative profile_page_container dark:bg-[#1f2e44] min-h-screen">
        <div className="lg:w-5/6 lg:pl-12 w-full mx-auto">
          <main className="mx-[3%] my-[1rem] min-h-[80vh]">
            <button
              className="back_btn text-[2rem] p-0 text-black bg-transparent hover:bg-transparent hover:left-[1.5rem] dark:text-white absolute left-[2rem]"
              onClick={() => navigate("/dashboard")}
            >
              <IoMdArrowRoundBack />
            </button>
            <div className="page_components h-full flex py-[2rem] gap-[1rem]">
              <section className="h-full rounded-xl p-4 bg-gray-100 dark:bg-gray-900 profile_left_section w-[70%] flex flex-col gap-[3rem]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">Basic Info</h2>
                    <div className="toggle-switch">
                      <label className="switch">
                        <input type="checkbox" checked={isPrivate} onChange={handleToggle} />
                        <span className="slider"></span>
                      </label>
                      <span className="label">{isPrivate ? 'Private' : 'Public'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold mb-2">First Name</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold mb-2">Last Name</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Additional Name</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Headline</label>
                    <input type="text" className="p-2 rounded border-gray-300 headline-input" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Current Position</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Industry</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Location</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <button className="save-button">
                    Save
                  </button>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">Projects</h2>
                    <div className="flex gap-4">
                      <button className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Project Name</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Project Description</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Project Link</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <button className="save-button">
                    Save
                  </button>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">Experience</h2>
                    <div className="flex gap-4">
                    <button className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Company Name</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Description</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Company Link</label>
                    <input type="text" className="p-2 rounded border-gray-300" />
                  </div>
                  <button className="save-button">
                    Save
                  </button>
                </div>
                <div className="employment-form-container">
                  <label>
                    <input type="checkbox" checked={isCurrent} onChange={handleCheckboxChange} />
                    I am currently working in this role
                  </label>
                  <div className="date-selector">
                    <div >
                      <label>Start date*</label>
                      <div className="flex gap-2">
                        <select onChange={handleStartDateChange} name="month" value={startDate.month}>
                          {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                          ))}
                        </select>
                        <select onChange={handleStartDateChange} name="year" value={startDate.year}>
                          {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>End date*</label>
                      <div className="flex gap-2">
                        <select onChange={handleStartDateChange} name="month" value={startDate.month}>
                          {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                          ))}
                        </select>
                        <select onChange={handleStartDateChange} name="year" value={startDate.year}>
                          {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="save-button"onClick={() => navigate("/profile")}>
                    Save
                  </button>
                </div>
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
