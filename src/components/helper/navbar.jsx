import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../utils/useScreenSize";

function ListLower() {
  const navigate = useNavigate();
  const lowerNavBarListClass =
    "flex p-2 text-indigo-900 hover:text-indigo-500 cursor-pointer border-r-3 text-nowrap";
  return (
    <>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">ABOUT US</p>
        </div>
      </li>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">CAMPUS</p>
        </div>
      </li>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">ACADEMICS</p>
        </div>
      </li>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">CO-CURRICULAR</p>
        </div>
      </li>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">SCHOOL LIFE</p>
        </div>
      </li>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">ADMISSION</p>
        </div>
      </li>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">NEWS & UPDATES</p>
        </div>
      </li>
      <li
        className={`${lowerNavBarListClass} md:w-auto shadow-md hover:shadow-lg transform hover:scale-110 `}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <p className="p-1">ALUMUNITY</p>
        </div>
      </li>
    </>
  );
}

function ListUpper() {
  const navigate = useNavigate();
  const aboveNavBarListClass =
    "flex p-1 text-indigo-900 hover:text-indigo-500 cursor-pointer border-r-3 text-nowrap";
  return (
    <>
      <li
        className={`${aboveNavBarListClass} md:w-auto`}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <img
            className="w-6 h-6 md:w-auto md:h-auto"
            src="./src/assets/svgs/college_graduation.svg"
            alt="Admission Form"
          />
          <p className="p-1 ml-2">ADMISSION FORM</p>
        </div>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <img
            className="w-6 h-6 md:w-auto md:h-auto"
            src="./src/assets/svgs/phone.svg"
            alt="phone"
          />
          <p className="p-1 ml-2">CONTACT US</p>
        </div>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <img
            className="w-6 h-6 md:w-auto md:h-auto"
            src="./src/assets/svgs/people_2.svg"
            alt="people_2"
          />
          <p className="p-1 ml-2">PARENT'S LOGIN</p>
        </div>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <img
            className="w-6 h-6 md:w-auto md:h-auto"
            src="./src/assets/svgs/people_2.svg"
            alt="people_2"
          />
          <p className="p-1 ml-2">ADMIN LOGIN</p>
        </div>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <img
            className="w-6 h-6 md:w-auto md:h-auto"
            src="./src/assets/svgs/suitcase.svg"
            alt="suitcase"
          />
          <p className="p-1 ml-2">CAREERS</p>
        </div>
      </li>
      <li
        className={aboveNavBarListClass}
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex items-center px-3 py-1 rounded-md hover:bg-gray-300">
          <img
            className="w-6 h-6 md:w-auto md:h-auto"
            src="./src/assets/svgs/assignment.svg"
            alt="assignment"
          />
          <p className="p-1 ml-2">MANDATORY PUBLIC DISCLOSURE</p>
        </div>
      </li>
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

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding-top: 117px; /* Adjust this value to match the height of your navbar */
          }
        `}
      </style>

      {isOpen && screenSize.width < 1200 && (
        <div className="fixed top-10 w-screen flex justify-end z-20">
          <div className="bg-white rounded-xl p-3">
            <ul>
              <ListUpper />
              <ListLower />
            </ul>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 w-full bg-white z-30 shadow-md">
        <div className="flex justify-between items-center w-full px-4 py-2">
          <div className="text-indigo-900 text-lg font-bold">
            <img className="h-10 md:h-12" src="Images/logo.png" alt="Logo" />
          </div>

          <div className="flex items-center">
            {screenSize.width < 1200 && (
              <div
                className="pr-4 cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <img src="./src/assets/svgs/menu.svg" width="20px" alt="Menu" />
              </div>
            )}

            {screenSize.width >= 1200 && (
              <nav className="hidden md:block">
                <ul className="flex text-sm justify-end space-x-6">
                  <ListUpper />
                </ul>
              </nav>
            )}
          </div>
        </div>
        {screenSize.width >= 1200 && (
          <nav className="hidden md:block w-full bg-white">
            <ul className="flex text-sm justify-end space-x-6 px-4 py-2">
              <ListLower />
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
