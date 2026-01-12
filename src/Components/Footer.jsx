import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logoImg from "../assets/logo96-Photoroom.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-secondary/60 text-white pt-20 pb-10 px-6 md:px-12 lg:px-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <img
            className="w-36 brightness-110"
            src={logoImg}
            alt="StyleDecor Logo"
          />
          <p className=" text-sm leading-relaxed max-w-xs">
            Transforming your spaces into art. Premium interior and event
            decoration services tailored to your lifestyle.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: <FaFacebookF /> },
              { icon: <FaYoutube /> },
              { icon: <FaXTwitter /> },
              { icon: <FaInstagram /> },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-300 text-white/80 hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold tracking-wider mb-8 uppercase text-primary">
            Contact Info
          </h3>
          <ul className="space-y-5">
            <li className="flex gap-4">
              <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
              <div className="text-sm  leading-snug">
                <span className="block text-white font-medium mb-1">
                  Location
                </span>
                2976 Sunrise Road, Las Vegas
              </div>
            </li>
            <li className="flex gap-4">
              <FaEnvelope className="text-primary mt-1 shrink-0" />
              <div className="text-sm  leading-snug">
                <span className="block text-white font-medium mb-1">Email</span>
                hello@styledecor.com
              </div>
            </li>
            <li className="flex gap-4">
              <FaPhoneAlt className="text-primary mt-1 shrink-0" />
              <div className="text-sm  leading-snug">
                <span className="block text-white font-medium mb-1">Phone</span>
                +1-3454-5678-77
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-wider mb-8 uppercase text-primary">
            Quick Links
          </h3>
          <ul className="flex flex-col space-y-3">
            
              <li>
                <Link to="/" className=" hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className=" w-0 bg-primary group-hover:w-3 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className=" hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className=" w-0 bg-primary group-hover:w-3 transition-all duration-300"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/coverage" className=" hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className=" w-0 bg-primary group-hover:w-3 transition-all duration-300"></span>
                  Coverage
                </Link>
              </li>
              <li>
                <Link to="/about" className=" hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className=" w-0 bg-primary group-hover:w-3 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className=" hover:text-primary text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className=" w-0 bg-primary group-hover:w-3 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold tracking-wider mb-8 uppercase text-primary">
            Working Hours
          </h3>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="">Mon - Fri</span>
              <span className="text-white font-medium">9 AM - 6 PM</span>
            </div>
            <div className="flex justify-between items-center text-sm border-y border-white/5 py-3">
              <span className="">Saturday</span>
              <span className="text-white font-medium">10 AM - 4 PM</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="">Sunday</span>
              <span className="text-rose-400 font-medium italic">Closed</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center  border-t border-white/5 mt-20 pt-8 text-xs  uppercase">
        <p className="text-center">
          © 2026 StyleDecor. Designed for Excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
