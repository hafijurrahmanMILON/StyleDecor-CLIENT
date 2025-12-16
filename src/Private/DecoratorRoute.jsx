import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Forbidden";

const DecoratorRoute = ({ children }) => {
  const {user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading || !user) {
    return <Loading></Loading>;
  }

  if (role !== "decorator") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default DecoratorRoute;
