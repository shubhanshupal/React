import React, { useState } from 'react';
import { 
  Plus,
  Send,
  TrendingUp,
  AlertCircle,
  PieChart,
  Users,
  CreditCard,
  FileText
} from 'lucide-react';

const FeeManagement = ({ students, fees }) => {
  const [feeFilter, setFeeFilter] = useState('all');
  
  const filteredStudentsForFees = students.filter(student => {
    if (feeFilter === 'pending') return student.fees.pending > 0;
    if (feeFilter === 'paid') return student.fees.pending === 0;
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Collect Fee
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Send className="w-4 h-4 mr-2 inline" />
            Send Reminders
          </button>
        </div>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collection</p>
              <p className="text-2xl font-bold text-green-600">₹{(fees.collected/100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-500">This year</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-red-600">₹{(fees.pending/100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-500">Outstanding</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-blue-600">{fees.collectionRate}%</p>
              <p className="text-sm text-gray-500">Overall</p>
            </div>
            <PieChart className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Defaulters</p>
              <p className="text-2xl font-bold text-orange-600">
                {students.filter(s => s.fees.pending > 0).length}
              </p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Fee Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex space-x-4">
          <button
            onClick={() => setFeeFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              feeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            All Students ({students.length})
          </button>
          <button
            onClick={() => setFeeFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              feeFilter === 'pending' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Fee Pending ({students.filter(s => s.fees.pending > 0).length})
          </button>
          <button
            onClick={() => setFeeFilter('paid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              feeFilter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Fee Paid ({students.filter(s => s.fees.pending === 0).length})
          </button>
        </div>
      </div>

      {/* Fee Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudentsForFees.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{student.name[0]}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.class} - {student.section}</div>
                      </div>
                    </div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{student.fees.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    ₹{student.fees.paid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    ₹{student.fees.pending.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.fees.pending === 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.fees.pending === 0 ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">
                        <CreditCard className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;