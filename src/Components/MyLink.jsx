import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative text-md font-bold tracking-wide transition-all duration-300 ${
          isActive 
          ? "text-primary" 
          : "text-gray-500 hover:text-primary"
        } group`
      }
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full active:w-full">
      </span>
    </NavLink>
  );
};

export default MyLink;