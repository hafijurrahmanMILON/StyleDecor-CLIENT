import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "font-semibold text-lg text-primary border-b-4"
          : `${className} text-lg font-semibold`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;