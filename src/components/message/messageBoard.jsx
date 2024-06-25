import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import {
  FiBell,
  FiBookmark,
  FiCalendar,
  FiHome,
  FiMail,
  FiMenu,
  FiMessageCircle,
  FiMic,
  FiMicOff,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";
import { IoIosSend, IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import SchoolLogo from "../../assets/images/message/Schoollogo.png";
import NoProfile from "../../assets/images/message/groupiconwhite.png";
import ProfilePicture from "../../assets/images/message/profile.png";
import ChatSnippet from "./ChatSnippet";
import NavigationPanel from "./NavigationPanel";
import "./navigation.css";

const chatList = [
  {
    profileImage: null,
    name: "John Doe",
    Designation: "Student",
  },
  {
    profileImage: null,
    name: "Jane Smith",
    Designation: "Alumni",
  },
  {
    profileImage: null,
    name: "Ajax",
    Designation: "Student",
  },
  {
    profileImage: null,
    name: "Joeline",
    Designation: "Faculty",
  },
  {
    profileImage: null,
    name: "Nadira Sam",
    Designation: "Faculty",
  },
  {
    profileImage: null,
    name: "Hagrid Hash",
    Designation: "Alumni",
  },
  // Add more chat data as needed
];

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [clickMessage, setClickMessage] = useState("");
  const [chatOpened, setChatOpened] = useState({});
  const [recordedAudioURL, setRecordedAudioURL] = useState("");
  const [filteredChatList, setFilteredChatList] = useState(chatList);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNavPanelVisible, setIsNavPanelVisible] = useState(false);
  const profilePanelRef = useRef(null);

  useEffect(() => {
    setIsNavPanelVisible(false); // Ensuring the initial state is slide-out
  }, []);

  useEffect(() => {
    function scrollDown() {
      window.scrollTo(0, document.body.scrollHeight);
    }
    scrollDown();
  }, [messages]);

  const NavItem = ({ to, icon }) => {
    return (
      <Link
        to={to}
        className="flex items-center cursor-pointer py-2 transition duration-300 hover:bg-blue-500 hover:text-white hover:rounded-lg"
      >
        <span className="text-white">{icon}</span>
      </Link>
    );
  };

  const NavItem2 = ({ to, icon, label }) => {
    return (
      <Link
        to={to}
        className="flex items-center cursor-pointer py-2 transition duration-300 hover:bg-blue-500 hover:text-white hover:rounded-lg"
      >
        <span className="text-white p-2">{icon}</span>
        <span className="text-white">{label}</span>
      </Link>
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const obj = {
        status: "messageSend",
        message: newMessage,
        chatOpened,
      };
      console.log(obj);
      setMessages([
        ...messages,
        { type: "text", text: newMessage, sender: "me" },
      ]);
      setNewMessage("");
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleAudioRecord = async () => {
    let audioURL = "";
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          audioURL = URL.createObjectURL(blob);
          setRecordedAudioURL(audioURL);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        console.log("Recording started...");
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      mediaRecorder.stop();
      setIsRecording(false);
      console.log("Recording stopped...");
      const obj = {
        status: "messageSend",
        message: audioURL, // Use the captured audio URL here
        chatOpened,
      };
      console.log(obj);
      setMessages([
        ...messages,
        { type: "audio", url: audioURL, sender: "me" }, // Use type "audio" for audio messages
      ]);
      setNewMessage("");
      setRecordedAudioURL("");
    }
  };

  const handleSearch = () => {
    const filteredChats = chatList.filter((chat) =>
      chat.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredChatList(filteredChats);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profilePanelRef.current &&
        !profilePanelRef.current.contains(event.target)
      ) {
        setShowProfilePanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfilePanel = () => {
    setShowProfilePanel(!showProfilePanel);
  };

  const handleChatClick = (e, chat) => {
    if (chat === chatOpened) {
      return;
    }
    const obj = {
      status: "chatOpened",
      chat,
    };
    setChatOpened(chat);
    console.log(obj);
    setClickMessage(chat.name);
    setMessages([]);
    setIsChatOpen(true);
    setIsNavPanelVisible(false); // Close the hamburger menu when a chat is opened
  };
  function handleFileUploadClick(e) {
    const file = e.target.files[0];
    console.log(file);
    setMessages([
      ...messages,
      {
        type: "image",
        url: URL.createObjectURL(file),
        sender: "me",
      },
    ]);
  }

  const handleBackClick = () => {
    setIsChatOpen(false);
    setClickMessage("");
    setChatOpened({});
  };

  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === "Escape") {
        setClickMessage("");
        setIsChatOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscPress);
    return () => window.removeEventListener("keydown", handleEscPress);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div
        style={{ backgroundColor: "rgb(22, 53, 96)" }}
        className="p-3 flex items-center justify-between"
      >
        <div className="flex items-center bg-white">
          <img
            src={SchoolLogo}
            alt="School Logo"
            className="h-8 object-cover mr-4"
          />
        </div>
        <div className="flex items-center">
          <NavItem to="/notification" icon={<FiBell />} />
          <div className="flex items-center">
            <div className="overflow-hidden">
              <img
                src={ProfilePicture}
                alt="Profile"
                className="h-12 w-30 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="md:hidden">
          {!isChatOpen && (
            <div className="p-2">
              <button
                onClick={() => setIsNavPanelVisible(!isNavPanelVisible)}
                className="text-white focus:outline-none"
              >
                {isNavPanelVisible ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          )}
        </div>

        <div
          className={`fixed top-[70px] left-0 h-full w-3/6 md:w-1/5 bg-gray-800 z-20 ${
            isNavPanelVisible ? "slide-in" : "slide-out"
          }`}
        >
          <div className="flex justify-end p-2">
            <button
              onClick={() => setIsNavPanelVisible(false)}
              className="text-white focus:outline-none"
            >
              <FiX size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3 p-2">
            <NavItem2 to="/dashboard" icon={<FiHome />} label="Home" />
            <NavItem2 to="/messages" icon={<FiMessageCircle />} label="Message" />
            <NavItem2 to="/saved" icon={<FiBookmark />} label="Saved Items" />
            <NavItem2 to="/profile" icon={<FiUser />} label="Profile" />
            <NavItem2 to="/events" icon={<FiCalendar />} label="Events" />
            </div>
        </div>

        {!isChatOpen ? (
          <>
            {/* Left Navigation Panel */}
            <div className="w-full md:w-1/5 px-2 py-4 border-r flex flex-col items-left">
              <NavigationPanel />
            </div>

            {/* Chat Snippet */}
            <div className="w-full border-r p-4 overflow-y-scroll">
              <div className="h-10 mb-2">
                <h2
                  style={{ color: "#3A3285" }}
                  className="text-xl font-bold mb-1"
                >
                  Message
                </h2>
              </div>
              <div className="relative mb-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none bg-gray-100"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search"
                  />
                  <button
                    style={{ color: "#778CAB" }}
                    className="absolute right-1 bg-gray-100"
                    onClick={handleSearch} // Call handleSearch function on button click
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
              <div>
                {filteredChatList.map((chat, index) => (
                  <ChatSnippet
                    key={index}
                    profileImage={chat.profileImage}
                    name={chat.name}
                    designation={chat.Designation}
                    onClick={(e) => handleChatClick(e, chat)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Chat Panel */
          <div className="flex-1 flex flex-col">
            <div
              style={{ backgroundColor: "#204C89" }}
              className="h-16 p-1 flex items-center"
            >
              <div
                onClick={handleBackClick}
                className="text-white mr-4 cursor-pointer ml-2"
              >
                <IoMdArrowRoundBack size={25} />
              </div>

              <button
                onClick={toggleProfilePanel}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  cursor: "pointer",
                }}
              >
                <img src={NoProfile} className="w-12 h-12" alt="Profile" />
              </button>
              <h2 className="text-white ml-4">{clickMessage}</h2>
            </div>
            <div
              className={`flex-1`}
              style={{
                backgroundSize: "cover",
                backgroundImage:
                  "url(https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg)",
              }}
            >
              <div className="p-4">
                {messages.map((message, index) => {
                  return message.type === "text" ? (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.sender === "me" ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        style={{ backgroundColor: "rgb(22, 53, 96)" }}
                        className={`inline-block p-2 bg-blue-500 rounded-lg text-white`}
                      >
                        {message.text}
                      </span>
                    </div>
                  ) : message.type === "audio" ? (
                    <div
                      key={index}
                      className={`flex w-full ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      } items-center`}
                    >
                      <audio controls className="mb-4 m-2">
                        <source src={message.url} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className={`flex w-full ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <img
                        className={`mb-4 m-2 border-2 border-black`}
                        width={"200px"}
                        src={message.url}
                        alt="Uploaded content"
                      ></img>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white bottom-0 flex p-2">
              <div className="flex px-4 w-full mx-auto gap-2">
                <label htmlFor="fileInput">
                  <AiOutlinePlusSquare size={38} />
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUploadClick(e)}
                    style={{ display: "none" }}
                  />
                </label>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />

                <button
                  onClick={handleAudioRecord}
                  className="bg-blue-500 px-4 py-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  {isRecording ? (
                    <FiMicOff className="text-white" />
                  ) : (
                    <FiMic className="text-white" />
                  )}
                </button>

                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 px-4 py-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <IoIosSend className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Panel */}
        {showProfilePanel && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
              ref={profilePanelRef}
              className="fixed right-0 h-full text-white p-4 rounded-l-lg flex flex-col justify-center"
              style={{ backgroundColor: "#1E2D43" }}
            >
              <div className="flex items-center mb-4">
                <img src={NoProfile} alt="Profile" className="w-16 h-16 mr-4" />
                <div>
                  <h2 className="text-white">{clickMessage}</h2>
                  <div className="flex items-center mt-1">
                    <FiPhone className="text-white mr-2" />
                    <p>+1234567890</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <FiMail className="text-white mr-2" />
                    <p>example@example.com</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white mt-4 pt-4">
                <h3 className="text-white">About</h3>
                <div
                  className="about-text"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 0 5px white",
                    padding: "10px",
                  }}
                >
                  <p style={{ color: "white" }}>
                    Lorem ipsum dolor sit amet...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
