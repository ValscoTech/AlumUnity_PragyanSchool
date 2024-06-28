import { useContext, useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const TripleLogin = () => {
  const [activeUser, setactiveUser] = useState(1);
  const [imageOpacity, setImageOpacity] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState(null);
  const [userData, setUserData] = useState({
    type: "Student",
    userID: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleButtonClick = (buttonNumber) => {
    const type =
      buttonNumber === 1
        ? "Student"
        : buttonNumber === 2
        ? "Faculty"
        : "Alumni";
    setUserData({ type: type });
    setactiveUser(buttonNumber);
    setImageOpacity(0);
    setTimeout(() => setImageOpacity(1), 100);
  };

  function handleChange(e) {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }
  function callBack() {
    navigate("/dashboard");
  }
  const handleLoginClick = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          userID: userData.userID,
          role: userData.type,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token.split(" ")[1];
        if (!token) {
          return;
        }
        login(token, callBack);

        setErrors(null);
      } else {
        const errorData = await response.json();
        setErrors(errorData.message || "Login Failed");
        setIsSubmitting(false);
        setUserData((pre) => {
          return {
            ...pre,
            email: "",
            password: "",
            userID: "",
          };
        });
      }
    } catch (err) {
      setErrors("Login Failed");
      console.log(err);
      setIsSubmitting(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-indigo-100 p-4 sm:p-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
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

        <div className="bg-white w-full md:w-1/2 shadow-xl mx-4 md:mx-0 rounded-3xl p-4 lg:p-5 m-4 md:m-10 flex flex-col items-center">
          <div className="bg-blue-100 rounded-full w-full flex justify-center relative mb-4">
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

          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="flex flex-col p-3 text-blue-900">
              <p className="font-bold text-lg p-2">
                {activeUser === 1
                  ? "Student"
                  : activeUser === 2
                  ? "Faculty"
                  : "Alumni"}{" "}
                ID
              </p>
              <input
                type="number"
                id="userID"
                name="userID"
                value={userData.userID}
                onChange={(e) => handleChange(e)}
                placeholder={`Enter your ${
                  activeUser === 1
                    ? "Student"
                    : activeUser === 2
                    ? "Faculty"
                    : "Alumni"
                } ID`}
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full"
              />
              <p className="font-bold text-lg p-2">Email</p>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={(e) => handleChange(e)}
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full"
                placeholder="Enter your email"
              />
              <p className="font-bold text-lg p-2">Password</p>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={(e) => handleChange(e)}
                className="px-4 py-2 border border-slate-500 text-blue-900 font-semibold shadow-sm rounded-full"
                placeholder="Enter your password"
              />

              <div className="flex gap-5 mx-auto mt-4">
                <button
                  disabled={isSubmitting}
                  style={{
                    boxShadow: "0 0 10px rgba(30, 58, 138, 0.7)",
                  }}
                  className="text-lg font-bold text-white py-3 px-4  rounded-full mx-auto bg-blue-600 hover:bg-blue-800 transition-all duration-200 ease-in-out"
                  onClick={handleLoginClick}
                >
                  {isSubmitting ? (
                    <span>Logging in...</span>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
                <button
                  style={{
                    boxShadow: "0 0 10px rgba(30, 58, 138, 0.7)",
                  }}
                  className="text-lg font-bold text-white py-3 px-4  rounded-full mx-auto bg-blue-600 hover:bg-blue-800 transition-all duration-200 ease-in-out"
                  onClick={handleSignupClick}
                >
                  SignUp
                </button>
              </div>
            </div>

            <div className="w-full flex flex-row items-center mt-4">
              <div className="w-1/3 bg-blue-900 h-0.5 scale-y-50"></div>
              <div className="w-1/3 text-sm font-medium text-center text-blue-900">
                or continue with
              </div>
              <div className="w-1/3 bg-blue-900 h-0.5 scale-y-50"></div>
            </div>

            <div className="flex w-1/2 mt-4 mb-5 mx-auto">
              <button
                style={{
                  boxShadow: "0 0 10px rgba(30, 58, 138, 0.7)",
                }}
                className="text-lg font-bold w-1/4 text-white p-2 rounded-full mx-auto hover:bg-blue-800 transition-all duration-200 ease-in-out"
              >
                <FaGoogle size={22} className="mx-auto m-2" />
              </button>
              <button
                style={{
                  boxShadow: "0 0 10px rgba(30, 58, 138, 0.7)",
                }}
                className="text-lg font-bold w-1/4 text-white p-2 rounded-full mx-auto hover:bg-blue-800 transition-all duration-200 ease-in-out"
              >
                <FaFacebook size={22} className="mx-auto" />
              </button>
              <button
                style={{
                  boxShadow: "0 0 10px rgba(30, 58, 138, 0.7)",
                }}
                className="text-lg font-bold w-1/4 text-white p-2 rounded-full mx-auto hover:bg-blue-800 transition-all duration-200 ease-in-out"
              >
                <FaTwitter size={22} className="mx-auto" />
              </button>
            </div>
            {errors && (
              <p className="text-red-600 text-center">{errors} Try Again</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripleLogin;
