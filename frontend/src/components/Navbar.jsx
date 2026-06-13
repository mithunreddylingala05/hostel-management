import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LogIn, UserPlus, ShieldCheck, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      padding: '1.5rem 0',
      borderBottom: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 0,
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <ShieldCheck size={28} />
          <span>HostelHub</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={18} /> Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <button 
                onClick={logout}
                className="btn-outline" 
                style={{ 
                  padding: '0.5rem 1.25rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  border: '1px solid var(--error)',
                  color: 'var(--error)'
                }}
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
