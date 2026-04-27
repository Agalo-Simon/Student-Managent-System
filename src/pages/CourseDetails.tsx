import { useNavigate, useParams } from "react-router-dom";
import {
  COURSE_INFO,
  type CourseName,
  type Student,
} from "../components/types";
import { FaArrowLeft } from "react-icons/fa6";

// --- Storage Helpers ---
const getRegisteredStudents = (): Student[] =>
  JSON.parse(localStorage.getItem("registeredStudents") || "[]");

const CourseDetails = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const navigate = useNavigate();
  const students = getRegisteredStudents().filter(
    (student) => student.course === courseName,
  );
  const info = COURSE_INFO[courseName as CourseName];

  if (!info) return <div className="p-20 text-center">Not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <button
        onClick={() => navigate("/students")}
        className="flex items-center gap-2 mb-8 font-bold opacity-60 hover:opacity-100"
      >
        <FaArrowLeft size={18} /> Student Dashboard
      </button>
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className={`h-4 ${info.bg}`} />
        <div className="p-8">
          <div className="flex text-center align-middle justify-between">
          <h1 className="text-6xl font-black mb-4 tracking-tighter">
            {courseName}
          </h1>
           <span className={`px-2 py-2 text-center self-center rounded-xl text-xs font-black uppercase tracking-widest ${info.bg} text-white shadow-lg`}>
              {students.length} Enrolled
            </span>
          </div>
          <p className="text-xl opacity-60 mb-12">{info.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
              >
                <p className="font-bold text-lg">{student.fullName}</p>
                <p className="text-xs opacity-50">{student.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
