// AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  authToken: null,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUserData(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (token, cb) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setUser(userData);
      setIsLoading(false);
      if (cb) {
        cb();
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const login = (token, cb) => {
    sessionStorage.setItem("token", token);
    setAuthToken(token, cb);
    fetchUserData(token, cb);
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
    isLoading, // Pass isLoading to the context value
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
