import React, { useContext, useEffect } from "react";
import Post from "../helper/post";
import { useNavigate } from "react-router-dom";
import DashBoardNavBar from "../helper/DashBoardNavBar";
import { useState } from "react";
import Notification from "../notification/notification";
import useScreenSize from "../../utils/useScreenSize";
import { TiMessages } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { Modal, Button, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";

async function handleImageExtraction(fileId) {
  try {
    const response = await fetch(`http://localhost:8080/images/${fileId}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return url;
    } else {
      return "Images/profile.jpg";
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

const Dashboard = () => {
  const [postData, setPostData] = useState();
  const navigate = useNavigate();
  const [comp, setComp] = useState("");
  const [opened, setOpened] = useState("home");
  const [openDrawer, setOpenDrawer] = useState(false);
  const { user, authToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);
  if (!authToken) {
    navigate("/login");
  }
  async function handleFetchPosts() {
    const response = await fetch("http://localhost:8080/api/posts");
    if (response.ok) {
      const data = await response.json();
      const structuredData = data.map((data) => {
        return {
          postId: data._id,
          time: data.uploadTime,
          userName: data.uploadedBy,
          avatar: "Images/profile.jpg",
          likes: data.likes,
          likesCount: data.likes.length,
          comments: data.commentsCount,
          postText: data.caption,
          fileId: data.fileId,
          link: data.link,
        };
      });
      const postsData = await Promise.all(
        structuredData.map(async (post) => {
          const imageUrlArray = [];
          const imageUrl = await handleImageExtraction(post.fileId);
          imageUrlArray.push(imageUrl);

          return { ...post, images: imageUrlArray };
        })
      );
      setPostData(postsData);
    }
  }
  useEffect(() => {
    handleFetchPosts();
  }, []);

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

  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async () => {
    const imageInput = imageInputRef.current;
    const imageFile = imageInput.files[0];

    if (!postText.trim()) {
      alert("Please enter some text for your post.");
      return;
    }

    if (!imageFile && !link.trim()) {
      alert("Please add an image or enter a link for your post.");
      return;
    }

    const formData = new FormData();
    formData.append("username", user.name);
    formData.append("caption", postText);
    formData.append("link", link);

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        handleFetchPosts();
        setIsModalOpen(false);
        setPostText("");
        setLink("");
        setImage(null);
        console.log("Posting successful");
      } else {
        console.error("Failed to create post.");
        alert("Failed to create post. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again later.");
    }
  };

  const handleAddLink = () => {
    setIsModalOpen(true);
  };

  function handleSavedClick() {
    navigate("/saved");
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
          <div className="w-80 relative ">
            <div className="w-5/6 relative pt-20 mt-16 rounded-md  bg-backgroundColor-bluecustom  text-white my-7 flex flex-col items-center md:mx-10">
              <div className="absolute -top-14 z-10 ">
                <img
                  src="Images/profile.jpg"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-black"
                />
              </div>
              <div className="text-center">
                <h2 className="font-bold text-lg">
                  {user && user.name.toUpperCase()}
                </h2>
                <p>Pragyan's {user && user.role}</p>
              </div>
              {/* Navigation Menu */}
              <div className="mt-4 w-full">
                <ul className="text-white text-sm md:text-md lg:text-lg w-full">
                  <hr />
                  <li>
                    <button
                      className="flex justify-between items-center w-full py-2 bg-backgroundColor-bluecustom hover:bg-backgroundColor-bluecustom text-white"
                      onClick={handleMessageClick}
                    >
                      <div className="text-base">Messages</div>{" "}
                      <TiMessages className="mr-0.5" />
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button
                      className="flex justify-between items-center w-full py-2  bg-backgroundColor-bluecustom hover:bg-backgroundColor-bluecustom text-white"
                      onClick={handleNotificationClick}
                    >
                      <div className="text-base">Notifications</div>

                      <IoIosNotificationsOutline className="text-2xl" />
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button className="flex justify-between items-center w-full py-2  bg-backgroundColor-bluecustom  hover:bg-backgroundColor-bluecustom text-white">
                      <div className="text-base">Events</div>{" "}
                      <AiOutlinePlus className="text-xl mr-0.5" />
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button className="flex justify-between w-full items-center py-2  bg-backgroundColor-bluecustom hover:bg-backgroundColor-bluecustom text-white">
                      <div className="text-base">Saved Items</div>{" "}
                      <MdOutlineBookmarkBorder className="text-x mr-0.5" />
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button
                      className="flex justify-between items-center w-full py-2  bg-backgroundColor-bluecustom hover:bg-backgroundColor-bluecustom text-white"
                      onClick={handleAdminClick}
                    >
                      <div className="text-base">Admin Login</div>{" "}
                      <FaArrowRight className="text-sm mr-1" />
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button
                      className="flex justify-between w-full items-center py-2 pb-2  bg-backgroundColor-bluecustom hover:bg-backgroundColor-bluecustom text-white"
                      onClick={handleAdminDashboardClick}
                    >
                      <div className="text-base">Admin Dashboard</div>{" "}
                      <FaArrowRight className="text-sm mr-1" />
                    </button>
                  </li>
                </ul>
              </div>
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
          } h-screen p-4 overflow-y-auto`}
        >
          {/* Example Post */}

          {comp !== "notification" && (
            <div className="w-11/12 mx-auto overflow-y ">
              <div className="w-2xl mx-auto mt-5">
                <div className="p-4 rounded-lg shadow-md bg-backgroundColor-lightgray">
                  <div className="flex items-center my-5">
                    <img
                      src="Images/profile.jpg"
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-black"
                    />
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-backgroundColor-gray hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-full w-full text-left"
                    >
                      Start a post
                    </button>
                  </div>
                  <div className="flex justify-between space-x-2 mt-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 flex items-center justify-center bg-backgroundColor-bluecustom text-xs sm:text-base text-white hover:bg-gray py-2 px-1 sm:px-4 rounded-lg"
                    >
                      <i className="fas fa-image mr-2"></i> Photo
                    </button>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 flex items-center justify-center bg-backgroundColor-bluecustom text-xs sm:text-base text-white hover:bg-gray py-2 px-1 sm:px-4 rounded-lg"
                    >
                      <i className="fas fa-edit mr-2"></i> Write Article
                    </button>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 flex items-center justify-center bg-backgroundColor-bluecustom text-xs sm:text-base text-white hover:bg-gray py-2 px-1 sm:px-4 rounded-lg"
                    >
                      <i className="fas fa-link mr-2"></i> Add Link
                    </button>
                  </div>
                </div>

                <Modal
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  size="small"
                  className="mx-3 sm:mx-auto"
                >
                  <Modal.Header className="text-xl font-bold">
                    Create a Post
                  </Modal.Header>
                  <Modal.Content className="flex flex-col gap-4">
                    <div className="flex items-center">
                      <img
                        src="Images/profile.jpg"
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-black"
                      />
                      <span className="font-semibold">Username</span>
                    </div>
                    <textarea
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="What do you want to talk about?"
                      className="w-full h-40 p-2 border border-gray-300 rounded-lg resize-none"
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={handleImageClick}
                        className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                      >
                        <i className="fas fa-image mr-2"></i> Add Image
                      </button>
                      <input
                        type="file"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <Input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter a link"
                        className="p-2 rounded-lg border border-gray-300"
                      />
                    </div>
                    {image && (
                      <img
                        src={image}
                        alt="Selected"
                        className="w-full max-h-72 object-cover mt-4 rounded-lg"
                      />
                    )}
                  </Modal.Content>
                  <Modal.Actions className="flex justify-end gap-2">
                    <Button
                      onClick={handlePostSubmit}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Post
                    </Button>
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </Button>
                  </Modal.Actions>
                </Modal>
              </div>

              <div className="flex items-center py-3">
                <hr className="flex-grow" />
                <p className="px-2 text-sm">Sort By : Dropdown</p>
              </div>
              {postData ? (
                postData.map((post, id) => {
                  return (
                    <Post
                      key={id}
                      uploadedTime={post.time}
                      username={post.username}
                      avatar={post.avatar}
                      images={post.images}
                      link={post.link}
                      likes={post.likes}
                      likesCount={post.likesCount}
                      comments={post.comments}
                      postText={post.postText}
                      postId={post.postId}
                      fileId={post.fileId}
                    />
                  );
                })
              ) : (
                <p className="text-center">loading...</p>
              )}
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
          <div className="w-1/4 h-screen relative text-white ">
            <div className="w-5/6 relative bg-backgroundColor-bluecustom px-3 py-2 rounded-md  mx-auto">
              <div className="mb-4 ">
                <h2 className="font-bold text-lg">Spotlights</h2>
              </div>
              {/* Styled Bullet Points for Important Notices */}
              <ul className="list-disc space-y-2">
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-white rounded-full mr-2"></span>{" "}
                  Important notice 1
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-white rounded-full mr-2"></span>{" "}
                  Important notice 2
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-white rounded-full mr-2"></span>{" "}
                  Important notice 3
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
