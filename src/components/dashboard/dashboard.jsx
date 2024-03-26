import React from "react";
import Post from "../helper/post";
import { useNavigate } from "react-router-dom";
import DashBoardNavBar from "../helper/DashBoardNavBar";
import { useState } from "react";
import Notification from "../notification/notification";
import useScreenSize from "../../utils/useScreenSize";
import { AiOutlineFileImage } from "react-icons/ai";
import { AiOutlineLink, AiOutlineCaretRight } from "react-icons/ai";

const temppostData = [
  {
    postId: 123,
    username: "John Doe",
    avatar: "Images/profile.jpg",
    images: ["Images/profile.jpg"],
    likes: 10,
    comments: 5,
    postText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae odio quis ex rhoncus ultricies. Etiam eget neque sed eros finibus aliquet sed nec mi. Morbi vitae aliquet tortor. Cras facilisis vehicula lectus, et finibus ante viverra imperdiet. Fusce nec urna non velit suscipit condimentum. Cras ipsum augue, ultricies a aliquet at, dignissim vel massa. Integer nec quam eu nisl auctor viverra. Aliquam lorem ligula, accumsan in posuere ut, rhoncus et nibh.    ",
  },
  {
    postId: 124,
    username: "Something",
    avatar: "Images/profile.jpg",
    images: ["Images/background.png", "Images/profile.jpg"],
    likes: 20,
    comments: 7,
    postText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae odio quis ex rhoncus ultricies. Etiam eget neque sed eros finibus aliquet sed nec mi. Morbi vitae aliquet tortor. Cras facilisis vehicula lectus, et finibus ante viverra imperdiet. Fusce nec urna non velit suscipit condimentum. Cras ipsum augue, ultricies a aliquet at, dignissim vel massa. Integer nec quam eu nisl auctor viverra. Aliquam lorem ligula, accumsan in posuere ut, rhoncus et nibh.    ",
  },
  {
    postId: 125,
    username: "John Doe",
    avatar: "Images/profile.jpg",
    images: ["Images/profile.jpg"],
    likes: 10,
    comments: 5,
    postText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae odio quis ex rhoncus ultricies. Etiam eget neque sed eros finibus aliquet sed nec mi. Morbi vitae aliquet tortor. Cras facilisis vehicula lectus, et finibus ante viverra imperdiet. Fusce nec urna non velit suscipit condimentum. Cras ipsum augue, ultricies a aliquet at, dignissim vel massa. Integer nec quam eu nisl auctor viverra. Aliquam lorem ligula, accumsan in posuere ut, rhoncus et nibh.    ",
  },
  {
    postId: 126,
    username: "Something",
    avatar: "Images/profile.jpg",
    images: ["Images/background.png"],
    likes: 20,
    comments: 7,
    postText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae odio quis ex rhoncus ultricies. Etiam eget neque sed eros finibus aliquet sed nec mi. Morbi vitae aliquet tortor. Cras facilisis vehicula lectus, et finibus ante viverra imperdiet. Fusce nec urna non velit suscipit condimentum. Cras ipsum augue, ultricies a aliquet at, dignissim vel massa. Integer nec quam eu nisl auctor viverra. Aliquam lorem ligula, accumsan in posuere ut, rhoncus et nibh.    ",
  },
];

const Dashboard = () => {
  const [postData, setPostData] = useState(temppostData);
  const navigate = useNavigate();
  const [comp, setComp] = useState("");
  const [opened, setOpened] = useState("home");
  const [openDrawer, setOpenDrawer] = useState(false);

  const [newPostText, setNewPostText] = useState("");
  const screenSize = useScreenSize();
  function handleAdminClick() {
    navigate("/approval");
  }

  function handleAdminDashboardClick() {
    navigate("/admindashboard");
  }

  function handleMessageClick() {
    navigate("/messages");
  }

  function handleNotificationClick() {
    // navigate("/notification");
    setComp((prev) => (prev === "notification" ? "" : "notification"));
    console.log(comp);
  }

  function handleUpdateClick() {
    navigate("/update");
  }

  function handleSavedClick() {
    navigate("/saved");
  }

  function handleInputTextChange(e) {
    // console.log(e);
    const { value } = e.target;
    // console.log(id, " ", value);
    setNewPostText(value);
  }

  function handleAddPost() {
    if (newPostText === "") {
      console.log("No Text Entered in input field");
      return;
    }
    const obj = {
      postId: Math.round(Math.random() * 1000),
      username: "John Doe",
      avatar: "Images/profile.jpg",
      images: ["Images/profile.jpg"],
      likes: 0,
      comments: 0,
      postText: newPostText,
    };
    setPostData((data) => [obj, ...data]);
    setNewPostText("");
    console.log(obj);
  }

  return (
    <div className="overflow-hidden">
      <div>
        <DashBoardNavBar
          opened={opened}
          setOpened={setOpened}
          setComp={setComp}
        />
      </div>
      <div className="w-full flex justify-between">
        {/* <div className="w-full px-16 bg-indigo-200 fixed">
          <Navbar />
        </div> */}
        {/* Profile Section */}
        {screenSize.width > 820 && (
          <div className="w-1/5 h-screen bg-indigo-200 p-4 flex flex-col items-center ">
            {/* <div className="pb-20">
            <img src="Images/logo.png" alt="" />
          </div> */}
            <div className="mb-4">
              <img
                src="Images/profile.jpg"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="text-blue-900 text-center">
              <h2 className="font-bold text-lg">John Doe</h2>
              <p>Pragyan's Alumini</p>
            </div>
            {/* Navigation Menu */}
            <div className="mt-4 w-4/5">
              <ul className="text-white space-y-2 text-sm md:text-md lg:text-lg ">
                <li>
                  <button
                    className="flex justify-between w-full bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-xl focus:outline-none"
                    onClick={handleMessageClick}
                  >
                    <div>Messages</div> 💬
                  </button>
                </li>
                <li>
                  <button
                    className="flex justify-between w-full bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-xl focus:outline-none"
                    onClick={handleNotificationClick}
                  >
                    <div>Notifications</div>
                    🔔
                  </button>
                </li>

                <li>
                  <button className="flex justify-between w-full bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-xl focus:outline-none">
                    <div>Saved Items</div> 🏷️
                  </button>
                </li>
                <li>
                  <button
                    className="flex justify-between w-full bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-xl focus:outline-none"
                    onClick={handleAdminClick}
                  >
                    <div>Admin Login</div> 🧑🏻‍💼
                  </button>
                </li>
                <li>
                  <button
                    className="flex justify-between w-full bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-xl focus:outline-none"
                    onClick={handleAdminDashboardClick}
                  >
                    <div>Admin Dashboard</div> 🧑🏻‍💼
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {screenSize.width < 820 && (
          <div
            className={`${
              openDrawer ? " text-white bg-[#163560]" : "w-1/12 text-black "
            } `}
          >
            <ul className="">
              {/* Box to open */}
              <li
                className="p-2 flex cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  setOpenDrawer((prev) => !prev);
                }}
              >
                <div>
                  <div className="p-[1px]">
                    <svg
                      width="24"
                      height="4"
                      viewBox="0 0 24 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="24"
                        height="4"
                        rx="2"
                        fill={`${openDrawer ? "#FFFFFF" : "#163560"}`}
                      />
                    </svg>
                  </div>
                  <div className="p-[1px]">
                    <svg
                      width="24"
                      height="4"
                      viewBox="0 0 24 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="24"
                        height="4"
                        rx="2"
                        fill={`${openDrawer ? "#FFFFFF" : "#163560"}`}
                      />
                    </svg>
                  </div>
                  <div className="p-[1px]">
                    <svg
                      width="24"
                      height="4"
                      viewBox="0 0 24 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="24"
                        height="4"
                        rx="2"
                        fill={`${openDrawer ? "#FFFFFF" : "#163560"}`}
                      />
                    </svg>
                  </div>
                </div>
              </li>
              {/* Home Button */}
              <li
                className="p-2 flex cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <div className="p-[1px]">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.97881 9.21L0.00195312 9.21016V7.61145L10.9983 0L21.9982 7.61145V9.21H20.0179V19.1807H13.0169V13.2048H9.1351V19.1807H1.97881V9.21Z"
                      fill={`${openDrawer ? "#FFFFFF" : "#163560"}`}
                    />
                  </svg>
                </div>
                {openDrawer && <div className="px-2">Home</div>}
              </li>
              {/* Messages */}
              <li
                className="p-2 flex cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  navigate("/messages");
                }}
              >
                <div className="p-[1px]">
                  {openDrawer ? (
                    <svg
                      width="22"
                      height="19"
                      viewBox="0 0 22 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.59375 7.32568H10.956"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3173 7.32544C15.3173 10.2734 12.3859 12.6577 8.7739 12.6577L7.96252 13.5109L7.48267 14.0137C7.07261 14.4402 6.28739 14.3488 6.01693 13.8384L4.84784 11.5912C3.25997 10.6162 2.23047 9.06985 2.23047 7.32544C2.23047 4.37745 5.16193 1.99316 8.7739 1.99316C11.4087 1.99316 13.6858 3.2653 14.7066 5.09351C15.0992 5.77147 15.3173 6.5256 15.3173 7.32544Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.68 10.266C19.68 12.0105 18.6505 13.5568 17.0626 14.5319L15.8935 16.779C15.6231 17.2894 14.8378 17.3885 14.4278 16.9543L13.1366 15.5983C11.0252 15.5983 9.14071 14.7832 7.96289 13.5111L8.77427 12.658C12.3862 12.658 15.3177 10.2737 15.3177 7.32568C15.3177 6.52584 15.0996 5.77171 14.707 5.09375C17.5599 5.66507 19.68 7.76749 19.68 10.266Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="19"
                      viewBox="0 0 22 19"
                      fill={`${openDrawer ? "#FFFFFF" : "#163560"}`}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.59375 7.50635H10.956"
                        stroke={`${openDrawer ? "#000000" : "#FFFFFF"}`}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3193 7.5061C15.3193 10.4541 12.3878 12.8384 8.77585 12.8384L7.96448 13.6915L7.48462 14.1943C7.07457 14.6209 6.28935 14.5295 6.01888 14.0191L4.84979 11.7719C3.26192 10.7969 2.23242 9.25052 2.23242 7.5061C2.23242 4.55812 5.16388 2.17383 8.77585 2.17383C11.4107 2.17383 13.6878 3.44596 14.7086 5.27417C15.1012 5.95213 15.3193 6.70626 15.3193 7.5061Z"
                        stroke={`${openDrawer ? "#000000" : "#FFFFFF"}`}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.6819 10.4467C19.6819 12.1911 18.6524 13.7375 17.0646 14.7126L15.8955 16.9597C15.625 17.4701 14.8398 17.5691 14.4297 17.1349L13.1385 15.779C11.0272 15.779 9.14266 14.9639 7.96484 13.6918L8.77622 12.8386C12.3882 12.8386 15.3197 10.4543 15.3197 7.50635C15.3197 6.7065 15.1015 5.95237 14.7089 5.27441C17.5619 5.84573 19.6819 7.94815 19.6819 10.4467Z"
                        stroke={`${openDrawer ? "#000000" : "#FFFFFF"}`}
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {openDrawer && <div className="px-2">Messages</div>}
              </li>
              {/* Archive */}
              <li className="p-2 flex cursor-pointer hover:bg-blue-700">
                <div className="p-[1px]">
                  {openDrawer ? (
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.0625 8.94238V16.6249C17.0625 18.3749 16.625 19.2499 14.4375 19.2499H6.5625C4.375 19.2499 3.9375 18.3749 3.9375 16.6249V8.94238"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.375 1.75H16.625C18.375 1.75 19.25 2.625 19.25 4.375V6.125C19.25 7.875 18.375 8.75 16.625 8.75H4.375C2.625 8.75 1.75 7.875 1.75 6.125V4.375C1.75 2.625 2.625 1.75 4.375 1.75Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.9082 12.25H12.0932"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5625 9.12305V16.8055C17.5625 18.5555 17.125 19.4305 14.9375 19.4305H7.0625C4.875 19.4305 4.4375 18.5555 4.4375 16.8055V9.12305"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.875 1.93066H17.125C18.875 1.93066 19.75 2.80566 19.75 4.55566V6.30566C19.75 8.05566 18.875 8.93066 17.125 8.93066H4.875C3.125 8.93066 2.25 8.05566 2.25 6.30566V4.55566C2.25 2.80566 3.125 1.93066 4.875 1.93066Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.4082 12.4307H12.5932"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {openDrawer && <div className="px-2">Archive</div>}
              </li>
              {/* Profile */}
              <li
                className="p-2 flex cursor-pointer hover:bg-blue-700"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <div className="p-[1px]">
                  {openDrawer ? (
                    <svg
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6366 10.4697C13.0841 10.4697 15.0681 8.51663 15.0681 6.10741C15.0681 3.69818 13.0841 1.74512 10.6366 1.74512C8.18914 1.74512 6.20508 3.69818 6.20508 6.10741C6.20508 8.51663 8.18914 10.4697 10.6366 10.4697Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.2482 19.1941C18.2482 15.8177 14.8359 13.0869 10.6349 13.0869C6.43376 13.0869 3.02148 15.8177 3.02148 19.1941"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0018 10.6504C13.4493 10.6504 15.4334 8.6973 15.4334 6.28807C15.4334 3.87884 13.4493 1.92578 11.0018 1.92578C8.55438 1.92578 6.57031 3.87884 6.57031 6.28807C6.57031 8.6973 8.55438 10.6504 11.0018 10.6504Z"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.6135 19.3748C18.6135 15.9984 15.2012 13.2676 11.0001 13.2676C6.79899 13.2676 3.38672 15.9984 3.38672 19.3748"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {openDrawer && <div className="px-2">Profile</div>}
              </li>
              {/* Events */}
              <li className="p-2 flex cursor-pointer hover:bg-blue-700">
                <div className="p-[1px]">
                  {openDrawer ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.90289 0.00603207L9 0C9.39468 0 9.72039 0.295343 9.76816 0.67708L9.77419 0.774194V8.22581H17.2258C17.6205 8.22581 17.9462 8.52115 17.994 8.90289L18 9C18 9.39469 17.7047 9.72039 17.3229 9.76816L17.2258 9.77419H9.77419V17.2258C9.77419 17.6205 9.47885 17.9462 9.09711 17.994L9 18C8.60532 18 8.27961 17.7047 8.23184 17.3229L8.22581 17.2258V9.77419H0.774194C0.379509 9.77419 0.0538049 9.47885 0.00603207 9.09711L0 9C0 8.60532 0.295343 8.27961 0.67708 8.23184L0.774194 8.22581H8.22581V0.774194C8.22581 0.379509 8.52115 0.0538049 8.90289 0.00603207Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.90289 0.125661L9 0.119629C9.39468 0.119629 9.72039 0.414972 9.76816 0.796709L9.77419 0.893823V8.34544H17.2258C17.6205 8.34544 17.9462 8.64078 17.994 9.02252L18 9.11963C18 9.51431 17.7047 9.84002 17.3229 9.88779L17.2258 9.89382H9.77419V17.3454C9.77419 17.7401 9.47885 18.0658 9.09711 18.1136L9 18.1196C8.60532 18.1196 8.27961 17.8243 8.23184 17.4425L8.22581 17.3454V9.89382H0.774194C0.379509 9.89382 0.0538049 9.59848 0.00603207 9.21674L0 9.11963C0 8.72494 0.295343 8.39924 0.67708 8.35147L0.774194 8.34544H8.22581V0.893823C8.22581 0.499138 8.52115 0.173434 8.90289 0.125661Z"
                        fill="#2E3B5B"
                      />
                    </svg>
                  )}
                </div>
                {openDrawer && <div className="px-2">Events</div>}
              </li>
            </ul>
          </div>
        )}

        {/* Posts Section */}
        <div
          className={`${
            screenSize.width > 820 ? "w-3/5" : "w-11/12"
          } h-screen bg-gray-200 p-4 overflow-y-auto`}
        >
          {/* Example Post */}

          {comp !== "notification" && (
            <div className="w-4/5 mx-auto border overflow-y ">
              <div className="bg-white p-4 pb-2 rounded-xl mb-4 ">
                <div className="flex items-center mb-3 align-top">
                  <img
                    src="Images/profile.jpg"
                    alt={` avatar`}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div className="w-full">
                    <div>
                      <input
                        type="text"
                        value={newPostText}
                        onChange={(e) => handleInputTextChange(e)}
                        className="bg-slate-200 p-3 rounded-3xl w-full font-semibold placeholder:text-stone-600"
                        placeholder="Start A Post"
                      ></input>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="cursor-pointer mx-2">
                          <div className="flex p-2 mt-2">
                            <div>
                              <AiOutlineFileImage size={22} />
                            </div>
                            <div className="pl-1">Add Image</div>
                          </div>
                        </div>
                        <div className="cursor-pointer mx-2">
                          <div className="flex p-2 mt-2">
                            <div>
                              <AiOutlineLink size={22} />
                            </div>
                            <div className="pl-1">Add Link</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer mx-2"
                        onClick={(e) => handleAddPost(e)}
                      >
                        <div className="flex p-2 ">
                          <div className="p-2 bg-slate-100 rounded-xl">
                            Add Post
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {postData.map((post, id) => {
                // console.log(post);
                return (
                  <Post
                    key={id}
                    username={post.username}
                    avatar={post.avatar}
                    images={post.images}
                    likes={post.likes}
                    comments={post.comments}
                    postText={post.postText}
                    postId={post.postId}
                  />
                );
              })}
            </div>
          )}

          {comp === "notification" && (
            <div className="w-4/5 mx-auto border overflow-y">
              <Notification />
            </div>
          )}

          {/* Add more posts as needed */}
        </div>

        {/* Spotlights Section */}
        {screenSize.width > 820 && (
          <div className="w-1/5 h-screen bg-indigo-200 p-4">
            <div className="w-4/5  mx-auto">
              <div className="mb-4">
                <h2 className="text-blue-900 font-bold text-xl pt-20">
                  Spotlights
                </h2>
              </div>
              {/* Styled Bullet Points for Important Notices */}
              <ul className="text-blue-900 list-disc pl-4 space-y-2">
                <li className="flex items-center">🎯Important notice 1</li>
                <li className="flex items-center">🎯Important notice 2</li>
                <li className="flex items-center">🎯Important notice 3</li>
                {/* Add more styled bullet points as needed */}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
