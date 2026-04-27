import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaEye, FaUsers } from "react-icons/fa6";
import { COURSE_INFO, COURSES, type Student } from "../components/types";
import { FiTrash2 } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

// --- Helpers ---
const getRegisteredStudents = (): Student[] => JSON.parse(localStorage.getItem('registeredStudents') || '[]');
const saveRegisteredStudents = (students: Student[]) => localStorage.setItem('registeredStudents', JSON.stringify(students));

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const {showToast} = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStudents(getRegisteredStudents());
  }, []);

  const deleteStudent = (id: string, name: string) => {
      const updated = students.filter(student => student.id !== id);
      setStudents(updated);
      saveRegisteredStudents(updated);
      showToast(`Deleted ${name} successfully`, 'info');
    
  };

  const filtered = students.filter(student => student.fullName.toLowerCase().includes(search.toLowerCase()));

  const status = COURSES.map(course => ({
    name: course,
    count: students.filter(student => student.course === course).length,
    info: COURSE_INFO[course]
  }));

  return (
    <div className="mx-auto py-8 px-4 space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-indigo-600 p-5 rounded-2xl text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">Total</p>
          <p className="text-3xl font-black">{students.length}</p>
        </div>
        {status.map(student => (
          <div key={student.name} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider opacity-60">{student.name}</p>
            <p className={`text-3xl font-black ${student.info.color}`}>{student.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4">
          <strong className="text-2xl font-bold flex items-center gap-2">
            Student Dashboard
          </strong>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            <input 
              className="pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-72"
              placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {filtered.length > 0 ? (
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/40 text-left text-xs font-bold uppercase tracking-widest opacity-50">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                    <td className="px-6 py-4 font-bold">{student.fullName}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{student.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm opacity-50">{student.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold px-2.5 py-1 rounded-full bg-opacity-10 ${COURSE_INFO[student.course].bg.replace('bg-', 'text-')} ${COURSE_INFO[student.course].bg.replace('bg-', 'bg-opacity-20 bg-')}`}>
                        {student.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => navigate(`/course/${student.course}`)} className="p-2 hover:text-indigo-600 transition-colors"><FaEye size={18}/></button>
                      <button onClick={() => deleteStudent(student.id, student.fullName)} className="p-2 hover:text-red-500 transition-colors"><FiTrash2 size={18}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-20 text-center opacity-40">
              <FaUsers size={64} className="mx-auto mb-4" />
              <p>No students found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;