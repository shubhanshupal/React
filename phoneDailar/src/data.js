export const agentInfo = {
    name: 'John Doe',
    id: 'AGT-1001',
    station: 'Station 5',
    extension: '2105'
};

export const initialCallHistory = [
    { id: 1, date: '2025-10-28 10:30', number: '+1-555-0123', duration: '5:23', disposition: 'Interested' },
    { id: 2, date: '2025-10-28 10:15', number: '+1-555-0456', duration: '2:45', disposition: 'Not Reachable' },
    { id: 3, date: '2025-10-28 09:50', number: '+1-555-0789', duration: '8:12', disposition: 'Call Back' },
    { id: 4, date: '2025-10-28 09:30', number: '+1-555-0321', duration: '3:58', disposition: 'Not Interested' },
    { id: 5, date: '2025-10-28 09:10', number: '+1-555-0654', duration: '4:15', disposition: 'Interested' },
    { id: 6, date: '2025-10-28 08:45', number: '+1-555-0987', duration: '1:30', disposition: 'Voicemail' },
];

export const dispositionOptions = [
    'Interested',
    'Not Interested',
    'Not Reachable',
    'Call Back',
    'Wrong Number',
    'Voicemail'
];

export const dialpadKeys = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'
];

export const roleConfig = {
    agent: {
        title: 'Agent Login',
        subtitle: 'Access Dialer',
        icon: '👤',
        gradient: 'from-blue-500 to-indigo-600'
    },
    supervisor: {
        title: 'Supervisor Login',
        subtitle: 'Monitor and manage',
        icon: '👨‍💼',
        gradient: 'from-pink-500 to-rose-500'
    },
    admin: {
        title: 'Administrator Login',
        subtitle: 'Full system control',
        icon: '⚙️',
        gradient: 'from-sky-500 to-cyan-500'
    }
};