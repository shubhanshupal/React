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

// Import components
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import AttendanceManagement from './components/AttendanceManagement';
import FeeManagement from './components/FeeManagement';
import CommunicationSystem from './components/CommunicationSystem';
import Modal from './components/Modal';

// Import sample data
import { initialStudents, initialAttendanceData, initialFees, initialNotifications } from './data/sampleData';

const SchoolERP = () => {
  const [currentUser, setCurrentUser] = useState({ 
    role: 'admin', 
    name: 'Aditi Singh', 
    school: 'Sunrise International School' 
  });
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // State for data
  const [students, setStudents] = useState(initialStudents);
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [fees, setFees] = useState(initialFees);
  const [notifications, setNotifications] = useState(initialNotifications);

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

  // Main Render Function
  const renderActiveModule = () => {
    const commonProps = {
      students,
      setStudents,
      attendanceData,
      setAttendanceData,
      fees,
      setFees,
      notifications,
      setNotifications,
      setSelectedStudent,
      setShowModal,
      setModalType,
      darkMode
    };

    switch (activeModule) {
      case 'dashboard':
        return <Dashboard {...commonProps} currentUser={currentUser} />;
      case 'students':
        return <StudentManagement {...commonProps} />;
      case 'attendance':
        return <AttendanceManagement {...commonProps} />;
      case 'fees':
        return <FeeManagement {...commonProps} />;
      case 'communication':
        return <CommunicationSystem {...commonProps} />;
      default:
        return <Dashboard {...commonProps} currentUser={currentUser} />;
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
            <span className={`ml-2 text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Kaksha Manage</span>
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