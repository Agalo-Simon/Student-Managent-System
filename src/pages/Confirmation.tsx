/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Student } from "../components/types";
import { useTheme } from "../context/ThemeContext";
import { FaCheckCircle } from "react-icons/fa";

// --- Storage Helpers ---
const getRegisteredStudents = (): Student[] => JSON.parse(localStorage.getItem('registeredStudents') || '[]');
const saveRegisteredStudents = (students: Student[]) => localStorage.setItem('registeredStudents', JSON.stringify(students));

const Confirmation = () => {
  const navigate = useNavigate();
  const { showToast } = useTheme();
  const [data, setData] = useState<Omit<Student, 'id'> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('studentDraft');
    if (!saved) navigate('/register');
    else setData(JSON.parse(saved));
  }, [navigate]);

  const onConfirm = () => {
    if (!data) return;
    const current = getRegisteredStudents();
    saveRegisteredStudents([...current, { ...data, id: crypto.randomUUID() }]);
    localStorage.removeItem('studentDraft');
    showToast(`${data.fullName} registered successfully!`, 'success');
    navigate('/students');
  };

  if (!data) return null;

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="bg-indigo-600 p-8 text-white text-center">
          <FaCheckCircle className="mx-auto mb-4" size={56} />
          <h2 className="text-3xl font-black">Confirm Registration</h2>
        </div>
        <div className="p-10 space-y-4">
          {[
            { label: 'Name', value: data.fullName },
            { label: 'Email', value: data.email },
            { label: 'Phone', value: data.phone },
            { label: 'Course', value: data.course }
          ].map(item => (
            <div key={item.label} className="flex flex-col py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400">{item.label}</span>
              <span className="text-lg font-bold">{item.value}</span>
            </div>
          ))}

          <div className="flex gap-4 pt-8">
            <button 
              onClick={() => navigate('/')}
              className="flex-1 py-4 px-4 rounded-2xl border-2 border-slate-600 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Edit Information
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black shadow-lg transition-all"
            >
              Confirm Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Confirmation;