import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  MdOutlineCollectionsBookmark,
  MdOutlineDeliveryDining,
  MdOutlineHistory,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import { LuServerCog, LuUsers } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TbListDetails } from "react-icons/tb";

const DashLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-primary text-2xl font-semibold">STYLEDECOR</div>
        </nav>
        {/* Page content here */}
        <div className="max-w-7xl mx-4 lg:mx-auto min-h-[80vh] my-12 ">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            {/* HomePage */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Homepage"
              >
                <FiHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>
            {/* my profile */}
            <li>
              <Link
                to="/dashboard/my-profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="My Profile"
              >
                <CgProfile />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>

            {/* My Bookings*/}
            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="My Bookings"
              >
                <MdOutlineCollectionsBookmark />
                <span className="is-drawer-close:hidden">My Bookings</span>
              </NavLink>
            </li>

            {/* payment history */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Payment History"
              >
                <MdOutlineHistory />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>

            {/* Decorator apply */}
            <li>
              <NavLink
                to="/dashboard/decorator-request"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Decorator Requests"
              >
                <AiOutlineUsergroupAdd />
                <span className="is-drawer-close:hidden">Decorator Requests</span>
              </NavLink>
            </li>
            {/* All Decorators */}
            <li>
              <NavLink
                to="/dashboard/approved-decorators"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Decorator Management"
              >
                <LiaUsersCogSolid />
                <span className="is-drawer-close:hidden">Decorator Management</span>
              </NavLink>
            </li>
            {/* Service Management */}
            <li>
              <NavLink
                to="/dashboard/service-management"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Service Management"
              >
                <LuServerCog />
                <span className="is-drawer-close:hidden">Service Management</span>
              </NavLink>
            </li>
            {/* Bookings Management */}
            <li>
              <NavLink
                to="/dashboard/booking-management"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Booking Management"
              >
                <TbListDetails />
                <span className="is-drawer-close:hidden">Booking Management</span>
              </NavLink>
            </li>

            {/* settings */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
