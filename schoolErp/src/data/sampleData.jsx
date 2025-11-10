// Sample data for the School ERP system

export const initialStudents = [
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
];

export const initialAttendanceData = {
  today: { present: 485, absent: 15, total: 500, percentage: 97 },
  thisWeek: { present: 2400, absent: 100, total: 2500, percentage: 96 },
  thisMonth: { present: 9800, absent: 200, total: 10000, percentage: 98 }
};

export const initialFees = {
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
};

export const initialNotifications = [
  { id: 1, message: "Fee collection due date approaching", type: "warning", time: "2 hours ago" },
  { id: 2, message: "New student admission approved", type: "success", time: "4 hours ago" },
  { id: 3, message: "Staff meeting scheduled for tomorrow", type: "info", time: "1 day ago" }
];