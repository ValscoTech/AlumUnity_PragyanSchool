import NavBar from "../../helper/navbar";
import { Fragment, useState } from "react";
import useScreenSize from "../../../utils/useScreenSize";

const FacultyTableData = [
  {
    Name: "Fac1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "something123",
  },
  {
    Name: "Fac1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "something123",
  },
  {
    Name: "Fac1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "something123",
  },
  {
    Name: "Fac1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "something123",
  },
  {
    Name: "Fac1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "something123",
  },
];

const alumniTableData = [
  {
    Name: "Alumni1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "somethingAlum123",
  },
  {
    Name: "Alumni1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "somethingAlum123",
  },
  {
    Name: "Alumni1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "somethingAlum123",
  },
  {
    Name: "Alumni1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "somethingAlum123",
  },
  {
    Name: "Alumni1",
    Reg_No: "Something",
    DOR: "12/12/12",
    Username: "somethingAlum123",
  },
];

const studentTableData = [
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
  {
    Name: "Navin",
    Reg_No: "21bce3310",
    DOR: "12/12/12",
    Username: "nvnie123",
  },
];

const QueryComponent = () => {
  return (
    <div className="pt-9">
      <div className=" bg-slate-300 rounded-xl px-6  m-0 text-blue-900 p-2  font-extrabold">
        Queries and Complaints
        <div>
          <ul>
            <li className="text-black py-3 pt-6 font-semibold">
              - Regarding portal technicalities
            </li>
            <li className="text-black py-3 font-semibold">
              - Annual day delay announcement
            </li>
            <li className="text-black py-3 font-semibold">
              - Exam dates postponement due to annual day celebrations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function Table(data, buttonValue) {
  const screenSize = useScreenSize();

  function handleApprove(e, data, index) {
    const user = {
      status: "Approved",
      data,
      type: index === 0 ? "Student" : index === 1 ? "Faculty" : "Alumni",
    };
    console.log(user);
  }

  function handleDeny(e, data, index) {
    const user = {
      status: "Denied",
      data,
      type: index === 0 ? "Student" : index === 1 ? "Faculty" : "Alumni",
    };
    console.log(user);
  }

  return data.map((data, index) => {
    return (
      <Fragment key={index}>
        <div className="p-2 font-bold">{index + 1}</div>
        <div className="p-2 lg:col-span-3 col-span-2 font-bold truncate">
          {data.Name}
        </div>
        <div className="p-2 col-span-2 font-bold truncate">{data.Reg_No}</div>
        <div className="p-2 col-span-2 font-bold truncate">{data.DOR}</div>
        <div className="p-2 col-span-2 font-bold truncate">{data.Username}</div>
        <div className="p-2 col-span-2 font-bold flex">
          <ul className="flex gap-1">
            <li
              className="rounded-full px-2 py-1 bg-[#247000] cursor-pointer text-white hover:bg-[#319a00]"
              onClick={(e) => handleApprove(e, data, buttonValue)}
            >
              {screenSize.width > 800 ? "Approve" : "✔️"}
            </li>
            <li
              className="rounded-full px-2 py-1 bg-[#FF0000] cursor-pointer text-white hover:bg-[#bb0000]"
              onClick={(e) => handleDeny(e, data, buttonValue)}
            >
              {screenSize.width > 800 ? "Deny" : "X"}
            </li>
          </ul>
        </div>
      </Fragment>
    );
  });
}

const AdminDashboard = () => {
  const screenSize = useScreenSize();
  const [selectedButton, setSelectedButton] = useState(0);
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="bg-indigo-100 h-dvh">
        <div className={`bg-indigo-100 min-h-[${screenSize.height}px]`}>
          <div className="w-11/12  mx-auto">
            <div className="flex pt-4">
              <div className="text-6xl  text-gray-500 font-bold pb-7 pt-4 w-11/12">
                Dashboard
                <div className="flex justify-evenly text-2xl">
                  <ul className="flex lg:gap-16 md:gap-10 gap-3 py-4">
                    <li
                      onClick={() => setSelectedButton(0)}
                      className={`${
                        selectedButton === 0
                          ? "bg-[#163560] text-white"
                          : "text-black"
                      } rounded-full lg:px-14 md:px-10 px-6 py-1 border-2 border-black hover:bg-[#163560] hover:text-white`}
                    >
                      Student
                    </li>
                    <li
                      onClick={() => setSelectedButton(1)}
                      className={`${
                        selectedButton === 1
                          ? "bg-[#163560] text-white"
                          : "text-black"
                      } rounded-full lg:px-14 md:px-10 px-6 py-1 border-2 border-black hover:bg-[#163560] hover:text-white`}
                    >
                      Faculty
                    </li>
                    <li
                      onClick={() => setSelectedButton(2)}
                      className={`${
                        selectedButton === 2
                          ? "bg-[#163560] text-white"
                          : "text-black"
                      } rounded-full lg:px-14 md:px-10 px-6 py-1 border-2 border-black hover:bg-[#163560] hover:text-white`}
                    >
                      Alumni
                    </li>
                  </ul>
                </div>
                <div>
                  <div className=" flex  w-1/2 h-1 text-white ">
                    <form className="relative ">
                      <div
                        className=""
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "38px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.02317 9.58741C8.0922 10.3237 6.91128 10.764 5.62633 10.764C2.62093 10.764 0.18457 8.35531 0.18457 5.38398C0.18457 2.41265 2.62093 0.00390625 5.62633 0.00390625C8.63173 0.00390625 11.0681 2.41265 11.0681 5.38398C11.0681 6.6542 10.6228 7.82162 9.87823 8.74199L13.3229 12.2695C13.559 12.5029 13.559 12.8814 13.3229 13.1149C13.0868 13.3483 12.7039 13.3483 12.4678 13.1149L9.02317 9.58741ZM1.39385 5.38398C1.39385 3.07294 3.2888 1.19948 5.62633 1.19948C7.96387 1.19948 9.85881 3.07294 9.85881 5.38398C9.85881 6.5116 9.40767 7.53505 8.6741 8.28753C8.65365 8.30312 8.63398 8.32018 8.61524 8.33871C8.59648 8.35725 8.57922 8.37671 8.56344 8.39694C7.80231 9.12234 6.76702 9.56847 5.62633 9.56847C3.2888 9.56847 1.39385 7.69501 1.39385 5.38398Z"
                            fill="#FFFFFF"
                          />
                        </svg>
                      </div>
                      <input
                        className="text-[20px] rounded-full p-2 bg-[#163560] text-white placeholder-white"
                        style={{
                          padding: "5px 10px 5px 35px",
                        }}
                        placeholder="Enter Name"
                        type="text"
                      />
                    </form>
                  </div>
                </div>
              </div>
              {screenSize.width > 900 && <QueryComponent />}
            </div>

            <div className="mt-10 lg:text-xl  md:text-lg  text-sm">
              <div className="grid lg:grid-cols-12  grid-cols-11 gap-x-2">
                <div className="p-2 font-bold truncate">S.No</div>
                <div className="p-2 lg:col-span-3 col-span-2 font-bold truncate">
                  Name
                </div>
                <div className="p-2 col-span-2 font-bold truncate">Reg.No</div>
                <div className="p-2 col-span-2 font-bold truncate">
                  Date of Registration
                </div>
                <div className="p-2 col-span-2 font-bold truncate">
                  Username
                </div>
                <div className="p-2 col-span-2 font-bold truncate">
                  Approve/Deny
                </div>

                {selectedButton === 0 &&
                  Table(studentTableData, selectedButton)}
                {selectedButton === 1 &&
                  Table(FacultyTableData, selectedButton)}
                {selectedButton === 2 && Table(alumniTableData, selectedButton)}
              </div>
            </div>
            {screenSize.width < 900 && (
              <div className="w-1/2 p-2">
                <QueryComponent />
              </div>
            )}
          </div>
          {/* <div className="static">
          <div
            style={{ background: "#163560" }}
            className="h-40 w-40 rounded-full absolute bottom-0 left-0"
          ></div>
          <div
            style={{ background: "black", opacity: "50%" }}
            className="h-28 w-80 rounded-3xl absolute bottom-0 left-80"
          ></div>{" "}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
