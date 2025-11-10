import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, type, student }) => {
  if (!isOpen) return null;

  const renderModalContent = () => {
    switch (type) {
      case 'viewStudent':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
            {student && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-sm text-gray-900">{student.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student ID</label>
                    <p className="mt-1 text-sm text-gray-900">{student.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Class & Section</label>
                    <p className="mt-1 text-sm text-gray-900">{student.class} - {student.section}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                    <p className="mt-1 text-sm text-gray-900">{student.rollNo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                    <p className="mt-1 text-sm text-gray-900">{student.fatherName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="mt-1 text-sm text-gray-900">{student.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{student.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{student.email}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-sm text-gray-900">{student.address}</p>
                </div>
              </div>
            )}
          </div>
        );
      case 'addStudent':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Father's Name" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Select Class</option>
                <option>9th</option>
                <option>10th</option>
                <option>11th</option>
                <option>12th</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Select Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>EWS</option>
                <option>ST/SC</option>
              </select>
              <input type="tel" placeholder="Phone Number" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Email Address" className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <textarea placeholder="Address" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
            <div className="flex justify-end space-x-3">
              <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Student</button>
            </div>
          </div>
        );
      default:
        return <div>Modal Content</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;