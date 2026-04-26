import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { type CourseName, COURSES } from "../components/types";
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { FaPerson } from "react-icons/fa6";


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('studentDraft');
    return saved ? JSON.parse(saved) : { fullName: '', email: '', phone: '', course: 'Math' };
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('studentDraft', JSON.stringify(formData));
  }, [formData]);

  // Real-time Validation Logic
  const validationErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    if (formData.fullName.trim() && formData.fullName.trim().length < 3) {
      errors.fullName = "Name must be at least 3 characters long";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10-15 digits";
    }
    return errors;
  }, [formData]);

  const isFormComplete = formData.fullName.trim().length >= 3 && 
                         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && 
                         /^\d{8,15}$/.test(formData.phone);

  const isFormValid = isFormComplete && Object.keys(validationErrors).length === 0;

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">Registration</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-xl">Fill in the student details to proceed.</p>
        
        <div className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input 
              type="text"
              className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 outline-none transition-all ${validationErrors.fullName ? 'border-red-400' : 'border-transparent focus:border-indigo-500'}`}
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              placeholder="e.g. Agalo Simon" 
              />
            {validationErrors.fullName && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                <FiAlertTriangle size={12} /> {validationErrors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <input 
              type="email"
              className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 outline-none transition-all ${validationErrors.email ? 'border-red-400' : 'border-transparent focus:border-indigo-500'}`}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="student@gmail.edu"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                <FiAlertTriangle size={12} /> {validationErrors.email}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
              <input 
                type="tel"
                className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 outline-none transition-all ${validationErrors.phone ? 'border-red-400' : 'border-transparent focus:border-indigo-500'}`}
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="078-235-6789"
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                  <FiAlertTriangle size={12} /> {validationErrors.phone}
                </p>
              )}
            </div>

            {/* Course */}
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Course</label>
              <select 
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 outline-none transition-all appearance-none"
                value={formData.course}
                onChange={e => setFormData({...formData, course: e.target.value as CourseName})}
              >
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => isFormValid && navigate('/confirmation')}
              disabled={!isFormValid}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isFormValid 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-100 dark:shadow-none' 
                : 'bg-indigo-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              {isFormValid ? <FiCheckCircle size={20}/> : <FiAlertCircle size={20}/>}
              Review Student
            </button>
            {!isFormValid && (
              <p className="text-center text-[10px] uppercase font-black tracking-widest text-slate-400 mt-4">
                Please fix all errors to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;