import React from "react";
import tick from "./bluecheckmark.png";
import ellipse1 from "./ellipse1.png";
import ellipse2 from "./ellipse2.png";
import businessman from "./businessman.png";
import person from "./person.png";
import NavBar from "../helper/navbar";

const approval_page = () => {
  return (
    <>
      <div className="w-5/6 mx-auto">
        {/* <div className='w-full h-16 bg-blue-900'></div> */}
        <div className="2xl:fixed top-[-100%]">
          <NavBar></NavBar>
        </div>
        <div className="md:max-w-2xl sm:flex ">
          <div className="md:shrink-0 md:h-full md:w-100">
            <div className="px-24 pt-16">
              <div className="text-6xl text-gray-500 font-bold pb-6">
                Approval Page
              </div>
              <div className="text-4xl text-blue-900 font-semibold">Alumni</div>

              <div className="h-0.5 w-28 bg-black mb-10"></div>
            </div>

            <AlumniCards
              regNo="2018B4A70633G"
              UserName="johndoe"
              DisplayName="John Doe"
              className="pr-20"
            />

            <div className="flex justify-center pt-14">
              <img src={tick} alt="tickmark" className="h-10 w-24" />
              <img src={tick} alt="tickmark" className="h-10 w-24" />
              <img src={tick} alt="tickmark" className="h-10 w-24" />
            </div>
          </div>

          <div className="static sm:flex sm:flex-row justify-center">
            <img
              src={ellipse1}
              style={{ height: "500px" }}
              className="hidden sm:absolute top-15 right-0 "
            />
            <img
              src={ellipse2}
              style={{ height: "350px" }}
              className="hidden sm:absolute bottom-0 right-0"
            />
            <img
              src={businessman}
              style={{ height: "350px" }}
              className="sm:absolute top-28 right-12"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const AlumniCards = (props) => {
  return (
    <>
      <div className="w-3/6 mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-xl">
            <table className="border-collapse w-full p-4">
              <tr>
                <td className="p-3 border text-sm text-center font-semibold text-gray-700">
                  Registration number
                </td>
                <td className="p-3 border text-sm  text-gray-700 ">
                  {props.regNo}
                </td>
              </tr>
              <tr>
                <td className="p-3 border text-sm text-center font-semibold text-gray-700">
                  User Name
                </td>
                <td className="p-3 border text-sm text-gray-800">
                  {props.UserName}
                </td>
              </tr>
              <tr>
                <td className="p-3 border text-sm text-center font-semibold text-gray-700">
                  Name
                </td>
                <td className="p-3 border text-sm text-gray-800">
                  {props.DisplayName}{" "}
                </td>
              </tr>
            </table>
          </div>

          <div className="flex-shrink-0">
            <img src={person} className="max-h-44 rounded-lg " alt="Person" />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="px-4">
            <button className="px-6 bg-green-700 py-3 text-lg text-white rounded-lg">
              Approve
            </button>
          </div>
          <div className="px-4">
            <button className="px-6 bg-red-700 py-3 text-lg text-white rounded-lg">
              Deny
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default approval_page;
