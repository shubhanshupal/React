import React from 'react';

export const StatCard = ({ title, value, colorClass }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className={`text-3xl font-bold ${colorClass} mb-2`}>{value}</div>
        <div className="text-gray-600">{title}</div>
    </div>
);