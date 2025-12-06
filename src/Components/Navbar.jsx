import React from "react";
import Logo from "./logo";
import MyLink from "./MyLink";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import userImg from "../assets/user.png";

const Navbar = () => {
  const { user, signOutFunc } = useAuth();

  const handleSignOut = () => {
    signOutFunc()
      .then(() => {
        toast.success("SignOut Successful");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };
  const navLinks = (
    <>
      <li>
        <MyLink to="/">Home</MyLink>
      </li>
      <li>
        <MyLink to="/services">Services</MyLink>
      </li>
      <li>
        <MyLink to="/about">About Us</MyLink>
      </li>
      <li>
        <MyLink to="/contact">Contact</MyLink>
      </li>
    </>
  );

  return (
    <div className="navbar  shadow-sm py-3 px-2 md:px-12 lg:px-28">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex justify-center items-center gap-3 text-center">
            <div className="dropdown dropdown-end lg:dropdown-center text-center z-50">
              <div
                tabIndex={0}
                role="button"
                className="m-1 transition-transform hover:scale-110"
              >
                <img
                  className="w-12 h-12 rounded-full border-2 border-primary object-cover shadow-lg"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || userImg}
                  alt="user"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100/80 backdrop-blur-lg rounded-2xl z-60 w-72 p-4 shadow-2xl border border-white/20 space-y-3"
              >
                <div className="text-center pb-2 border-b border-gray-400">
                  <h1 className="text-primary font-semibold text-xl truncate">
                    {user.displayName}
                  </h1>
                  <h1 className="text-sm truncate">{user.email}</h1>
                </div>

                <button
                  onClick={handleSignOut}
                  className="flex btn btn-primary items-center gap-3 p-3 rounded-xl font-medium justify-center mt-2"
                >
                  <IoLogOutOutline className="text-lg" />
                  Log out
                </button>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm md:text-md py-1 md:py-2 px-2 md:px-4  border md:border-2 border-primary text-primary rounded-md font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 transform"
            >
              <IoLogInOutline />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1 text-sm md:text-md py-1 md:py-2 px-2 md:px-4   bg-primary text-white rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
            >
              <IoPersonAddOutline />
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
