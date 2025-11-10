import React, { useState } from 'react';
import { roleConfig } from '../data';
import { Phone, User, Lock, Eye, EyeOff } from '../components/icons';

const RoleCard = ({ role, onSelectRole }) => {
    const config = roleConfig[role];
    return (
        <div
            onClick={() => onSelectRole(role)}
            className="p-6 border-2 border-white/60 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out text-center bg-white/50 backdrop-blur-sm hover:transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:border-blue-300 hover:bg-white/70"
        >
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-lg bg-gradient-to-br ${config.gradient} text-white`}>
                {config.icon}
            </div>
            <div className="text-xl font-semibold text-gray-800 mb-1">{config.title.split(' ')[0]}</div>
            <div className="text-sm text-gray-600">{config.subtitle}</div>
        </div>
    );
};

const RoleSelection = ({ onSelectRole }) => (
    <div className="animate-fade-in">
        <div className="logo text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white animate-float">
                <Phone size={36} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">PH Dialer System</h1>
            <p className="text-gray-600">Welcome back! Please select your role</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RoleCard role="agent" onSelectRole={onSelectRole} />
            <RoleCard role="supervisor" onSelectRole={onSelectRole} />
            <RoleCard role="admin" onSelectRole={onSelectRole} />
        </div>
    </div>
);

const LoginForm = ({ role, onBack, onLogin }) => {
    const config = roleConfig[role];
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (username && password) {
                console.log('Login attempt:', { username, password, role });
                onLogin(); 
            } else {
                setError('Invalid username or password.');
            }
        }, 1500);
    };

    return (
        <div className="animate-slide-in">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 font-medium mb-6 transition-all hover:gap-3 hover:text-blue-600"
            >
                <span className="transform transition-transform duration-300 hover:-translate-x-1">←</span> Back to role selection
            </button>

            <div className="flex items-center gap-5 mb-6 p-5 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md border border-white/40">
                <div className={`w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center text-4xl shadow-lg bg-gradient-to-br ${config.gradient} text-white`}>
                    {config.icon}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{config.title}</h2>
                    <p className="text-gray-600">{config.subtitle}</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm animate-shake">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
                        Username
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <User size={18} className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <Lock size={18} className="text-gray-400" />
                        </span>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-blue-600"
                        >
                            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        Remember me
                    </label>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 px-4 rounded-lg text-white font-semibold uppercase tracking-wide transition-all duration-300 shadow-lg ${
                        loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
};

export const LoginPage = ({ onLogin }) => {
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-400 via-purple-500 to-blue-500">
            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float { animation: float 3s ease-in-out infinite; }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                
                @keyframes slide-in {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-in { animation: slide-in 0.5s ease-out forwards; }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .animate-shake { animation: shake 0.4s ease-in-out; }
                `}
            </style>
            <div className="w-full max-w-2xl rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 p-8 md:p-12 transition-all duration-500">
                {!selectedRole ? (
                    <RoleSelection onSelectRole={setSelectedRole} />
                ) : (
                    <LoginForm
                        role={selectedRole}
                        onBack={() => setSelectedRole(null)}
                        onLogin={onLogin}
                    />
                )}
            </div>
        </div>
    );
};