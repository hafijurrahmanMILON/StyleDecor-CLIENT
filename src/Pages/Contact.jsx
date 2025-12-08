import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                        Contact <span className="text-primary">StyleDecor</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get in touch with our decoration experts for consultations and inquiries
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   
                    <div className="space-y-6">
                        <div className="shadow-md rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-secondary mb-6">Contact Details</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-primary text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-1">Our Studio</h3>
                                        <p className="text-gray-700">123 Decoration Avenue, Design District</p>
                                        <p className="text-gray-700">Dhaka 1212, Bangladesh</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaPhone className="text-primary text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-1">Phone Number</h3>
                                        <p className="text-gray-700">+880 1234 567890</p>
                                        <p className="text-gray-700">+880 9876 543210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaEnvelope className="text-primary text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-1">Email Address</h3>
                                        <p className="text-gray-700">info@styledecor.com</p>
                                        <p className="text-gray-700">support@styledecor.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaClock className="text-primary text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary mb-1">Working Hours</h3>
                                        <p className="text-gray-700">Saturday - Thursday: 9:00 AM - 8:00 PM</p>
                                        <p className="text-gray-700">Friday: 2:00 PM - 8:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="shadow-md rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-secondary mb-4">Service Coverage</h2>
                            <p className="text-gray-700 mb-4">
                                We provide decoration services across multiple districts with dedicated teams
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'].map((city) => (
                                    <span key={city} className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">
                                        {city}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                   
                    <div>
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-secondary mb-6">Send Us a Message</h2>
                            
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Service Type
                                    </label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                                        <option value="">Select service type</option>
                                        <option value="home">Home Decoration</option>
                                        <option value="wedding">Wedding Decoration</option>
                                        <option value="ceremony">Ceremony Setup</option>
                                        <option value="office">Office Design</option>
                                        <option value="consultation">Consultation</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Event Date (if applicable)
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your decoration needs, budget, and any special requirements..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                <button
                                    className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

              
                <div className="mt-16 border-2 border-secondary  rounded-2xl p-8 text-center text-primary">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Need Immediate Assistance?
                    </h2>
                    <p className="mb-6 max-w-2xl mx-auto">
                        Call our emergency support line for urgent decoration needs or last-minute bookings
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <FaPhone className="text-white" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm opacity-90">Emergency Line</p>
                                <p className="text-lg font-bold">+880 1712 345678</p>
                            </div>
                        </div>
                        <div className="text-sm">
                            Available 24/7 for urgent event requirements
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;