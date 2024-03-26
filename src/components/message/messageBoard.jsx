import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import ChatSnippet from "./ChatSnippet";
import NoProfile from "../../assets/images/message/groupiconwhite.png";
import SchoolLogo from "../../assets/images/message/Schoollogo.png";
import ProfilePicture from "../../assets/images/message/profile.png";
import NavigationPanel from "./NavigationPanel";
import { IoIosSend } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";

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
  const [clickMessage, setclickMessage] = useState("");
  const [chatOpened, setChatOpended] = useState({});

  useEffect(() => {
    function scrollDown() {
      window.scrollTo(0, document.body.scrollHeight);
    }
    scrollDown();
  }, [messages]);

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

  const handleChatClick = (e, chat) => {
    if (chat === chatOpened) {
      return;
    }
    const obj = {
      status: "chatOpened",
      chat,
    };
    setChatOpended(chat);
    console.log(obj);
    setclickMessage(chat.name);
    setMessages([]);
  };

  function handleFileUploadClick(e) {
    const file = e.target.files[0];
    console.log(file);
    // setFile([...file, );
    setMessages([
      ...messages,
      {
        type: "image",
        url: URL.createObjectURL(e.target.files[0]),
        sender: "me",
      },
    ]);

    // console.log(e);
  }

  function handleEscPress(e) {
    // console.log(e);
    if (e.key !== "Escape") {
      return;
    }
    setclickMessage("");
  }

  useEffect(() => {
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
          <FiBell className="text-white mr-4 cursor-pointer" />
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
        {/* Left Navigation Panel */}
        <div className="w-full md:w-1/5 px-2 py-4 border-r flex flex-col items-left">
          <NavigationPanel />
        </div>

        {/* Chat Snippet */}
        <div className="sm:w-2/5 md:w-1/4 border-r p-4 overflow-y-scroll">
          <div className="h-10 mb-2">
            <h2 style={{ color: "#3A3285" }} className="text-xl font-bold mb-1">
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
              >
                <FaSearch />
              </button>
            </div>
          </div>
          <div>
            {chatList.map((chat, index) => (
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

        {/* Chat Panel */}
        {clickMessage !== "" && (
          <div className="md:w-3/5 sm:w-full md:flex-1 flex flex-col">
            <div
              style={{ backgroundColor: "#204C89" }}
              className="h-16 p-1 flex items-center"
            >
              <img src={NoProfile} className="w-12 h-12"></img>
              <h2 className="text-white ml-4">{clickMessage}</h2>
            </div>
            <div className={`flex-1`}>
              <div className="p-4 ">
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
                  ) : (
                    <div
                      key={index}
                      className={`flex w-full ${
                        message.sender === "me"
                          ? "justify-end	"
                          : "justify-start	"
                      }`}
                    >
                      <img
                        key={index}
                        className={`mb-4 m-2 border-2 border-black `}
                        width={"200px"}
                        src={message.url}
                      ></img>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white sticky inset-x-0 bottom-0 flex p-2 ">
              <div className="flex px-4 w-full mx-auto gap-2">
                <label htmlFor="fileInput">
                  <AiOutlinePlusSquare size={38}></AiOutlinePlusSquare>
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
                  onClick={handleSendMessage}
                  className="bg-blue-500 px-4 py-2 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <IoIosSend className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
