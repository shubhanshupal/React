import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { AgentDialerUI } from './pages/AgentDialerUI';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // The useEffect for loading Chart.js is no longer needed!
    // We will import it directly in the CallChart component.

    const handleLogin = () => {
        console.log("User logged in");
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        console.log("User logged out");
        setIsAuthenticated(false);
    };

    return (
        <div className="antialiased">
            {isAuthenticated 
                ? <AgentDialerUI onLogout={handleLogout} /> 
                : <LoginPage onLogin={handleLogin} />
            }
        </div>
    );
}