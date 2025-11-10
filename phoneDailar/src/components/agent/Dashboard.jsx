import React from 'react';
import { StatCard } from './StatCard';
import { CallChart } from './CallChart';

export const Dashboard = ({ callHistory }) => {
    const totalCalls = callHistory.length;
    const interestedLeads = callHistory.filter(c => c.disposition === 'Interested').length;
    const connectionRate = totalCalls > 0 
        ? Math.round((callHistory.filter(c => c.disposition !== 'Not Reachable').length / totalCalls) * 100)
        : 0;

    return (
        <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Calls Today" value={totalCalls} colorClass="text-blue-600" />
                <StatCard title="Interested Leads" value={interestedLeads} colorClass="text-green-600" />
                <StatCard title="Connection Rate" value={`${connectionRate}%`} colorClass="text-purple-600" />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" style={{height: 'calc(100vh - 400px)'}}>
                <CallChart callHistory={callHistory} />
            </div>
        </div>
    );
};