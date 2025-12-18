import React from "react";
import useAuth from "../../Hooks/useAuth";
import { FaUser, FaEnvelope, FaCalendarAlt, FaShieldAlt, FaFingerprint, FaLink } from "react-icons/fa";
import userIMG from "../../assets/user.png";
import Loading from "../../Components/Loading";

const MyProfile = () => {
  const { user, loading } = useAuth();

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Top Profile Section */}
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-b border-gray-50">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-linear-to-tr from-[#C5A059] to-[#1B7261]">
                <img
                  src={user?.photoURL || userIMG}
                  alt={user?.displayName || "User"}
                  className="w-full h-full rounded-full border-4 border-white object-cover shadow-sm"
                />
              </div>
              <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {user?.displayName || "User Name"}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 font-medium">
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full text-sm">
                  <FaEnvelope className="text-[#1B7261]" />
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
                <div className="w-12 h-12 bg-[#1B7261]/10 rounded-2xl flex items-center justify-center text-[#1B7261]">
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
                <div className="w-12 h-12 bg-[#C5A059]/10 rounded-2xl flex items-center justify-center text-[#C5A059]">
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
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1B7261] bg-[#1B7261]/5 px-3 py-1 rounded-md">
                    {user?.providerData?.[0]?.providerId || "Firebase"}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-gray-50/50 p-6 text-center">
             <p className="text-xs text-gray-400 font-medium italic">
                You are currently logged in as a <span className="text-[#C5A059] font-bold">Standard User</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;