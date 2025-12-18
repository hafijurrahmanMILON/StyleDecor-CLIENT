import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaArrowLeft, FaMoneyBillWave, FaReceipt } from "react-icons/fa";
import Loading from "../../Components/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-4xl my-6 font-bold text-primary">Payment History</h1>
      {payments.length === 0 ? (
        <div className="p-12 text-center flex flex-col justify-center items-center min-h-[70vh]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FaMoneyBillWave className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Payment History
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Your payment history will appear here once you make your first
            booking and payment.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-primary/5 to-secondary/5 border-b border-gray-200">
                <th className="p-4 text-center">#</th>
                <th className="p-4 text-left">Parcel Info</th>
                <th className="p-4 text-center">Transaction ID</th>
                <th className="p-4 text-center">Paid At</th>
                <th className="p-4 text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-gray-100 to-gray-200 font-semibold mx-auto">
                      {index + 1}
                    </div>
                  </td>
                  <td className="p-4 text-left">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className="font-medium truncate">
                          {payment.serviceName}
                        </div>
                        <div className="text-xs mt-1 truncate">
                          Payment ID: {payment._id?.slice(-8) || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-sm font-mono rounded-lg border border-gray-200 max-w-full">
                      <FaReceipt className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{payment.transactionId}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-sm font-medium">
                        {payment.paidAt}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div>
                      <div className="text-lg">
                        {payment.amount} <span className="text-xs">BDT</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
