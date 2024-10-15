import React from 'react';

const AlertDialog = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Alert</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AlertDialog;