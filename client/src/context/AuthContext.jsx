import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("UserData")) || null,
  );
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // if (user) {
    //   setIsLogin(true);
    // } else {
    //   setIsLogin(false);
    // }

    setIsLogin(!!user);
    
  }, [user]);

  const values = {
    user,
    setUser,
    isLogin,
    setIsLogin,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
