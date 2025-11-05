import React from "react";
import { AuthContext } from "../Context/AuthContext";

const AuthProvider = ({ children }) => {
  const authData = {};

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
