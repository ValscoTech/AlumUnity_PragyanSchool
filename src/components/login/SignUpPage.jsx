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
  dob: "",
  password: "",
  schoolCode: "",
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
  const sendOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/otp/request-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: user.phoneNumber }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Otp sent to the given phone number");
          return { success: true, message: "OTP verified successfully" };
        } else {
          return { success: false, message: data.message || "Invalid OTP" };
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return {
        success: false,
        message: "Failed to verify OTP. Please try again.",
      };
    }
  };

  const [showOtpModal, setShowOtpModal] = useState(false);
  const handleRegisterClick = () => {
    if (
      user.dob.trim().length === 0 ||
      !user.email.includes("@") ||
      user.password.trim().length === 0 ||
      user.phoneNumber.trim().length === 0 ||
      user.schoolCode.trim().length === 0 ||
      user.userID.trim().length === 0
    ) {
      alert("Fill the details properly!");
      return;
    }
    sendOtp();
    setShowOtpModal(true);
  };
  const onOtpSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          dob: user.dob,
          role: user.type,
          password: user.password,
          schoolCode: user.schoolCode,
          userID: user.userID,
        }),
      });
      if (response.ok) {
        setUser(InitialRegisterState);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full min-h-screen bg-indigo-100 flex justify-center items-center p-4 sm:p-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
        {/* Hero Image */}
        <div className="flex items-center justify-center p-4 sm:p-10 m-4 md:m-10 md:w-1/2">
          {activeUser === 1 && (
            <img
              src="/Images/LoginImages/StudentImage.png"
              alt="Student Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                opacity: imageOpacity,
                transition: "opacity 0.2s ease-in-out",
              }}
              className="w-24 md:w-48 lg:w-96"
            />
          )}
          {activeUser === 2 && (
            <img
              src="/Images/LoginImages/FacultyImage.png"
              alt="Faculty Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                opacity: imageOpacity,
                transition: "opacity 0.2s ease-in-out",
              }}
              className="w-24 md:w-48 lg:w-96"
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
              className="w-24 md:w-32 lg:w-56 xl:w-96"
            />
          )}
        </div>
        {/* Form */}
        <div className="bg-white w-full md:w-1/2 shadow-xl mx-4 md:mx-0 rounded-3xl p-4 lg:p-5 m-4 md:m-10 flex flex-col items-center">
          <div className="bg-blue-100 rounded-full w-full flex justify-center relative mb-4">
            {/* Sliding Button */}
            <button
              className="absolute left-0 top-0 w-1/3"
              style={{
                borderRadius: "999px",
                marginLeft:
                  activeUser === 1 ? "0%" : activeUser === 2 ? "33%" : "67%",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 0 20px rgba(30, 58, 138, 0.7)",
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
                transition: "all 0.2s ease-in-out",
                color: activeUser !== 1 ? "black" : "rgba(0, 0, 0, 0)",
              }}
              className="w-1/3 font-extrabold py-2"
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
                transition: "all 0.2s ease-in-out",
                color: activeUser !== 2 ? "black" : "rgba(0, 0, 0, 0)",
              }}
              className="w-1/3 font-extrabold py-2"
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
                transition: "all 0.2s ease-in-out",
                color: activeUser !== 3 ? "black" : "rgba(0, 0, 0, 0)",
              }}
              className="w-1/3 font-extrabold py-2"
            >
              ALUMNI
            </button>
          </div>

          {/* Input Fields */}
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="flex flex-col p-3 text-blue-900">
              <p className="font-bold text-lg p-2">Name</p>
              <input
                required
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={user.name}
                onChange={handleChange}
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
              />
              {activeUser === 1 && (
                <>
                  <p className="font-bold text-lg p-2">School Code</p>
                  <input
                    required
                    type="text"
                    id="schoolCode"
                    name="schoolCode"
                    placeholder="Your School Code"
                    value={user.schoolCode}
                    onChange={handleChange}
                    className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
                  />
                </>
              )}
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
                onChange={handleChange}
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
              />
              <p className="font-bold text-lg p-2">Email</p>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
              />
              <p className="font-bold text-lg p-2">Date Of Birth</p>
              <input
                required
                type="date"
                id="dob"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
              />
              <p className="font-bold text-lg p-2">Password</p>
              <input
                required
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full "
              />
              <button
                style={{
                  boxShadow: "0 0 10px rgba(30, 58, 138, 0.7)",
                }}
                className="text-base font-bold  w-2/3 sm:w-7/12 text-white py-4 p-2 mb-8 rounded-full mx-auto my-4 bg-blue-600 hover:bg-blue-800 transition-all duration-200 ease-in-out"
                onClick={handleRegisterClick}
              >
                REQUEST REGISTER
              </button>
            </div>
          </div>
        </div>
        {/* OTP Verification Modal */}
        {showOtpModal && (
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
                phoneNumber={user.phoneNumber}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
