import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("cravingUser")) || ""
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [role , setRole] = useState(user ? user.userType : "")

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user ? user.userType : "")
  }, [user]);

  const values = {
    user,
    isLogin,
    role,
    setUser,
    setIsLogin,
    setRole,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
