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
import { LuLayoutDashboard } from "react-icons/lu";
import useRole from "../Hooks/useRole";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, signOutFunc } = useAuth();
  const { role } = useRole();

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

  const getDashboardRoute = () => {
    if (role === "admin") return "/dashboard/admin-analytics";
    if (role === "decorator") return "/dashboard/decorator-dashboard";
    return "/dashboard/my-bookings"; 
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
        <MyLink to="/coverage">Coverage</MyLink>
      </li>
      <li>
        <MyLink to="/about">About Us</MyLink>
      </li>
      <li>
        <MyLink to="/contact">Contact</MyLink>
      </li>
      {user && (
        <>
          <li>
            <MyLink to="/be-a-decorator">Be a Decorator</MyLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-white py-3 px-2 md:px-12 lg:px-28">
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
        <Link to="/">
          <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
  <div className="dropdown dropdown-end lg:dropdown-center">
    <div
      tabIndex={0}
      role="button"
      className="relative group transition-transform active:scale-95"
    >
      <div className="w-12 h-12 rounded-full p-0.5 bg-linear-to-tr from-accent to-primary">
        <img
          className="w-full h-full rounded-full border-2 border-white object-cover hover:cursor-pointer"
          referrerPolicy="no-referrer"
          src={user?.photoURL || userImg}
          alt="user"
        />
      </div>
      <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
    </div>
    
    <ul
      tabIndex={0}
      className="dropdown-content mt-4 z-60 p-4 shadow-xl bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl w-72 space-y-2"
    >
      <div className="flex flex-col items-center pb-4 border-b border-black/5 text-center">
        <h2 className="text-primary font-bold text-lg leading-tight truncate w-full px-2">
          {user.displayName}
        </h2>
        <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1 italic">
          {role || "Member"}
        </p>
        <p className="text-xs text-gray-500 mt-1 truncate w-full px-4 font-medium">
          {user.email}
        </p>
      </div>

      <div className="grid gap-1 pt-2">
        <Link
          to="/dashboard/my-profile"
          className="flex items-center gap-3 p-3 rounded-2xl hover:bg-primary/10 text-gray-700 font-semibold transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
            <CgProfile size={18} />
          </div>
          My Profile
        </Link>

        <Link
          to={getDashboardRoute()}
          className="flex items-center gap-3 p-3 rounded-2xl hover:bg-primary/10 text-gray-700 font-semibold transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <LuLayoutDashboard size={18} />
          </div>
          Dashboard
        </Link>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 p-3 rounded-2xl text-red-500 hover:bg-red-50/50 font-bold transition-all mt-2 w-full"
        >
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <IoLogOutOutline size={20} />
          </div>
          Logout
        </button>
      </div>
    </ul>
  </div>
</div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              <IoLogInOutline size={20} />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 py-2.5 px-6 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
            >
              <IoPersonAddOutline size={18} />
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
