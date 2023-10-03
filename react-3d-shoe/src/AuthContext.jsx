import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNumber, setUserNumber] = useState(null);
  const [lastNumber, setLastNumber] = useState(1000);

  const login = () => {
    setIsLoggedIn(true);
    setLastNumber(lastNumber + 1);
    setUserNumber(lastNumber + 1);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserNumber(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userNumber, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
