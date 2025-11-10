import React, { useState } from 'react';
import { 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react';

const StudentManagement = ({ 
  students, 
  setStudents, 
  setSelectedStudent, 
  setShowModal, 
  setModalType 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredStudents = students.filter(student => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterClass === '' || student.class === filterClass) &&
      (filterCategory === '' || student.category === filterCategory)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
        <button 
          onClick={() => {setModalType('addStudent'); setShowModal(true);}}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2 inline" />
          Add Student
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Classes</option>
            <option value="9th">9th Grade</option>
            <option value="10th">10th Grade</option>
            <option value="11th">11th Grade</option>
            <option value="12th">12th Grade</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="EWS">EWS</option>
            <option value="ST/SC">ST/SC</option>
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{student.name[0]}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.class} - {student.section}</div>
                    <div className="text-sm text-gray-500">Roll: {student.rollNo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.category === 'General' ? 'bg-gray-100 text-gray-800' :
                      student.category === 'OBC' ? 'bg-blue-100 text-blue-800' :
                      student.category === 'EWS' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {student.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.attendance}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className={`h-1 rounded-full ${
                          student.attendance >= 90 ? 'bg-green-600' : 
                          student.attendance >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{width: `${student.attendance}%`}}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{student.fees.paid.toLocaleString()}/₹{student.fees.total.toLocaleString()}</div>
                    {student.fees.pending > 0 ? (
                      <div className="text-sm text-red-600">₹{student.fees.pending.toLocaleString()} pending</div>
                    ) : (
                      <div className="text-sm text-green-600">Paid</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {setSelectedStudent(student); setModalType('viewStudent'); setShowModal(true);}}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit Student"
                        onClick={() => {setSelectedStudent(student); setModalType('editStudent'); setShowModal(true);}}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        title="Delete Student"
                        onClick={() => {
                          if(window.confirm(`Are you sure you want to delete ${student.name}?`)) {
                            // Handle delete functionality
                            alert('Delete functionality would be implemented here');
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
                <span className="font-medium">{filteredStudents.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-600">Total Students</div>
          <div className="text-2xl font-bold text-gray-900">{filteredStudents.length}</div>
          <div className="text-sm text-gray-500">Filtered results</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-600">Average Attendance</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredStudents.length > 0 ? Math.round(filteredStudents.reduce((sum, s) => sum + s.attendance, 0) / filteredStudents.length) : 0}%
          </div>
          <div className="text-sm text-gray-500">Class average</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-600">Fee Defaulters</div>
          <div className="text-2xl font-bold text-red-600">
            {filteredStudents.filter(s => s.fees.pending > 0).length}
          </div>
          <div className="text-sm text-gray-500">Pending payments</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-600">Categories</div>
          <div className="text-sm text-gray-900">
            General: {filteredStudents.filter(s => s.category === 'General').length}<br/>
            OBC: {filteredStudents.filter(s => s.category === 'OBC').length}<br/>
            EWS: {filteredStudents.filter(s => s.category === 'EWS').length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;