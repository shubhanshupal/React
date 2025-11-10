import React from 'react';
import { Phone, Home, History, LogOut } from '../icons';

const SidebarButton = ({ icon, label, isActive, onClick, isLogout = false }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
            isActive
                ? 'bg-blue-50 text-blue-600 font-medium'
                : isLogout
                ? 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                : 'text-gray-600 hover:bg-gray-50'
        } ${isLogout ? 'font-medium' : ''}`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export const Sidebar = ({ activeTab, setActiveTab, onLogout }) => (
    <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
             <span className="p-2 bg-blue-600 rounded-lg text-white">
                <Phone size={24} />
            </span>
            <h1 className="text-2xl font-bold text-blue-600">Call Center</h1>
        </div>
        <nav className="p-4 flex flex-col justify-between" style={{ height: 'calc(100vh - 89px)' }}>
            <div>
                <SidebarButton
                    icon={<Home size={20} />}
                    label="Dashboard"
                    isActive={activeTab === 'home'}
                    onClick={() => setActiveTab('home')}
                />
                <SidebarButton
                    icon={<History size={20} />}
                    label="Call History"
                    isActive={activeTab === 'history'}
                    onClick={() => setActiveTab('history')}
                />
            </div>
            <div>
                <SidebarButton
                    icon={<LogOut size={20} />}
                    label="Logout"
                    isLogout={true}
                    onClick={onLogout}
                />
            </div>
        </nav>
    </div>
);