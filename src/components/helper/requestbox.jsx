import React from "react";
import user1 from "../../assets/images/users/user1.png";
import user2 from "../../assets/images/users/user2.png";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
const requestbox = () => {
  const req_users = [
    {
      userImg: user1,
      userName: "Marie Clark",
      userType: "Student",
    },
    {
      userImg: user2,
      userName: "Kathleen Sink",
      userType: "Faculty",
    },
    {
      userImg: user1,
      userName: "Steve Korn",
      userType: "Alumni",
    },
    {
      userImg: user2,
      userName: "Tom Karen",
      userType: "Alumni",
    },
    {
      userImg: user1,
      userName: "Mark Seeds",
      userType: "Alumni",
    },
  ];

  function handleApprove(e, user) {
    const obj = {
      status: "Approved",
      user,
    };
    console.log(obj);
  }

  function handleDeny(e, user) {
    const obj = {
      status: "Denied",
      user,
    };
    console.log(obj);
  }
  return (
    <div className="request-box bg-sky-800 dark:bg-gray-900 text-white text-[12px] rounded-lg p-[2rem] w-[320px]">
      <div className="request-box-head border-[#17171733] border-b-4 py-4 flex">
        <span className="uppercase me-auto">Requests</span>
        <button className="p-0 bg-transparent uppercase hover:font-bold">
          View all
        </button>
      </div>
      <div className="request-box-content cursor-pointer">
        {req_users.map((user, index) => {
          return (
            <div
              className="request flex py-2 items-center gap-4 justify-between"
              key={index}
            >
              <div className="req-details flex gap-2 items-center">
                <img
                  src={user.userImg}
                  alt={user.userName}
                  className="rounded-full w-[50px]"
                />
                <div className="req-user-details flex flex-col justify-center">
                  <span className="req-user-name block font-bold">
                    {user.userName}
                  </span>
                  <span className="req-user-type block text-[10px]">
                    {user.userType}
                  </span>
                </div>
              </div>
              <div className="req-action flex gap-4 text-[14px]">
                <button
                  className="rounded-full p-2 bg-green-500"
                  onClick={(e) => handleApprove(e, user)}
                >
                  <FaCheck />
                </button>
                <button
                  className="rounded-full p-2 bg-red-500"
                  onClick={(e) => handleDeny(e, user)}
                >
                  <ImCross />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default requestbox;
