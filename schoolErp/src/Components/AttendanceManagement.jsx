import React, { useState } from 'react';
import { 
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react';

const AttendanceManagement = ({ students }) => {
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10th');
  const [attendanceRecords, setAttendanceRecords] = useState(
    students.filter(s => s.class === selectedClass).map(student => ({
      ...student,
      todayStatus: Math.random() > 0.1 ? 'present' : 'absent'
    }))
  );

  const updateAttendance = (studentId, status) => {
    setAttendanceRecords(records => 
      records.map(record => 
        record.id === studentId ? {...record, todayStatus: status} : record
      )
    );
  };

  const saveAttendance = () => {
    alert('Attendance saved successfully! Parents will be notified via WhatsApp.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
        <button 
          onClick={saveAttendance}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <CheckCircle className="w-4 h-4 mr-2 inline" />
          Save & Notify Parents
        </button>
      </div>

      {/* Attendance Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setAttendanceRecords(
                  students.filter(s => s.class === e.target.value).map(student => ({
                    ...student,
                    todayStatus: Math.random() > 0.1 ? 'present' : 'absent'
                  }))
                );
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="9th">9th Grade</option>
              <option value="10th">10th Grade</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Actions</label>
            <div className="flex space-x-2">
              <button 
                onClick={() => setAttendanceRecords(records => records.map(r => ({...r, todayStatus: 'present'})))}
                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                Mark All Present
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Present Today</p>
              <p className="text-2xl font-bold text-green-600">
                {attendanceRecords.filter(r => r.todayStatus === 'present').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Absent Today</p>
              <p className="text-2xl font-bold text-red-600">
                {attendanceRecords.filter(r => r.todayStatus === 'absent').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((attendanceRecords.filter(r => r.todayStatus === 'present').length / attendanceRecords.length) * 100)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Class {selectedClass} - Attendance</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {attendanceRecords.map((student) => (
            <div key={student.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{student.name[0]}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500">Roll: {student.rollNo} | Overall: {student.attendance}%</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateAttendance(student.id, 'present')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      student.todayStatus === 'present'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => updateAttendance(student.id, 'absent')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      student.todayStatus === 'absent'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;