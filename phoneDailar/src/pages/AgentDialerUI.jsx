import React, { useState, useEffect, useRef } from 'react';
import { agentInfo, initialCallHistory, dispositionOptions, dialpadKeys } from '../data';
import { Sidebar } from '../components/agent/Sidebar';
import { Header } from '../components/agent/Header';
import { Dashboard } from '../components/agent/Dashboard';
import { CallHistoryTable } from '../components/agent/CallHistoryTable';
import { Phone, PhoneOff, Clock } from '../components/icons';

export const AgentDialerUI = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [agentStatus, setAgentStatus] = useState('available');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callActive, setCallActive] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [currentCallNumber, setCurrentCallNumber] = useState('');
    const [disposition, setDisposition] = useState('');
    const [showDisposition, setShowDisposition] = useState(false);
    const [callHistory, setCallHistory] = useState(initialCallHistory);
    
    const timerRef = useRef(null);

    useEffect(() => {
        if (callActive) {
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [callActive]);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleDialpadClick = (digit) => {
        setPhoneNumber(prev => prev + digit);
    };

    const makeCall = async (number) => {
        if (!number || callActive) return;
        
        console.log('Making call to:', number);
        setCallActive(true);
        setCurrentCallNumber(number);
        setAgentStatus('on-call');
        setShowDisposition(false);
        setCallDuration(0);
    };

    const hangupCall = async () => {
        if (!callActive) return;

        console.log('Hanging up call...');
        setCallActive(false);
        setAgentStatus('available');
        setShowDisposition(true);
    };

    const saveDisposition = async () => {
        if (!disposition) return;
        
        console.log('Saving disposition:', disposition);
        
        const newCall = {
            id: callHistory.length + 1,
            date: new Date().toLocaleString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            number: currentCallNumber,
            duration: formatDuration(callDuration),
            disposition: disposition
        };
        
        setCallHistory([newCall, ...callHistory]);
        
        setShowDisposition(false);
        setDisposition('');
        setPhoneNumber('');
        setCurrentCallNumber('');
        setCallDuration(0);
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={onLogout} 
            />

            <div className="flex-1 flex flex-col">
                <Header agentInfo={agentInfo} agentStatus={agentStatus} />

                <main className="flex-1 overflow-auto p-8">
                    {activeTab === 'home' && (
                        <div className="h-full flex flex-col lg:flex-row gap-6">
                            <Dashboard callHistory={callHistory} />

                            <div className="w-full lg:w-96 flex-shrink-0">
                                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-8">
                                    
                                    {callActive ? (
                                        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-center gap-2 text-green-700 mb-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="font-medium text-sm">Active Call</span>
                                            </div>
                                            <div className="text-xl font-mono font-semibold text-gray-800 mb-2">{currentCallNumber}</div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock size={18} />
                                                <span className="text-2xl font-mono font-semibold">{formatDuration(callDuration)}</span>
                                            </div>
                                        </div>
                                    ) : showDisposition ? (
                                        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="text-sm text-blue-700 mb-1">Last Call</div>
                                            <div className="text-lg font-semibold text-gray-800 mb-1">{currentCallNumber}</div>
                                            <div className="text-sm text-gray-600 mb-3">Duration: {formatDuration(callDuration)}</div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Disposition</label>
                                            <select
                                                value={disposition}
                                                onChange={(e) => setDisposition(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 text-sm"
                                            >
                                                <option value="">Select...</option>
                                                {dispositionOptions.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={saveDisposition}
                                                disabled={!disposition}
                                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                            >
                                                Save Disposition
                                            </button>
                                        </div>
                                    ) : null}

                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter phone number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={callActive || showDisposition}
                                    />
                                    
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {dialpadKeys.map((digit) => (
                                            <button
                                                key={digit}
                                                onClick={() => handleDialpadClick(digit)}
                                                disabled={callActive || showDisposition}
                                                className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold text-lg py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {digit}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => makeCall(phoneNumber)}
                                            disabled={callActive || !phoneNumber || showDisposition}
                                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Phone size={18} />
                                            Call
                                        </button>
                                        <button
                                            onClick={hangupCall}
                                            disabled={!callActive}
                                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <PhoneOff size={18} />
                                            Hangup
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <CallHistoryTable callHistory={callHistory} />
                    )}
                </main>
            </div>
        </div>
    );
};
