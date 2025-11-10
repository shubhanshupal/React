import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  Bell, 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Home,
  UserCheck,
  GraduationCap,
  CreditCard,
  Send,
  FileText,
  Moon,
  Sun
} from 'lucide-react';

const SchoolERP = () => {
  const [currentUser, setCurrentUser] = useState({ 
    role: 'admin', 
    name: 'John Smith', 
    school: 'Sunrise International School' 
  });
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Sample data
  const [students, setStudents] = useState([
    { 
      id: 'STU001', 
      name: 'Alice Johnson', 
      class: '10th', 
      section: 'A', 
      rollNo: '001', 
      fatherName: 'Robert Johnson',
      phone: '+91 9876543210',
      email: 'alice.j@student.sunrise.edu',
      address: '123 Main Street, Delhi',
      category: 'General',
      admissionDate: '2023-04-15',
      status: 'Active',
      attendance: 92,
      fees: { paid: 45000, pending: 5000, total: 50000 }
    },
    { 
      id: 'STU002', 
      name: 'Raj Patel', 
      class: '10th', 
      section: 'A', 
      rollNo: '002', 
      fatherName: 'Suresh Patel',
      phone: '+91 9876543211',
      email: 'raj.p@student.sunrise.edu',
      address: '456 Park Road, Delhi',
      category: 'OBC',
      admissionDate: '2023-04-16',
      status: 'Active',
      attendance: 88,
      fees: { paid: 40000, pending: 5000, total: 45000 }
    },
    { 
      id: 'STU003', 
      name: 'Priya Sharma', 
      class: '9th', 
      section: 'B', 
      rollNo: '015', 
      fatherName: 'Amit Sharma',
      phone: '+91 9876543212',
      email: 'priya.s@student.sunrise.edu',
      address: '789 Garden Lane, Delhi',
      category: 'EWS',
      admissionDate: '2023-04-17',
      status: 'Active',
      attendance: 95,
      fees: { paid: 20000, pending: 2000, total: 22000 }
    }
  ]);

  const [attendanceData, setAttendanceData] = useState({
    today: { present: 485, absent: 15, total: 500, percentage: 97 },
    thisWeek: { present: 2400, absent: 100, total: 2500, percentage: 96 },
    thisMonth: { present: 9800, absent: 200, total: 10000, percentage: 98 }
  });

  const [fees, setFees] = useState({
    collected: 4500000,
    pending: 500000,
    total: 5000000,
    collectionRate: 90,
    categories: {
      General: { collected: 2000000, pending: 200000 },
      OBC: { collected: 1500000, pending: 150000 },
      EWS: { collected: 800000, pending: 100000 },
      'ST/SC': { collected: 200000, pending: 50000 }
    }
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Fee collection due date approaching", type: "warning", time: "2 hours ago" },
    { id: 2, message: "New student admission approved", type: "success", time: "4 hours ago" },
    { id: 3, message: "Staff meeting scheduled for tomorrow", type: "info", time: "1 day ago" }
  ]);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'students', name: 'Student Management', icon: Users },
    { id: 'attendance', name: 'Attendance', icon: UserCheck },
    { id: 'fees', name: 'Fee Management', icon: CreditCard },
    { id: 'communication', name: 'Communication', icon: MessageSquare },
    { id: 'staff', name: 'Staff Management', icon: User },
    { id: 'reports', name: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">500</p>
              <p className="text-sm text-green-600">+12 this month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Attendance</p>
              <p className="text-3xl font-bold text-gray-900">{attendanceData.today.percentage}%</p>
              <p className="text-sm text-green-600">{attendanceData.today.present}/{attendanceData.today.total} present</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fee Collection</p>
              <p className="text-3xl font-bold text-gray-900">₹{(fees.collected/100000).toFixed(1)}L</p>
              <p className="text-sm text-orange-600">₹{(fees.pending/100000).toFixed(1)}L pending</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-3xl font-bold text-gray-900">45</p>
              <p className="text-sm text-blue-600">2 on leave today</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium">{attendanceData.thisWeek.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${attendanceData.thisWeek.percentage}%`}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="text-sm font-medium">{attendanceData.thisMonth.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: `${attendanceData.thisMonth.percentage}%`}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${
                  notification.type === 'success' ? 'bg-green-100' : 
                  notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : notification.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <Bell className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Student Management Component
  const StudentManagement = () => {
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
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
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

  // Fee Management Component
  const FeeManagement = () => {
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

  // Communication Component
  const CommunicationSystem = () => {
    const [messageType, setMessageType] = useState('whatsapp');
    const [recipient, setRecipient] = useState('all');
    const [message, setMessage] = useState('');

    const sendNotification = () => {
      if (message.trim()) {
        alert(`${messageType.toUpperCase()} sent to ${recipient} successfully!`);
        setMessage('');
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Communication System</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Send className="w-4 h-4 mr-2 inline" />
            Bulk Message
          </button>
        </div>

        {/* Quick Send Message */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Quick Message</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="whatsapp">WhatsApp (FREE)</option>
                <option value="sms">SMS</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Parents (500)</option>
                <option value="class10">Class 10 Parents (50)</option>
                <option value="class9">Class 9 Parents (45)</option>
                <option value="staff">All Staff (45)</option>
                <option value="pending_fees">Fee Defaulters ({students.filter(s => s.fees.pending > 0).length})</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost Estimate</label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-green-600">
                  {messageType === 'whatsapp' ? 'FREE' : messageType === 'sms' ? '₹150-300' : 'FREE'}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={sendNotification}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </div>

        {/* Message Templates */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" 
                 onClick={() => setMessage('Dear Parent, Your child was absent today. Please ensure regular attendance. - Sunrise School')}>
              <h4 className="font-medium text-gray-900">Absence Alert</h4>
              <p className="text-sm text-gray-600 mt-1">Notify parents about student absence</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => setMessage('Dear Parent, Fee payment is due. Please pay ₹5,000 by [date]. Thank you. - Sunrise School')}>
              <h4 className="font-medium text-gray-900">Fee Reminder</h4>
              <p className="text-sm text-gray-600 mt-1">Send fee payment reminders</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => setMessage('Dear Parent, School will remain closed tomorrow due to weather conditions. Stay safe. - Sunrise School')}>
              <h4 className="font-medium text-gray-900">Holiday Notice</h4>
              <p className="text-sm text-gray-600 mt-1">Announce school holidays</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                 onClick={() => setMessage('Dear Parent, Parent-Teacher meeting on [date] at [time]. Your presence is requested. - Sunrise School')}>
              <h4 className="font-medium text-gray-900">Event Invitation</h4>
              <p className="text-sm text-gray-600 mt-1">Invite parents to school events</p>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fee Reminder - Class 10</p>
                    <p className="text-sm text-gray-600">Sent to 45 parents via WhatsApp (FREE)</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Send className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Absence Alert</p>
                    <p className="text-sm text-gray-600">Sent to 12 parents via WhatsApp (FREE)</p>
                  </div>
                  <span className="text-xs text-gray-500">4 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Attendance Management Component
  const AttendanceManagement = () => {
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

  // Modal Component
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

  // Main Render Function
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'fees':
        return <FeeManagement />;
      case 'communication':
        return <CommunicationSystem />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out
  ${darkMode ? 'dark:bg-gray-900 dark:border-gray-700 bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`flex items-center justify-between h-16 px-6 border-b ${darkMode ? 'dark:border-gray-700 border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-blue-800' : 'bg-blue-600'}`}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className={`ml-2 text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>EduManage</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} md:hidden`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeModule === module.id
                      ? `${darkMode ? 'bg-gray-800 text-yellow-400 border-r-2 border-yellow-400' : 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'}`
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {module.name}
                </button>
              );
            })}
          </div>
        </nav>

        <div className={`absolute bottom-0 w-full p-4 border-t ${darkMode ? 'dark:border-gray-700 border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
              <User className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentUser.name}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.role}</p>
            </div>
            <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'} ml-auto`}>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'md:ml-64' : ''} transition-all duration-200`}>
        {/* Top Navigation */}
        <div className={`bg-white shadow-sm border-b border-gray-200 ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`}>
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`text-gray-500 hover:text-gray-700 mr-4 ${darkMode ? 'dark:text-gray-300 dark:hover:text-white' : ''}`}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className={`text-lg font-semibold capitalize ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{activeModule}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentUser.school}</div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors ${darkMode ? 'dark:bg-gray-700 dark:text-yellow-400 dark:border-gray-600' : 'text-gray-600'}`}
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {renderActiveModule()}
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        type={modalType}
        student={selectedStudent}
      />
    </div>
  );
};

export default SchoolERP;