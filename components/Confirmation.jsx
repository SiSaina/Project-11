import React from 'react';

const Confirmation = ({ open, onConfirm, onCancel, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="mb-4 text-lg font-medium">{message || "Are you sure?"}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Yes
          </button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


export default Confirmation;