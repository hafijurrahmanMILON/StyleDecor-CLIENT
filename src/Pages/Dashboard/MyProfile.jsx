import React from "react";
import useAuth from "../../Hooks/useAuth";
import { FaUser, FaEnvelope, FaCalendarAlt, FaShieldAlt, FaFingerprint, FaLink, FaCrown, FaPaintBrush, FaUserCircle } from "react-icons/fa";
import userIMG from "../../assets/user.png";
import Loading from "../../Components/Loading";
import useRole from "../../Hooks/useRole";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const { role } = useRole();

  const joinDate = user?.metadata?.creationTime
    ? new Date(user?.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const lastSignIn = user?.metadata?.lastSignInTime
    ? new Date(user?.metadata.lastSignInTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const getRoleBadgeStyle = () => {
    switch (role) {
      case "admin":
        return {
          bg: "bg-gradient-to-r from-red-500 to-pink-500",
          text: "text-white",
          icon: <FaCrown className="mr-1.5" size={12} />,
          label: "Admin"
        };
      case "decorator":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
          text: "text-white",
          icon: <FaPaintBrush className="mr-1.5" size={12} />,
          label: "Decorator"
        };
      case "user":
      default:
        return {
          bg: "bg-gradient-to-r from-gray-600 to-gray-400",
          text: "text-white",
          icon: <FaUserCircle className="mr-1.5" size={12} />,
          label: "User"
        };
    }
  };

  const roleBadge = getRoleBadgeStyle();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-b border-gray-50">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-linear-to-tr from-accent to-primary">
                <img
                  src={user?.photoURL || userIMG}
                  alt={user?.displayName || "User"}
                  className="w-full h-full rounded-full border-4 border-white object-cover shadow-sm"
                />
              </div>
              <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  {user?.displayName || "User Name"}
                </h1>
                
                {role && (
                  <div className="flex justify-center md:justify-start">
                    <span className={`inline-flex items-center ${roleBadge.bg} ${roleBadge.text} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm`}>
                      {roleBadge.icon}
                      {roleBadge.label}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 font-medium">
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full text-sm">
                  <FaEnvelope className="text-primary" />
                  {user?.email}
                </span>
                <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
                    user?.emailVerified ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                  }`}>
                  <FaShieldAlt />
                  {user?.emailVerified ? "Verified" : "Not verified"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-50 hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <FaUser size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Identity Details</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Display Name</label>
                  <p className="text-gray-700 font-semibold mt-1">{user?.displayName || "Not Provided"}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold flex items-center gap-1">
                    <FaFingerprint size={10} /> User ID
                  </label>
                  <p className="text-xs font-mono text-gray-500 mt-1 break-all bg-gray-50 p-2 rounded-lg">
                    {user?.uid}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 hover:bg-gray-50/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <FaCalendarAlt size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Timeline & Access</h3>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="text-sm font-bold text-gray-700">{joinDate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">Last Sign In</span>
                  <span className="text-sm font-bold text-gray-700">{lastSignIn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <FaLink size={12} /> Provider
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-md">
                    {user?.providerData?.[0]?.providerId || "Firebase"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;