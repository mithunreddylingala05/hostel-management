import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer style={{ 
        padding: '5rem 0', 
        borderTop: '1px solid var(--border)', 
        background: 'rgba(15, 23, 42, 0.2)',
        marginTop: '0', 
        textAlign: 'center',
        color: 'var(--text-muted)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '0.1em' }}>
            HOSTEL<span style={{ color: 'var(--primary)' }}>HUB</span>
          </div>
          <p style={{ fontSize: '0.9rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Redefining the standard of campus living through intelligent automation and cinematic user experiences. 
            Designed for the future, built for you.
          </p>
          <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>© 2026 HostelHub Management System. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
