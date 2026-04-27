import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaUserPlus, FaUsers } from "react-icons/fa6";
import { BiSolidBookOpen } from "react-icons/bi";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Register', icon: <FaUserPlus size={18} /> },
    { path: '/students', label: 'Student List', icon: <FaUsers size={18} /> },
  ];

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="mx-auto px-6">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
              <BiSolidBookOpen size={20} />
            </div>
            <span className="font-bold text-xl font-serif tracking-tight text-indigo-600">Galos' Freedom</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  location.pathname === link.path 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 hover:ring-indigo-500 transition-all"
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-500">
            {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 p-4 border-t border-slate-100 dark:border-slate-800">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 p-4 rounded-2xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
export default Navbar;