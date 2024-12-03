// Modal.js
import React from 'react';

const Modal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <img src={image} alt="Profile" className="w-64 h-64 object-cover" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
