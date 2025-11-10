// src/components/agent/Header.jsx
import React from 'react';
import { User } from '../icons';

export const Header = ({ agentInfo, agentStatus }) => {
    const getStatusColor = () => {
        switch(agentStatus) {
            case 'available': return 'bg-green-500';
            case 'on-call': return 'bg-red-500';
            case 'break': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch(agentStatus) {
            case 'available': return 'Available';
            case 'on-call': return 'On Call';
            case 'break': return 'On Break';
            default: return 'Offline';
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <User className="text-gray-600" size={24} />
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{agentInfo.name}</h2>
                            <p className="text-sm text-gray-500">{agentInfo.id} • {agentInfo.extension}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-6 px-4 py-2 bg-gray-50 rounded-full">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor()} transition-colors`}></div>
                        <span className="text-sm font-medium text-gray-700">{getStatusText()}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

