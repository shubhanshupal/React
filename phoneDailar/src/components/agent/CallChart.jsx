import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { dispositionOptions } from '../../data';

// We must register the components we're using with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CallChart = ({ callHistory }) => {
    
    const dispositionCounts = {};
    dispositionOptions.forEach(opt => { dispositionCounts[opt] = 0; });

    callHistory.forEach(call => {
        if (dispositionCounts.hasOwnProperty(call.disposition)) {
            dispositionCounts[call.disposition]++;
        }
    });

    const data = {
        labels: Object.keys(dispositionCounts),
        datasets: [{
            label: 'Call Outcomes',
            data: Object.values(dispositionCounts),
            backgroundColor: [
                'rgba(34, 197, 94, 0.8)',  // Interested (Green)
                'rgba(239, 68, 68, 0.8)',   // Not Interested (Red)
                'rgba(251, 191, 36, 0.8)', // Not Reachable (Yellow)
                'rgba(59, 130, 246, 0.8)', // Call Back (Blue)
                'rgba(156, 163, 175, 0.8)',// Wrong Number (Gray)
                'rgba(168, 85, 247, 0.8)'  // Voicemail (Purple)
            ],
            borderColor: [
                'rgb(34, 197, 94)',
                'rgb(239, 68, 68)',
                'rgb(251, 191, 36)',
                'rgb(59, 130, 246)',
                'rgb(156, 163, 175)',
                'rgb(168, 85, 247)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Call Disposition Analytics',
                font: { size: 18, weight: 'bold' },
                padding: 20
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
            }
        }
    };

    // The <canvas> is now replaced by the <Bar> component
    return <Bar options={options} data={data} />;
};
