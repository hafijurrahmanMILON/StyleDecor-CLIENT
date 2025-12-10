import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                        <FaTimesCircle className="text-5xl text-red-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Payment Cancelled
                </h1>
                
                <p className="text-gray-600 mb-8">
                    Your payment was cancelled. No amount has been charged. You can try again or contact support if you need assistance.
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-semibold text-red-600">Cancelled</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-semibold">Not Charged</span>
                        </div>
                    </div>
                </div>

                <div className="space-x-4">
                    <Link 
                        to="/dashboard/my-bookings"
                        className="btn btn-secondary"
                    >
                        <MdOutlineCollectionsBookmark />
                        View My Bookings
                    </Link>
                    
                    <Link 
                        to="/"
                        className="btn btn-secondary"
                    >
                        <FaArrowLeft />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;