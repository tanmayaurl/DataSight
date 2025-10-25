import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] rounded-2xl p-6 w-[400px] shadow-lg relative">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
