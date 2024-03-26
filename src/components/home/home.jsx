import React from "react";
import img from "../../../public/Images/diploma.png";
import img4 from "../../../public/Images/background.png";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Navbar from "../helper/navbar";

function Home() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/onboarding1");
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        className="flex flex-col sm:flex-col "
        style={{ backgroundColor: "#1E2D43" }}
      >
        <div>
          <img className="w-full h-1/2" src={img4} alt="" />
        </div>

        <div className="mt-12  mx-auto flex flex-col gap-4 md:flex-row pl-8">
          <div className="lg:w-1/3 flex flex-col">
            <div className="flex flex-col justify-center items-center mx-auto">
              <div className="w-80 h-40 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                <p
                  className="text-4xl lg:text-5xl font-bold"
                  style={{ color: "#1E3C4E" }}
                >
                  PRAGYAN <br /> SCHOOL
                </p>
              </div>
              <div className="mt-12 flex ">
                <button
                  className="bg-yellow-500 w-28 text-white px-6 py-3 rounded-3xl"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
              <div className="flex w-2/3 m-3 mt-8 ">
                <button className=" text-lg font-bold w-1/4 text-white p-2 rounded-full mx-auto my-4 hover:bg-blue-900 transition-all duration-200 ease-in-out">
                  <FaGoogle size={22} className="mx-auto m-3" />
                </button>
                <button className=" text-lg font-bold w-1/4 text-white p-2 rounded-full mx-auto my-4 hover:bg-blue-800 transition-all duration-200 ease-in-out">
                  <FaFacebook size={22} className="mx-auto " />
                </button>
                <button className=" text-lg font-bold w-1/4 text-white p-2 rounded-full mx-auto my-4 hover:bg-blue-800 transition-all duration-200 ease-in-out">
                  <FaTwitter size={22} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex  lg:w-1/3 h-full justify-center	">
            <img
              loading="lazy"
              src={img}
              className="h-96 object-contain object-center overflow-hidden"
            />
          </div>

          <div className=" lg:w-1/3  mt-4 ">
            <h1 className=" text-center text-white text-md font-bold font-['Poppins'] leading-10">
              ABOUT
            </h1>
            <p className="mt-8 text-center p-2 text-white">
              Established in 2002 , Pragyan is one of the finest schools of
              Noida - Greater Noida. Set on a beautiful campus of 10 acres, we
              are a coeducational K-12 school affiliated to CBSE. Our extended
              hours upto 4 pm allow students to have more time
              <br /> to Study as well as pursue wider interests in Sport, Art ,
              Dance and Music. Pragyan School is committed to be an educational
              institution of excellence which provides all-round comprehensive
              quality education in a safe environment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
