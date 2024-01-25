import React from "react";
import handleAdminClick from "../dashboard/dashboard";
import Search from "./search";
const Navbar = () => {
  return (
    <header className="bg-transparent  py-4  mx-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <img src="Images/logo.png" alt="" />
        </div>
        <Search />
        <nav>
          <ul className="flex space-x-4">
            <li className="font-semibold px-2 text-indio-900 hover:text-indigo-500 cursor-pointer">
              Home
            </li>
            <li className="font-semibold px-2 text-indio-900 hover:text-indigo-500 cursor-pointer">
              About
            </li>
            <li className="font-semibold px-2 text-indio-900 hover:text-indigo-500 cursor-pointer">
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
