import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
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
        <div className="flex flex-col justify-center items-center min-h-[80vh]">
          <h1 className="text-5xl font-bold text-primary">
            No Transaction Yet!
          </h1>
          <Link to="/dashboard/my-bookings" className="btn btn-secondary">
            {" "}
            <FaArrowLeft />
            My Bookings
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel info</th>
                <th>Transaction ID</th>
                <th>Paid at</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.serviceName}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.paidAt}</td>
                  <td>${payment.amount}</td>
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
