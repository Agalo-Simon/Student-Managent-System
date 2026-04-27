import {
  useState,
  useEffect,
  type ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
import type { ThemeContextType, Theme, Toast, ToastType} from '../components/types';
import { FaCheckCircle } from "react-icons/fa";
import { FaInfo, FaX } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";





const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme ? savedTheme : "light";
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  }, []);
  

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, showToast}}>
     <div className={theme}>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
          {children}
          
          {/* Toast Container */}
          <div className="fixed top-0 ml-96  z-9999 flex flex-col gap-3 pointer-events-none">
            {toasts.map(toast => (
              <div 
                key={toast.id}
                className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-right fade-in duration-300 ${
                  toast.type === 'success' ? 'bg-emerald-600 border-emerald-500 text-white' :
                  toast.type === 'error' ? 'bg-red-600 border-red-500 text-white' :
                  toast.type === 'info' ? 'bg-yellow-500 border-yellow-500 text-white' :
                  'bg-indigo-600 border-indigo-500 text-white'
                }`}
              >
                {toast.type === 'success' && <FaCheckCircle size={20} />}
                {toast.type === 'error' && <FiAlertCircle size={20} />}
                {toast.type === 'info' && <FaInfo size={20} />}
                <span className="font-bold text-sm">{toast.message}</span>
                <button 
                  onClick={() => setToasts(prev => prev.filter(toast => toast.id !== toast.id))}
                  className="ml-2 opacity-70 hover:opacity-100"
                >
                  <FaX size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
