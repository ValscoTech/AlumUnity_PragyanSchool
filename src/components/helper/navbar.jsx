import React, { useEffect, useState } from "react";
import Mode_btn from "./mode_btn";
import handleAdminClick from "../dashboard/dashboard";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../utils/useScreenSize";

function ListLower() {
  const navigate = useNavigate();

  const lowerNavBarListClass =
    "flex px-2 text-indio-900 hover:text-indigo-500 cursor-pointer text-nowrap";
  return (
    <>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> About Us</p>
      </li>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> Campus</p>
      </li>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> Academics</p>
      </li>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> Co-Curricular</p>
      </li>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> School Life</p>
      </li>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> Admission</p>
      </li>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> News & Updates</p>
      </li>
      <li
        className={lowerNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <p className="p-1"> AlumUnity</p>
      </li>
      {/* <li className="font-semibold px-2 text-indio-900  cursor-pointer flex align-center">
              <Mode_btn />
            </li> */}
    </>
  );
}

function ListUpper() {
  const navigate = useNavigate();
  const aboveNavBarListClass =
    "flex p-1 text-indio-900 hover:text-indigo-500 cursor-pointer border-r-2 text-nowrap";
  return (
    <>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <img
          className="px-1"
          src="./src/assets/svgs/college_graduation.svg"
        ></img>
        <p className="p-1"> ADMISSION FORM</p>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <img className="px-1" src="./src/assets/svgs/phone.svg"></img>
        <p className="p-1"> CONTACT US</p>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <img className="px-1" src="./src/assets/svgs/people_2.svg"></img>
        <p className="p-1"> PARENT'S LOGIN</p>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <img className="px-1" src="./src/assets/svgs/people_2.svg"></img>
        <p className="p-1">ADMIN LOGIN</p>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
        // TODO Replace with the required path
      >
        <img className="px-1" src="./src/assets/svgs/suitcase.svg"></img>
        <p className="p-1">CAREERS</p>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="px-1" src="./src/assets/svgs/assignment.svg"></img>
        <p className="p-1">MANDATORY PUBLIC DISCLOSURE</p>
      </li>

      {/* <li className="font-semibold px-2 text-indio-900  cursor-pointer flex align-center">
                  <Mode_btn />
                </li> */}
    </>
  );
}

const Navbar = () => {
  const screenSize = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);
  function handleScroll() {
    setIsOpen(false);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // bg-[#F8F9FA]
  return (
    <>
      {isOpen && screenSize.width < 1000 && (
        <div className="fixed top-10 w-screen flex justify-end m-auto z-20">
          <div className="bg-white rounded-xl p-3">
            <ul>
              <ListUpper />
            </ul>
          </div>
        </div>
      )}
      <header className="bg-transparent">
        <div className="flex justify-between items-center w-screen">
          <div className=" text-white text-lg font-bold min-w-[200px]">
            <img className="" src="Images/logo.png" alt="" />
          </div>
          <div className={`max-w-[${screenSize.width - 200}] overflow-scroll`}>
            <nav className="overflow-scroll">
              {screenSize.width > 1000 && (
                <ul className="flex text-[0.6rem] justify-end">
                  <ListUpper />
                </ul>
              )}
              {screenSize.width < 1000 && (
                <div
                  className="flex pr-4 p-2 justify-end z-10"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    // console.log("Hello");
                  }}
                >
                  <img src="./src/assets/svgs/menu.svg" width="20px"></img>
                </div>
              )}
            </nav>

            <nav className="pt-2">
              <ul className="w-full flex space-x-4 xl:justify-end overflow-scroll">
                <ListLower />
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

