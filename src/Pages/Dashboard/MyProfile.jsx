import React from "react";
import useAuth from "../../Hooks/useAuth";
import { FaUser, FaEnvelope, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
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
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-secondary h-32"></div>

          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              <div className="relative">
                <img
                  src={user?.photoURL || userIMG}
                  alt={user?.displayName || "User"}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user?.displayName || "User"}
                </h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <FaEnvelope className="text-primary" />
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FaUser className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Account Information
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Display Name</p>
                    <p className="font-medium text-gray-800">
                      {user?.displayName || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">User ID</p>
                    <p className="font-medium text-gray-800 text-sm break-all">
                      {user?.uid || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Activity Details
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium text-gray-800">{joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Sign In</p>
                    <p className="font-medium text-gray-800">{lastSignIn}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/50 rounded-lg flex items-center justify-center">
                    <FaShieldAlt className="text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Account Status
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Email Verification</p>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        user?.emailVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user?.emailVerified ? "✓ Verified" : "⚠ Not Verified"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Type</p>
                    <p className="font-medium text-gray-800">Standard User</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Provider Info</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Sign-in Method</p>
                    <p className="font-medium text-gray-800">
                      {user?.providerData?.[0]?.providerId || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Edit Profile
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Change Password
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
