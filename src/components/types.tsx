// --- Types & Constants ---
export type CourseName = 'Math' | 'Science' | 'English' | 'History';

export interface Student {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  course: CourseName;
}

export const COURSES: CourseName[] = ['Math', 'Science', 'English', 'History'];

export const COURSE_INFO: Record<CourseName, { description: string; color: string; bg: string }> = {
  Math: { description: "Algebra, Geometry, Calculus", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-600" },
  Science: { description: "Physics, Chemistry, Biology", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600" },
  English: { description: "Literature, Writing, Grammar", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-600" },
  History: { description: "World History, Civilizations, Events", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-600" },
};

//--- Toast ---

export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// --- Contexts ---

export type Theme = 'light' | 'dark';
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  showToast: (message: string, type?: ToastType) => void;
}


