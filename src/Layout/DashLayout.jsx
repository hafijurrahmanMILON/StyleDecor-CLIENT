import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  MdOutlineCollectionsBookmark,
  MdOutlineHistory,
  MdLogout,
} from "react-icons/md";
import { LuServerCog } from "react-icons/lu";
import { FiHome, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import { IoBarChartOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TbListDetails } from "react-icons/tb";
import useRole from "../Hooks/useRole";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import toast from "react-hot-toast";
import userIMG from "../assets/user.png";

const DashLayout = () => {
  const { loading, user, signOutFunc } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <Loading />;

  const handleLogout = async () => {
    try {
      await signOutFunc();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const adminMenuItems = [
    {
      icon: <IoBarChartOutline />,
      label: "Analytics",
      path: "/dashboard/admin-analytics",
    },
    {
      icon: <AiOutlineUsergroupAdd />,
      label: "Requests",
      path: "/dashboard/decorator-request",
    },
    {
      icon: <LiaUsersCogSolid />,
      label: "Decorators",
      path: "/dashboard/approved-decorators",
    },
    {
      icon: <LuServerCog />,
      label: "Services",
      path: "/dashboard/service-management",
    },
    {
      icon: <TbListDetails />,
      label: "Bookings",
      path: "/dashboard/booking-management",
    },
  ];

  const decoratorMenuItems = [
    {
      icon: <RiDashboardHorizontalLine />,
      label: "Dashboard",
      path: "/dashboard/decorator-dashboard",
    },
  ];

  const commonMenuItems = [
    {
      icon: <MdOutlineCollectionsBookmark />,
      label: "My Bookings",
      path: "/dashboard/my-bookings",
    },
    {
      icon: <MdOutlineHistory />,
      label: "Payments",
      path: "/dashboard/payment-history",
    },
  ];

  const menuItems = [
    { icon: <FiHome />, label: "Home", path: "/" },
    ...(role === "admin"
      ? adminMenuItems
      : role === "decorator"
      ? decoratorMenuItems
      : []),
    ...commonMenuItems,
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
          isActive
            ? "bg-accent text-white shadow-lg shadow-accent/20"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <span className="text-xl">{item.icon}</span>
      <span className="font-medium tracking-wide">{item.label}</span>
    </NavLink>
  );

  return (
    <div className="flex h-screen  overflow-hidden">
      <aside className="hidden lg:flex lg:flex-col w-72 bg-primary text-white shadow-2xl relative z-50">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-inner">
              <span className="text-primary font-black text-xl">SD</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Style<span className="text-accent">Decor</span>
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold px-4 mb-4">
            Main Menu
          </p>
          {menuItems.map((item, idx) => (
            <NavItem key={idx} item={item} />
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
          >
            <FaArrowRightFromBracket /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-60 lg:hidden transition-all duration-500 ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-primary transition-transform duration-500 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">StyleDecor</h1>
            <FiX
              className="text-2xl text-white cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item, idx) => (
              <NavItem key={idx} item={item} />
            ))}
          </nav>
        </aside>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 rounded-lg"
            >
              <FiMenu className="text-2xl text-primary" />
            </button>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-gray-800">
                Hello, {user?.displayName} ✨
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                Welcome back to your dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 p-1.5 pr-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-2 ring-accent/20">
                  <img
                    src={user?.photoURL || userIMG}
                    className="w-full h-full object-cover"
                    alt="user"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-gray-700 leading-tight">
                    {user?.displayName}
                  </p>
                  <p className="text-[10px] uppercase font-black text-accent tracking-tighter">
                    {role}
                  </p>
                </div>
                <FiChevronDown className="text-gray-400 hidden sm:block" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-2xl bg-white rounded-2xl w-56 mt-4 border border-gray-50 text-gray-600"
              >
                <li className="menu-title text-[10px] uppercase font-bold text-gray-400 px-4 py-2">
                  Account
                </li>
                <li>
                  <Link
                    to="/dashboard/my-profile"
                    className="py-3 rounded-xl hover:bg-primary/5"
                  >
                    <CgProfile className="text-lg text-primary" /> Profile
                  </Link>
                </li>
                <hr className="my-2 border-gray-50" />
                <li>
                  <button
                    onClick={handleLogout}
                    className="py-3 rounded-xl text-red-500 hover:bg-red-50"
                  >
                    <MdLogout className="text-lg" /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
