import React from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Notification = () => {
  // Sample data (replace with actual data from your application)
  const NavItem = ({ to, icon}) => {
    return (
      <Link
        to={to}
        className="flex items-center cursor-pointer py-2 transition"
      >
        <span className="text-black">{icon}</span>
      </Link>
    );
  };
  const userProfile = "Images/profile.jpg";
  const userName = "John Doe";
  const notificationData = [
    { id: 1, message: "liked your photo", actionButtons: ["View", "Dismiss"] },
    {
      id: 2,
      message: "started following you",
      actionButtons: ["Follow Back", "Dismiss"],
    },
    { id: 3, message: "liked your photo", actionButtons: ["View", "Dismiss"] },
    { id: 4, message: "liked your photo", actionButtons: ["View", "Dismiss"] },
    { id: 5, message: "liked your photo", actionButtons: ["View", "Dismiss"] },
    {
      id: 6,
      message: "started following you",
      actionButtons: ["Follow Back", "Dismiss"],
    },
    {
      id: 7,
      message: "liked your photo",
      actionButtons: ["Follow Back", "Dismiss"],
    },
    {
      id: 8,
      message: "liked your photo",
      actionButtons: ["Follow Back", "Dismiss"],
    },
    { id: 9, message: "liked your photo", actionButtons: ["View", "Dismiss"] },
    {
      id: 20,
      message: "started following you",
      actionButtons: ["Follow Back", "Dismiss"],
    },
    {
      id: 11,
      message: "started following you",
      actionButtons: ["Follow Back", "Dismiss"],
    },
  ];

  const handleAction = (id, action) => {
    // Implement logic for handling the action for the given notification id
    console.log(`Notification ID ${id} - Action: ${action}`);
  };

  return (
    <div>
      {/* <div
        style={{ backgroundColor: "rgb(22, 53, 96)" }}
        className="p-3 flex items-center justify-between"
      >
        <div className="flex items-center bg-white">
          <img
            src={SchoolLogo}
            alt="School Logo"
            className=" h-8 object-cover mr-4"
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
      </div> */}

      <div className=" mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
        <div className="mt-2">
          <NavItem to="/messages" icon={<FiX />} />
          <h3 className="text-2xl font-semibold mb-4">Notifications</h3>
          <hr />

          {notificationData.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={userProfile}
                  alt="Notification User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p>
                    <span className="font-bold">{userName}</span>{" "}
                    {notification.message}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 items-center">
                {/* <div className="flex mr-8 w-24 py-2">
                  <img className="px-5" src={tick} alt="" />
                  <img src={cross} alt="" />
                </div> */}

                {/* Conditionally render Follow Back or View button */}
                {notification.message === "started following you" ? (
                  <button
                    onClick={() => handleAction(notification.id, "Follow Back")}
                    className="text-xs text-gray-200 focus:outline-none "
                    style={{ margin: "0 5px" }} // Adjust margin for alignment
                  >
                    Follow Back
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction(notification.id, "View")}
                    className="text-xs  px-8 text-gray-200 focus:outline-none"
                    style={{ margin: "0 5px" }} // Adjust margin for alignment
                  >
                    View
                  </button>
                )}

                <button
                  onClick={() => handleAction(notification.id, "Dismiss")}
                  className="text-xs text-gray-200 focus:outline-none"
                  style={{ margin: "0 5px" }} // Adjust margin for alignment
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
