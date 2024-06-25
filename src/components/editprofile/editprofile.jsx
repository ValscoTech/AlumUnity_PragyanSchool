import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack, IoMdTrash } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DashBoardNavBar from "../helper/DashBoardNavBar";
import RequestBox from "../helper/requestbox";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./profile.css";
const EditProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isEditingProjects, setIsEditingProjects] = useState(false);
  const [isEditingExperiences, setIsEditingExperiences] = useState(false);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {
    async function fetchdetails() {
      const response = await fetch(`http://localhost:3000/api/getAllData/${id}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    }
    fetchdetails();
  }, [id]);

  const handleDateChange = (date, setDate) => {
    setDate(date);
  };

  const [isPrivate, setIsPrivate] = useState(true);

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      basicInfo: {
        ...prevData.basicInfo,
        [name]: value,
      },
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...data.projects];
    updatedProjects[index][name] = value;
    setData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...data.experience];
    updatedExperience[index][name] = value;
    setData((prevData) => ({
      ...prevData,
      experience: updatedExperience,
    }));
  };

  const handleSaveBasicInfo = async () => {
    console.log(data);
    const email = data.basicInfo.email;
    if (!email || !email.includes("@")) {
      alert("Enter a valid email address");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/api/updateBasicInfo/${data.basicInfo._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ basicInfo: data.basicInfo }),
      }
    );

    if (response.ok) {
      const updatedData = await response.json();
      setData(updatedData);
      navigate("/profile");
    } else {
      alert("Failed to update Basic Info.");
    }
  };

  const handleSaveProject = async (projectIndex) => {
    const project = data.projects[projectIndex];
    const response = await fetch(
      `http://localhost:3000/api/updateProject/${project._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }
    );

    if (response.ok) {
      const updatedData = await response.json();
      setData(updatedData);
      navigate("/profile");
      alert("Project updated successfully!");
    } else {
      alert("Failed to update Project.");
    }
  };

  const handleSaveExperience = async (experienceIndex) => {
    const experience = data.experience[experienceIndex];
    const response = await fetch(
      `http://localhost:3000/api/updateExperience/${experience._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experience),
      }
    );

    if (response.ok) {
      alert("Experience updated successfully!");
      navigate("/profile");
    } else {
      alert("Failed to update Experience.");
    }
  };

  async function handleAddProject(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      userId: 1,
      projectName: formData.get("projectName"),
      projectDescription: formData.get("projectDescription"),
      projectLink: formData.get("projectLink"),
    };
    if (
      data.projectName.trim().length === 0 ||
      data.projectDescription.trim().length === 0 ||
      data.projectLink.trim().length === 0
    ) {
      alert("Please enter the details");
      return;
    }
    const response = await fetch("http://localhost:3000/api/createProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("Project added successfully!");
      navigate("/profile");
    }
  }

  async function handleAddExperience(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      userId: 1,
      companyName: formData.get("companyName"),
      description: formData.get("description"),
      companyLink: formData.get("companyLink"),
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      role: formData.get("role"),
    };
    if (
      data.companyLink.trim().length === 0 ||
      data.companyName.trim().length === 0 ||
      data.description.trim().length === 0 ||
      data.role.trim().length === 0
    ) {
      alert("Please enter the details");
      return;
    }
    const response = await fetch("http://localhost:3000/api/createExperience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("Experience created successfully");
      navigate("/profile");
    }
  }
  const handleDeleteProject = async (projectId) => {
    const response = await fetch(
      `http://localhost:3000/api/deleteProject/${projectId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const updatedProjects = data.projects.filter(
        (project) => project._id !== projectId
      );
      setData((prevData) => ({
        ...prevData,
        projects: updatedProjects,
      }));
      alert("Project deleted successfully!");
    } else {
      alert("Failed to delete Project.");
    }
  };
  const handleDeleteExperience = async (experienceId) => {
    const response = await fetch(
      `http://localhost:3000/api/deleteExperience/${experienceId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const updatedExperiences = data.experience.filter(
        (exp) => exp._id !== experienceId
      );
      setData((prevData) => ({
        ...prevData,
        experience: updatedExperiences,
      }));
      alert("Experience deleted successfully!");
    } else {
      alert("Failed to delete Experience.");
    }
  };
  return (
    <>
      <div>
        <DashBoardNavBar />
      </div>
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
          <div className="bg-gray-100 rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
            <button
              className="absolute top-4 right-4 text-white bg-blue-500 text-xs hover:bg-blue-700"
              onClick={() => setIsProjectModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <form onSubmit={handleAddProject}>
              <div className="flex flex-col gap-4 py-4 ">
                <div className="flex flex-col">
                  <label className="mb-2 text-lg font-semibold">Title</label>
                  <input
                    type="text"
                    className="p-2 rounded "
                    name="projectName"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-lg font-semibold">
                    Description
                  </label>
                  <textarea
                    className="p-2 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    name="projectDescription"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-lg font-semibold">
                    Project Link
                  </label>
                  <input
                    type="text"
                    className="p-2 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    name="projectLink"
                  />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
                  <FontAwesomeIcon icon={faSave} className="mr-2" /> Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isExperienceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
          <div className="bg-gray-100 rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
            <button
              className="absolute top-4 right-4 text-white bg-blue-500 text-xs hover:bg-blue-700"
              onClick={() => {
                setIsExperienceModalOpen(false);
                setSelectedEndDate(null);
                setSelectedStartDate(null);
              }}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <form onSubmit={handleAddExperience}>
              <div className="flex flex-col">
                <label className="mb-2">Role</label>
                <input
                  type="text"
                  className="p-2 rounded border-gray-300"
                  name="role"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Company Name</label>
                <input
                  type="text"
                  className="p-2 rounded border-gray-300"
                  name="companyName"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Description</label>
                <textarea
                  className="p-2 rounded border-gray-300"
                  name="description"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Company Link</label>
                <input
                  type="text"
                  className="p-2 rounded border-gray-300"
                  name="companyLink"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Start Date</label>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={handleStartDateChange}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  className="p-2 rounded border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">End Date</label>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={handleEndDateChange}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  className="p-2 rounded border-gray-300"
                />
              </div>
              <button className="bg-blue-500 w-full text-white px-4 py-2 rounded mt-4">
                <FontAwesomeIcon icon={faSave} className="mr-2" /> Add
                Experience
              </button>
            </form>
          </div>
        </div>
      )}

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
                        <input
                          type="checkbox"
                          checked={isPrivate}
                          onChange={handleToggle}
                        />
                        <span className="slider"></span>
                      </label>
                      <span className="label">
                        {isPrivate ? "Private" : "Public"}
                      </span>
                    </div>
                  </div>
                  {isPrivate && (
                    <>
                      <div className="flex flex-col">
                        <label className="font-semibold mb-2">e-mail</label>
                        <input
                          type="text"
                          className="p-2 rounded border-gray-300"
                          name="email"
                          value={data?.basicInfo.email || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-semibold mb-2">
                          phone number
                        </label>
                        <input
                          type="text"
                          className="p-2 rounded border-gray-300"
                          name="mobileNo"
                          value={data?.basicInfo.mobileNo || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                  <div className="flex flex-col">
                    <label className="font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      className="p-2 rounded border-gray-300"
                      name="firstName"
                      value={data?.basicInfo.firstName || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      className="p-2 rounded border-gray-300"
                      name="lastName"
                      value={data?.basicInfo.lastName || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Additional Name</label>
                    <input
                      type="text"
                      className="p-2 rounded border-gray-300"
                      name="additionalName"
                      value={data?.basicInfo.additionalName || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Headline</label>
                    <input
                      type="text"
                      className="p-2 rounded border-gray-300 headline-input"
                      name="headline"
                      value={data?.basicInfo.headline || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Current Position</label>
                    <input
                      type="text"
                      className="p-2 rounded border-gray-300"
                      name="currentPosition"
                      value={data?.basicInfo.currentPosition || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Industry</label>
                    <input
                      type="text"
                      className="p-2 rounded border-gray-300"
                      name="industry"
                      value={data?.basicInfo.industry || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Location</label>
                    <input
                      type="text"
                      className="p-2 rounded border-gray-300"
                      name="location"
                      value={data?.basicInfo.location || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    onClick={handleSaveBasicInfo}
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                    Basic Info
                  </button>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">Projects</h2>
                    <div className="flex gap-4">
                      <button
                        className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => setIsProjectModalOpen(true)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button
                        className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => {
                          setIsEditingProjects(!isEditingProjects);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                  </div>
                  {data?.projects.map((project, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 py-4 border-grey border-b-4 relative"
                    >
                      {isEditingProjects && (
                        <button
                          className="absolute top-1 right-2 bg-blue-500 text-sm"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          <IoMdTrash />
                        </button>
                      )}
                      <div className="flex flex-col">
                        <label className="mb-2">Title</label>
                        <input
                          type="text"
                          className="p-2 rounded border-gray-300"
                          name="projectName"
                          value={project.projectName || ""}
                          onChange={(e) => handleProjectChange(index, e)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-2">Description</label>
                        <textarea
                          className="p-2 rounded border-gray-300"
                          name="projectDescription"
                          value={project.projectDescription || ""}
                          onChange={(e) => handleProjectChange(index, e)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-2">Project Link</label>
                        <input
                          type="text"
                          className="p-2 rounded border-gray-300"
                          name="projectLink"
                          value={project.projectLink || ""}
                          onChange={(e) => handleProjectChange(index, e)}
                        />
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        onClick={() => handleSaveProject(index)}
                      >
                        <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                        Project
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">Experience</h2>
                    <div className="flex gap-4">
                      <button
                        className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => setIsExperienceModalOpen(true)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <button
                        className="bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-100"
                        onClick={() => {
                          setIsEditingExperiences(!isEditingExperiences);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                  </div>
                  {data?.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 py-4 border-grey border-b-4 relative"
                    >
                      {isEditingExperiences && (
                        <button
                          className="absolute top-1 right-2 bg-blue-500 text-sm"
                          onClick={() => handleDeleteExperience(exp._id)}
                        >
                          <IoMdTrash />
                        </button>
                      )}
                      <div className="flex flex-col">
                        <label className="mb-2">Company Name</label>
                        <input
                          type="text"
                          className="p-2 rounded border-gray-300"
                          name="companyName"
                          value={exp.companyName || ""}
                          onChange={(e) => handleExperienceChange(index, e)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-2">Role</label>
                        <input
                          type="text"
                          className="p-2 rounded border-gray-300"
                          name="role"
                          value={exp.role || ""}
                          onChange={(e) => handleExperienceChange(index, e)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-2">Description</label>
                        <textarea
                          className="p-2 rounded border-gray-300"
                          name="description"
                          value={exp.description || ""}
                          onChange={(e) => handleExperienceChange(index, e)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-2">Company Link</label>
                        <input
                          type="text"
                          className="p-2 rounded border-gray-300"
                          name="companyLink"
                          value={exp.companyLink || ""}
                          onChange={(e) => handleExperienceChange(index, e)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-2">Start Date</label>
                        <DatePicker
                          selected={new Date(exp.startDate)}
                          onChange={(date) =>
                            handleDateChange(date, (date) => {
                              const updatedExperience = [...data.experience];
                              updatedExperience[index].startDate = date;
                              setData({
                                ...data,
                                experience: updatedExperience,
                              });
                            })
                          }
                          dateFormat="MMMM yyyy"
                          showMonthYearPicker
                          className="p-2 rounded border-gray-300"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-2">End Date</label>
                        {exp.isCurrentlyWorking ? (
                          <input
                            type="text"
                            className="p-2 rounded border-gray-300"
                            name="endDate"
                            value="Present"
                            readOnly
                          />
                        ) : (
                          <DatePicker
                            selected={new Date(exp.endDate)}
                            onChange={(date) =>
                              handleDateChange(date, (date) => {
                                const updatedExperience = [...data.experience];
                                updatedExperience[index].endDate = date;
                                setData({
                                  ...data,
                                  experience: updatedExperience,
                                });
                              })
                            }
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            className="p-2 rounded border-gray-300"
                          />
                        )}
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        onClick={() => handleSaveExperience(index)}
                      >
                        <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                        Experience
                      </button>
                    </div>
                  ))}
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

export default EditProfile;
