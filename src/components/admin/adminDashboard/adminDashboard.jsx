import React, { useState, useEffect } from "react";
import NavBar from "../../helper/navbar";
import axios from 'axios'
import { Table, Space, message } from "antd";
import useScreenSize from "../../../utils/useScreenSize";
import RiseLoader from "react-spinners/RiseLoader";
 

const QueryComponent = () => {
  return (
    <div className="w-1/2 p-2">
      <div className="pt-9">
        <div className="bg-slate-300 rounded-xl px-6 m-0 text-blue-900 p-2 font-extrabold">
          Queries and Complaints.
          <div>
            <ul>
              <li className="text-black py-3 pt-6 font-semibold">
                - Regarding portal technicalities.
              </li>
              <li className="text-black py-3 font-semibold">
                - Annual day delay announcement.
              </li>
              <li className="text-black py-3 font-semibold">
                - Exam dates postponement due to annual day celebrations.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const override = {
  display: "flex",
  justifyContent:"center",
  margin: "0 auto",
  borderColor: "blue",
  

};

const AdminDashboard = () => {
  const screenSize = useScreenSize();
  const [selectedButton, setSelectedButton] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("student");
  
  
   
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the timeout value as needed

    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in sessionStorage');
        }

        const response = await axios.get('http://localhost:3000/api/admin/pending-users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPendingUsers(response.data);

        
         
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching pending users:', error);
        setLoading(false);  
        message.error('Failed to fetch pending users');  
      }
    };

    fetchPendingUsers();
  }, []);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const filteredPendingUsers = pendingUsers.filter(user => user.role === selectedRole);


 


  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      render: (_, __, index) => <span className="text-black">{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Reg. No",
      dataIndex: "schoolCode",
      key: "schoolCode",
    },
    {
      title: "Date Of Registration",
      dataIndex: "createdat",
      key: "createdat",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: "Username",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text.split('@')[0]}</span>,
    },
    {
      title: "Approve/Deny",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <a className="rounded-full px-2 py-1 bg-[#247000] cursor-pointer text-white hover:bg-[#319a00]" onClick={() => handleApprove(record)}>Approve</a>
          <a className="rounded-full px-2 py-1 bg-[#FF0000] cursor-pointer text-white hover:bg-[#bb0000]" onClick={() => handleDeny(record)}>Deny</a>
        </Space>
      ),
    },
  ];


  const handleApprove = async (record) => {
    try {
      console.log('Approving user with key:', record._id); // Log the record key
      setLoading(true);
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      
      const requestBody = { userId: record._id, approve: true }; // Ensure correct property name and value
      console.log('Request body:', requestBody); // Log the request body
      
      const response = await axios.post('http://localhost:3000/api/admin/approve-user', requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Response:', response); // Log the response
      setPendingUsers(prevUsers => prevUsers.filter(user => user._id !== record._id));
      message.success('User approved successfully');
    } catch (error) {
      console.error('Error approving user:', error);
      message.error('Failed to approve user');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeny = async (record) => {
    try {
      console.log('Denying user with key:', record._id); // Log the record key
      setLoading(true);
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      
      const requestBody = { userId: record._id, approve: false }; // Ensure correct property name and value
      console.log('Request body:', requestBody); // Log the request body
      
      const response = await axios.post('http://localhost:3000/api/admin/approve-user', requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Response:', response); // Log the response
      setPendingUsers(prevUsers => prevUsers.filter(user => user._id !== record._id));
      message.success('User denied successfully');
    } catch (error) {
      console.error('Error denying user:', error);
      message.error('Failed to deny user');
    } finally {
      setLoading(false);
    }
  };
  

  const filterData = (data) => {
    if (!data) return [];
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const getData = () => {
    return filterData(filteredPendingUsers);
  };

  return (
    <>
      <NavBar />
      <div className="bg-indigo-100 h-dvh">
      <div className={`bg-[#f1f1f1] min-h-[${screenSize.height}px]`}>
          <div className="w-11/12 mx-auto">
            <div className="flex pt-4">
              <div className="text-6xl text-gray-500 font-bold pb-7 pt-4 w-11/12">
                Dashboard
                <div className="flex justify-evenly text-2xl">
                  <ul className="flex lg:gap-16 md:gap-10 gap-3 py-4">
                    <li
                      onClick={() => handleRoleSelection("student")}
                      className={`${
                        selectedButton === 0
                          ? "bg-[#163560] text-white"
                          : "text-black"
                      } rounded-full lg:px-14 md:px-10 px-6 py-1 border-2 border-black hover:bg-[#163560] hover:text-white`}
                    >
                      Student
                    </li>
                    <li
                      onClick={() => handleRoleSelection("faculty")}
                      className={`${
                        selectedButton === 1
                          ? "bg-[#163560] text-white"
                          : "text-black"
                      } rounded-full lg:px-14 md:px-10 px-6 py-1 border-2 border-black hover:bg-[#163560] hover:text-white`}
                    >
                      Faculty
                    </li>
                    <li
                      onClick={() => handleRoleSelection("alumini")}
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
                  <div className="flex w-1/2 h-1 text-white">
                    <form className="relative">
                      <div
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </div>
              {screenSize.width > 900 && <QueryComponent />}
            </div>
            <div className="bg-[#f1f1f1]">
              {loading ? (
                <RiseLoader
                  loading={loading}
                  cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <Table columns={columns} dataSource={getData()}  />
              )}
            </div>

            {screenSize.width < 900 && (
              <div className="w-1/2 p-2">
                <QueryComponent />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;