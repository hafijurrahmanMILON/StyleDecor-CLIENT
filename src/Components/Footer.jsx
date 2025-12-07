import logoImg from "../assets/Copilot_20251206_154458.png";
import fb from "../assets/facebook.png";
import yt from "../assets/youtube.png";
import x from "../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-white p-8 px-2 md:px-12 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img className="w-28 h-20 rounded-lg" src={logoImg} alt="" />
          <div className="flex mt-4 items-center gap-4">
            <a href="" target="_blank">
              <img src={fb} alt="" />
            </a>
            <a href="" target="_blank">
              <img src={yt} alt="" />
            </a>
            <a href="" target="_blank">
              <img className="w-9" src={x} alt="" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold relative pb-2">
            Contact Info
            <span className="absolute bottom-0 left-0 h-0.5 bg-white w-12"></span>
            <span className="absolute bottom-0 left-14 h-0.5 bg-white/30 w-10"></span>
          </h3>
          <ul className="mt-4 space-y-2 text-white/80">
            <li className="flex items-start">
              <div>
                <span className="font-semibold text-white">Location</span>
                <p>2976 Sunrise Road, Las Vegas</p>
              </div>
            </li>
            <li className="flex items-start">
              <div>
                <span className="font-semibold text-white">Email</span>
                <p>hello@wazo.com</p>
              </div>
            </li>
            <li className="flex items-start">
              <div>
                <span className="font-semibold text-white">Phone</span>
                <p>+1-3454-5678-77</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold relative pb-2">
            Quick Links
            <span className="absolute bottom-0 left-0 h-0.5 bg-white w-12"></span>
            <span className="absolute bottom-0 left-14 h-0.5 bg-white/30 w-10"></span>
          </h3>
          <div className="flex flex-col mt-4 space-y-1 font-semibold text-base">
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold relative pb-2">
            Working Hours
            <span className="absolute bottom-0 left-0 h-0.5 bg-white w-12"></span>
            <span className="absolute bottom-0 left-14 h-0.5 bg-white/30 w-10"></span>
          </h3>
          <div className="space-y-2 mt-4">
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 mt-8 pt-8 text-center">
        <p>&copy; 2024 StyleDecor All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
