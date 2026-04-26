import { FaExternalLinkAlt } from "react-icons/fa";
import { FaBookOpen, FaGithub, FaLinkedin, FaMapPin, FaPhone, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <FaBookOpen size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight">Galos' Freeom</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              A comprehensive platform designed to streamline student registration, tracking, and academic performance monitoring.
            </p>
            <div className="flex space-x-4 pt-2">
              <FaGithub className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              <FaTwitter className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              <FaLinkedin className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              <a href={`https://www.whatsapp.com`} target="_bank"><FaWhatsapp className="w-5 h-5 text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-indigo-600 transition-colors">Student Registration</Link></li>
              <li><Link to="/students" className="hover:text-indigo-600 transition-colors">Student Dashboard</Link></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-1">Faculty Portal <FaExternalLinkAlt size={12}/></a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Class Schedules</a></li>
            </ul>
          </div>

          {/* Quick Support */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <FiMail size={16} className="text-indigo-600" />
                <span>support@galosfreeom.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone size={16} className="text-indigo-600" />
                <span>+250 (795) 450-888</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapPin size={16} className="text-indigo-600" />
                <span>Education Square, Nairobi Kenya</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/Status */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">System Status</h4>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open Monday - Friday
              </div>
              <p className="text-[11px] text-emerald-700/70 dark:text-emerald-500/70">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-slate-400">
          <p>© {new Date().getFullYear()} Galos Freeom Solutions Inc. Built with React & Tailwind.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;