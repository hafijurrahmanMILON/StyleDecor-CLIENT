import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  MdOutlineCollectionsBookmark,
  MdOutlineHistory,
  MdLogout,
} from "react-icons/md";
import { LuServerCog } from "react-icons/lu";
import { FiHome, FiMenu, FiX } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import { IoBarChartOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TbListDetails } from "react-icons/tb";
import useRole from "../Hooks/useRole";
import { VscSettings } from "react-icons/vsc";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import toast from "react-hot-toast";
import userIMG from "../assets/user.png";

const DashLayout = () => {
  const { loading, user, signOutFunc } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <Loading />;
  }

  const handleLogout = async () => {
    signOutFunc()
      .then(() => {
        toast.success("SignOut Successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };

  const adminMenuItems = [
    {
      icon: <IoBarChartOutline className="text-xl" />,
      label: "Business Analytics",
      path: "/dashboard/admin-analytics",
      tip: "Analytics",
    },
    {
      icon: <AiOutlineUsergroupAdd className="text-xl" />,
      label: "Decorator Requests",
      path: "/dashboard/decorator-request",
      tip: "Requests",
    },
    {
      icon: <LiaUsersCogSolid className="text-xl" />,
      label: "Decorator Management",
      path: "/dashboard/approved-decorators",
      tip: "Decorators",
    },
    {
      icon: <LuServerCog className="text-xl" />,
      label: "Service Management",
      path: "/dashboard/service-management",
      tip: "Services",
    },
    {
      icon: <TbListDetails className="text-xl" />,
      label: "Booking Management",
      path: "/dashboard/booking-management",
      tip: "Bookings",
    },
  ];

  const decoratorMenuItems = [
    {
      icon: <RiDashboardHorizontalLine className="text-xl" />,
      label: "Dashboard",
      path: "/dashboard/decorator-dashboard",
      tip: "Dashboard",
    },
  ];

  const commonMenuItems = [
    {
      icon: <MdOutlineCollectionsBookmark className="text-xl" />,
      label: "My Bookings",
      path: "/dashboard/my-bookings",
      tip: "Bookings",
    },
    {
      icon: <MdOutlineHistory className="text-xl" />,
      label: "Payment History",
      path: "/dashboard/payment-history",
      tip: "Payments",
    },
  ];

  const getMenuItems = () => {
    const items = [
      {
        icon: <FiHome className="text-xl" />,
        label: "Homepage",
        path: "/",
        tip: "Home",
      },
    ];

    if (role === "admin") {
      items.push(...adminMenuItems);
    } else if (role === "decorator") {
      items.push(...decoratorMenuItems);
    }

    items.push(...commonMenuItems);

    return items;
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen  overflow-hidden">
      <aside className="hidden lg:flex lg:flex-col w-72 bg-primary text-white shadow-2xl">
        <div className="p-6 border-b border-secondary border-opacity-20">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <span className="text-primary font-bold text-lg">SD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">StyleDecor</h1>
              <p className="text-xs opacity-75">Admin Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="menu menu-compact p-4 space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg transition-all duration-200 flex items-center gap-3 px-4 py-3 ${
                      isActive
                        ? "bg-secondary font-semibold shadow-lg"
                        : " hover:bg-opacity-50"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 space-y-2 border-t border-secondary">
          <button
            onClick={handleLogout}
            className="btn btn-soft btn-error border-0 w-full rounded-md"
          >
            <FaArrowRightFromBracket className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-primary text-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-secondary border-opacity-20">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <span className="text-primary font-bold text-lg">SD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">StyleDecor</h1>
              <p className="text-xs opacity-75">Admin Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto h-[calc(100vh-340px)]">
          <ul className="menu menu-compact p-4 space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg transition-all duration-200 flex items-center gap-3 px-4 py-3 ${
                      isActive
                        ? "bg-secondary font-semibold shadow-lg"
                        : "hover:bg-opacity-50"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 space-y-2 border-t border-secondary">
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className="btn btn-soft btn-error border-0 w-full rounded-md"
          >
            <FaArrowRightFromBracket className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Navbar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="h-16 bg-white border-b border-gray-200 shadow-sm">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <FiX className="text-2xl text-primary" />
              ) : (
                <FiMenu className="text-2xl text-primary" />
              )}
            </button>

            <div className="hidden md:block flex-1">
              <h2 className="text-2xl font-semibold text-secondary">
                Welcome back, {user?.displayName}👋
              </h2>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full  flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={user.photoURL || userIMG}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{role}</p>
                  </div>
                </button>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border border-gray-200"
                >
                  <li>
                    <Link
                      to="/dashboard/my-profile"
                      className="flex items-center gap-2"
                    >
                      <CgProfile className="text-lg" />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <button className="flex items-center gap-2">
                      <VscSettings className="text-lg" />
                      <span>Settings</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50"
                    >
                      <MdLogout className="text-lg" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
