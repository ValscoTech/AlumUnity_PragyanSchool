import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  authToken: null,
  user: null,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setAuthToken(token);
    fetchUserData(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  const ctxValue = {
    authToken,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
