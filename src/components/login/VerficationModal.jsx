import React, { useEffect, useRef, useState } from "react";

const VerificationModal = ({ length, onOtpSubmit = () => {}, phoneNumber }) => {
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const verifyOtp = async (combineOtp) => {
    try {
      const response = await fetch("http://localhost:3000/api/otp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp: combineOtp }),
      });

      const data = await response.json();

      if (data.success) {
        onOtpSubmit();
      } else {
        alert(data.message || "Invalid OTP");
        setOtp(new Array(length).fill(""));
        inputRefs.current[0].focus();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, e) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    const combineOtp = newOtp.join("");
    if (combineOtp.length === length) {
      setLoading(true);
      verifyOtp(combineOtp);
    }

    if (val && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <div className="otp-box flex gap-4">
        {otp.map((val, index) => (
          <input
            ref={(input) => (inputRefs.current[index] = input)}
            key={index}
            type="text"
            value={val}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput border-4 border-solid w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-center text-[1.2rem]"
          />
        ))}
      </div>
      {isLoading && (
        <div className="loader-container">
          <div className="loader border-4 rounded-full border-solid border-gray-200 border-t-blue-500 w-[2rem] h-[2rem] spin-animation"></div>
        </div>
      )}
    </>
  );
};

export default VerificationModal;
