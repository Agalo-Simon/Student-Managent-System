import { FiAlertCircle } from "react-icons/fi";
import type { ModalProps } from "./types";

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }:ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-4xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-2xl text-red-600 dark:text-red-400">
            <FiAlertCircle size={28} />
          </div>
          <h3 className="text-2xl font-black tracking-tight">{title}</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {cancelText || 'Cancel'}
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-4 rounded-2xl font-black bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none transition-all active:scale-95"
          >
            {confirmText || 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;