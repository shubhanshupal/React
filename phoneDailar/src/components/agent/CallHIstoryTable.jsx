import React from 'react';

export const CallHistoryTable = ({ callHistory }) => {
    
    const getDispositionBadge = (disposition) => {
        switch (disposition) {
            case 'Interested': return 'bg-green-100 text-green-700';
            case 'Not Interested': return 'bg-red-100 text-red-700';
            case 'Call Back': return 'bg-blue-100 text-blue-700';
            case 'Not Reachable': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="max-w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Call History</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Disposition</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {callHistory.map((call) => (
                            <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-800">{call.date}</td>
                                <td className="px-6 py-4 text-sm font-mono text-gray-800">{call.number}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{call.duration}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDispositionBadge(call.disposition)}`}>
                                        {call.disposition}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
