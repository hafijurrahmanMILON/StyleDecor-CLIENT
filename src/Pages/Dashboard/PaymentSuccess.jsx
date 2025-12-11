import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId]);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard/my-bookings");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <FaCheckCircle className="text-5xl text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your booking has been confirmed and is now
          being processed.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">Confirmed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold">Credit Card</span>
            </div>

            <div className="text-gray-600 flex justify-between">
              <span>Transaction ID:</span>
              <span>{paymentInfo.transactionId}</span>
            </div>
            <div className="text-gray-600 flex justify-between">
              <span>Tracking ID:</span> <span>{paymentInfo.trackingId}</span>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            You will be redirected in
          </div>
          <div className="text-4xl font-bold text-primary">{countdown}s</div>
        </div>
        <Link to="/dashboard/my-bookings" className="btn btn-secondary">
          My Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
