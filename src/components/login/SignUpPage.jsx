import React from "react";
import { useState } from "react";
// import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VerificationModal from "./VerficationModal.jsx";
import { IoClose } from "react-icons/io5";

// Important info for Backend Devs :

// The handling between Faculty, Student or Alumni Login is decided by the variable activeUser

// activeUser = 1 : Student Login
// activeUser = 2 : Faculty Login
// activeUser = 3 : Alumni Login

const InitialRegisterState = {
  type: "Student",
  userID: "",
  name: "",
  email: "",
  phoneNumber: "",
  DOB: "",
  password: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [activeUser, setactiveUser] = useState(1);
  const [imageOpacity, setImageOpacity] = useState(100);

  const [user, setUser] = useState(InitialRegisterState);

  function handleChange(e) {
    // console.log(e);
    const { id, value } = e.target;
    // console.log(id, " ", value);
    setUser({
      ...user,
      [id]: value,
    });
  }

  const handleButtonClick = (buttonNumber) => {
    const type =
      buttonNumber === 1
        ? "Student"
        : buttonNumber === 2
        ? "Faculty"
        : "Alumni";
    setUser({ type: type });
    setactiveUser(buttonNumber);
    setImageOpacity(0);
    setTimeout(() => setImageOpacity(1), 100);
  };
  const [showOtpModal, setShowOtpModal] = useState(false);
  const handleRegisterClick = () => {
    console.log(user);
    setShowOtpModal(true);
    setUser(InitialRegisterState);
  };
  const onOtpSubmit = () => {
    // alert("Login Successfull");
    navigate("/dashboard");
  };
  return (
    <div className="w-full h-screen bg-indigo-100 flex justify-center items-center">
      <div className="flex  items-center justify-center w-full h-5/6 bg-indigo-100">
        {/* Hero Image */}
        <div className="flex items-center align-center p-10 m-10">
          {activeUser === 1 && (
            <img
              src="/Images/LoginImages/StudentImage.png"
              alt="Alumni Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                opacity: imageOpacity,
                transition: "opacity 0.2s ease-in-out",
              }}
            />
          )}
          {activeUser === 2 && (
            <img
              src="/Images/LoginImages/FacultyImage.png"
              alt="Alumni Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                opacity: imageOpacity,
                transition: "opacity 0.2s ease-in-out",
              }}
            />
          )}
          {activeUser === 3 && (
            <img
              src="/Images/LoginImages/AlumniImage.png"
              alt="Alumni Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                opacity: imageOpacity,
                transition: "opacity 0.2s ease-in-out",
              }}
            />
          )}
        </div>
        {/* Form */}
        <div className="bg-white w-3/6 h-11/12  shadow-xl rounded-3xl p-3 m-6 flex flex-col items-center">
          <div className="bg-blue-100 rounded-full w-5/6 flex justify-center relative">
            {/* Sliding Button */}
            <button
              className=" absolute left-0 top-0 w-1/3"
              style={{
                borderRadius: "999px",
                // padding: 20,
                marginLeft:
                  activeUser === 1 ? "0" : activeUser === 2 ? "33%" : "67%",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 0 20px rgba(30, 58, 138, 0.7)",
                ":hover": {
                  backgroundColor: "#1e3a8a",
                },
              }}
            >
              <p className="font-extrabold">
                {activeUser === 1
                  ? "STUDENT"
                  : activeUser === 2
                  ? "FACULTY"
                  : "ALUMNI"}
              </p>
            </button>

            {/* Student Button */}
            <button
              onClick={() => handleButtonClick(1)}
              style={{
                backgroundColor: "#dbeafe",
                border: "none",
                borderRadius: "999px",
                cursor: "pointer",
                // padding: 20,
                transition: "all 0.2s ease-in-out",
                color: activeUser !== 1 ? "black" : "rgba(0, 0, 0, 0)",
                ":hover": {
                  backgroundColor: "#a0b9d9",
                },
              }}
              className="w-1/3 font-extrabold"
            >
              STUDENT
            </button>

            {/* Faculty Button */}
            <button
              onClick={() => handleButtonClick(2)}
              style={{
                backgroundColor: "#dbeafe",
                border: "none",
                borderRadius: "999px",
                cursor: "pointer",
                // padding: 20,
                transition: "all 0.2s ease-in-out",
                color: activeUser !== 2 ? "black" : "rgba(0, 0, 0, 0)",
                ":hover": {
                  backgroundColor: "#a0b9d9",
                },
              }}
              className="w-1/3 font-extrabold"
            >
              FACULTY
            </button>

            {/* Alumni Button */}
            <button
              onClick={() => handleButtonClick(3)}
              style={{
                backgroundColor: "#dbeafe",
                border: "none",
                borderRadius: "999px",
                cursor: "pointer",
                // padding: 13,
                transition: "all 0.2s ease-in-out",
                color: activeUser !== 3 ? "black" : "rgba(0, 0, 0, 0)",
                ":hover": {
                  backgroundColor: "#a0b9d9",
                },
              }}
              className="w-1/3 font-extrabold"
            >
              ALUMNI
            </button>
          </div>

          {/* Input Fields */}
          <div className="w-4/6 mt-4 flex flex-col p-3 text-blue-900 -m-3">
            <p className="font-bold text-lg p-2">Name</p>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={user.name}
              onChange={(e) => handleChange(e)}
              className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
            />
            <p className="font-bold text-lg p-2">
              {activeUser === 1
                ? "Student"
                : activeUser === 2
                ? "Faculty"
                : "Alumni"}{" "}
              ID
            </p>
            <input
              required
              type="number"
              id="userID"
              name="userID"
              placeholder={`Enter your ${
                activeUser === 1
                  ? "Student"
                  : activeUser === 2
                  ? "Faculty"
                  : "Alumni"
              } ID`}
              value={user.userID}
              onChange={(e) => handleChange(e)}
              className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
            />
            <p className="font-bold text-lg p-2">Email</p>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
              placeholder="Your Email Address"
              className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
            />
            <p className="font-bold text-lg p-2">Phone Number</p>
            <input
              required
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={(e) => handleChange(e)}
              placeholder="Your Phone Number"
              className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
            />
            <p className="font-bold text-lg p-2">Date Of Birth</p>
            <input
              required
              type="date"
              id="DOB"
              name="DOB"
              value={user.DOB}
              onChange={(e) => handleChange(e)}
              className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
            />
            <p className="font-bold text-lg p-2">Password</p>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
              placeholder="Password"
              className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
            />
            <button
              style={{
                boxShadow: "0 0 10px rgba(30, 58, 138, 0.7)",
              }}
              className=" text-lg font-bold w-1/3 text-white py-4 p-2 mb-8 rounded-full mx-auto my-4 hover:bg-blue-800 transition-all duration-200 ease-in-out"
              onClick={handleRegisterClick}
            >
              REGISTER
            </button>
          </div>
        </div>
        {/* OTP Verification Modal */}
        {showOtpModal ? (
          <div className="bg-overlay absolute bg-[#bccbe175] w-screen h-screen flex items-center justify-center">
            <div className="bg-white relative w-[90%] md:w-fit h-fit rounded-[16px] p-[1.5rem] flex flex-col items-center text-[#3A3285] gap-6 text-center pt-[2.5rem] pr-[2.5rem]">
              <div
                className="closeBtn absolute top-2 right-2 text-[2rem] cursor-pointer"
                onClick={() => {
                  setShowOtpModal(!showOtpModal);
                }}
              >
                <IoClose />
              </div>
              <h1 className="text-[2rem] font-bold">Verify phone number</h1>
              <h2>Enter OTP</h2>
              <VerificationModal
                length={4}
                onOtpSubmit={onOtpSubmit}
                setShowOtpModal={setShowOtpModal}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
