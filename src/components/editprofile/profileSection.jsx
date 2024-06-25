import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { currentUser, projects, skills, exps } from "./UserData";
const ProfileSection = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  return (
    <section className="profile_section flex flex-col gap-[3rem]">
      <div className="user-about px-[2rem]">
        <h2 className="text-[18px] font-bold">About</h2>
        <p>{currentUser.userDesc}</p>
      </div>
      <hr className="bg-gray-900" />
      <div className="project_section px-[2rem]">
        <h2 className="text-[18px] font-bold">
          Projects
          <span className="text-[#747474]">
            {" "}
            {showProjects ? projects.length + " of " : "3 of "}
            {projects.length}
          </span>
        </h2>
        <div className="projects_lists m-4">
          {projects
            .slice(0, showProjects ? projects.length : 3)
            .map((project, index) => (
              <div
                className="project_container flex flex-col gap-4 py-4 border-grey border-b-4"
                key={index}
              >
                <div className="project_details_head ">
                  <h3 className="font-bold text-[16px]">
                    {project.projecTitle}
                  </h3>
                  <h4 className="text-[#747474] text-[16px]">
                    {project.projectTime}
                  </h4>
                </div>
                <button className="text-[16px] w-fit py-2 px-4 bg-transparent text-[#747474] flex gap-2 items-center rounded-[32px] border-black dark:border-white border-2">
                  <span>Show Project</span>
                  <FaExternalLinkAlt />
                </button>
                <p className="text-[16px] text-[#747474]">
                  {project.projectDesc}
                </p>
              </div>
            ))}
        </div>
        <button
          className="text-[#0B73DA] bg-transparent p-0"
          onClick={() => setShowProjects(!showProjects)}
        >
          Show ALL ({projects.length})
        </button>
      </div>
      <hr className="bg-gray-900" />
      <div className="skills_section px-[2rem]">
        <h2 className="text-[18px] font-bold">Skills</h2>
        <div className="skills_list my-4 flex flex-wrap gap-4">
          {skills
            .slice(0, showSkills ? skills.length : 3)
            .map((skill, index) => (
              <div
                className="skills_container flex flex-1 justify-between p-4 h-[80px] border-[rgba(23, 23, 23, 0.20)] border-4 gap-4 items-center min-w-[175px]"
                key={index}
              >
                <h3 className="font-bold text-[16px]">{skill.title}</h3>
                <span className="text-[#0B73DA] font-bold">{skill.score}</span>
              </div>
            ))}
        </div>
        <button
          className="text-[#0B73DA] bg-transparent p-0"
          onClick={() => setShowSkills(!showSkills)}
        >
          Show ALL ({skills.length})
        </button>
      </div>
      <hr className="bg-gray-900" />
      <div className="experience_section px-[2rem]">
        <h2 className="text-[18px] font-bold">Experience</h2>
        <div className="experience_list my-4 flex flex-col gap-4">
          {exps.map((exp, index) => (
            <div
              className="exp_container flex flex-1 justify-between p-4 border-[rgba(23, 23, 23, 0.20)] border-b-4 gap-4 text-[14px]"
              key={index}
            >
              <div className="exp-img rounded-full bg-[#F59B2D] w-[75px] h-[75px] aspect-square"></div>
              <div className="exp_details flex flex-col gap-3 text-[#747474]">
                <h3 className="font-bold text-[16px] text-black dark:text-white">
                  {exp.title}
                </h3>
                <h4 className="flex gap-8 items-center">
                  <span className="font-semibold">{exp.company}</span>
                  <span>{exp.type}</span>
                </h4>
                <h5 className="flex gap-8 items-center">
                  <div className="exp_time_period">
                    <span>{exp.start}</span> - <span>{exp.end}</span>
                  </div>
                  <span className="text-[#0B73DA]">{exp.time}</span>
                </h5>
                <p>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
