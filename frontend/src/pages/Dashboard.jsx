import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, MessageSquare, ClipboardList, Settings as SettingsIcon, LogOut, Sparkles, Zap } from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Import sub-pages
import Roommates from './Roommates';
import Complaints from './Complaints';
import GatePasses from './GatePasses';
import Settings from './Settings';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  if (!user) {
    return <Navigate to="/login" />;
  }

  const role = user.role?.toLowerCase() || 'student';

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Overview user={user} />;
      case 'Roommates':
      case 'Residents':
        return <Roommates />;
      case 'Complaints':
      case 'Tickets':
        return <Complaints />;
      case 'Gate Passes':
      case 'Access Logs':
        return <GatePasses />;
      case 'Settings':
      case 'System Settings':
        return <Settings />;
      default:
        return <Overview user={user} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        borderRight: '1px solid var(--glass-border)', 
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        background: 'rgba(15, 23, 42, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            width: '45px', 
            height: '45px', 
            background: role === 'admin' ? 'var(--error)' : role === 'warden' ? 'var(--secondary)' : 'var(--primary)', 
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'white',
            boxShadow: `0 0 20px ${role === 'admin' ? 'rgba(239, 68, 68, 0.4)' : role === 'warden' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.4)'}`
          }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h4 style={{ fontSize: '1rem' }}>{user.name}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{role}</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            active={activeTab === 'Overview'} 
            onClick={() => setActiveTab('Overview')} 
          />

          {role === 'student' && (
            <>
              <SidebarItem 
                icon={<Users size={20} />} 
                label="Roommates" 
                active={activeTab === 'Roommates'} 
                onClick={() => setActiveTab('Roommates')} 
              />
              <SidebarItem 
                icon={<MessageSquare size={20} />} 
                label="Complaints" 
                active={activeTab === 'Complaints'} 
                onClick={() => setActiveTab('Complaints')} 
              />
              <SidebarItem 
                icon={<ClipboardList size={20} />} 
                label="Gate Passes" 
                active={activeTab === 'Gate Passes'} 
                onClick={() => setActiveTab('Gate Passes')} 
              />
            </>
          )}

          {role === 'warden' && (
            <>
              <SidebarItem 
                icon={<Users size={20} />} 
                label="Residents" 
                active={activeTab === 'Residents'} 
                onClick={() => setActiveTab('Residents')} 
              />
              <SidebarItem 
                icon={<MessageSquare size={20} />} 
                label="Tickets" 
                active={activeTab === 'Tickets'} 
                onClick={() => setActiveTab('Tickets')} 
              />
              <SidebarItem 
                icon={<ClipboardList size={20} />} 
                label="Access Logs" 
                active={activeTab === 'Access Logs'} 
                onClick={() => setActiveTab('Access Logs')} 
              />
            </>
          )}

          {role === 'admin' && (
            <>
              <SidebarItem 
                icon={<Users size={20} />} 
                label="User Mgmt" 
                active={activeTab === 'Residents'} 
                onClick={() => setActiveTab('Residents')} 
              />
              <SidebarItem 
                icon={<LayoutDashboard size={20} />} 
                label="Analytics" 
                active={activeTab === 'Complaints'} 
                onClick={() => setActiveTab('Complaints')} 
              />
            </>
          )}

          <SidebarItem 
            icon={<SettingsIcon size={20} />} 
            label={role === 'admin' ? "System Settings" : "Settings"} 
            active={activeTab.includes('Settings')} 
            onClick={() => setActiveTab('Settings')} 
          />
        </nav>

        <button 
          onClick={logout} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            color: 'var(--error)',
            background: 'transparent',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {renderContent()}
      </main>
    </div>
  );
};

const Overview = ({ user }) => {
  const role = user.role?.toLowerCase() || 'student';

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '4rem', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '0',
          width: '100px',
          height: '4px',
          background: `linear-gradient(to right, ${role === 'admin' ? 'var(--error)' : role === 'warden' ? 'var(--secondary)' : 'var(--primary)'}, transparent)`,
          borderRadius: '2px'
        }}></div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>
          {role === 'admin' ? 'Control' : role === 'warden' ? 'Command' : 'Systems'} <span style={{ color: role === 'admin' ? 'var(--error)' : role === 'warden' ? 'var(--secondary)' : 'var(--primary)', WebkitTextFillColor: 'initial', background: 'none' }}>Online</span>, {user.name.split(' ')[0]}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', letterSpacing: '0.02em' }}>
          {role === 'admin' ? 'System-wide administrative access granted.' : role === 'warden' ? 'Residential management protocols active.' : 'HostelHub Intelligence active. All protocols within nominal parameters.'}
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {role === 'student' && (
          <>
            <StatCard label="Unit Status" value="Secured" color="var(--success)" glow="rgba(16, 185, 129, 0.2)" />
            <StatCard label="Next Mess Protocol" value="Lunch Served" color="var(--primary)" glow="rgba(139, 92, 246, 0.2)" />
            <StatCard label="Engagement" value="High (98%)" color="var(--secondary)" glow="rgba(6, 182, 212, 0.2)" />
          </>
        )}
        {(role === 'warden' || role === 'admin') && (
          <>
            <StatCard label="Total Residents" value="482" color="var(--primary)" glow="rgba(139, 92, 246, 0.2)" />
            <StatCard label="Pending Tickets" value="12" color="var(--error)" glow="rgba(239, 68, 68, 0.2)" />
            <StatCard label="Occupancy Rate" value="94%" color="var(--success)" glow="rgba(16, 185, 129, 0.2)" />
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="glass-card" style={{ border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={24} color="var(--accent-gold)" /> Intelligence Feed
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {role === 'student' ? (
              <>
                <ActivityItem title="Complaint Resolved" desc="Maintenance team has completed the 'Light bulb replacement' in Room 302." time="09:42 AM" />
                <ActivityItem title="Security Protocol" desc="Digital Gate Pass for 'Local Market' has been cryptographically signed." time="Yesterday" />
                <ActivityItem title="System Update" desc="Mess registration for the upcoming semester is now operational." time="2 days ago" />
              </>
            ) : (
              <>
                <ActivityItem title="Critical Maintenance" desc="Electrical board failure reported in Block-B. Priority: Immediate." time="Just Now" />
                <ActivityItem title="Access Grant Request" desc="5 students requested overnight leave for 'Tech Summit'." time="1 hour ago" />
                <ActivityItem title="Inventory Alert" desc="Mess supplies for current cycle are 15% below threshold." time="4 hours ago" />
              </>
            )}
          </div>
        </div>

        <div className="glass-card" style={{ 
          background: `linear-gradient(135deg, ${role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : role === 'warden' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(139, 92, 246, 0.1)'}, rgba(15, 23, 42, 0.05))`,
          border: `1px solid ${role === 'admin' ? 'var(--error)' : role === 'warden' ? 'var(--secondary)' : 'var(--primary)'}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: role === 'admin' ? 'var(--error)' : role === 'warden' ? 'var(--secondary)' : 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: `0 0 30px ${role === 'admin' ? 'rgba(239, 68, 68, 0.4)' : role === 'warden' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(139, 92, 246, 0.4)'}`
          }}>
            <Zap color="white" size={30} />
          </div>
          <h4 style={{ fontSize: '1.25rem' }}>{role === 'admin' ? 'System Core' : role === 'warden' ? 'Safe Zone' : 'System Integrity'}</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {role === 'admin' ? 'Global infrastructure systems operating at peak efficiency.' : role === 'warden' ? 'Resident safety and facility protocols are 100% compliant.' : 'All hostel services are running smoothly at 100% capacity.'}
          </p>
          <button className="btn-primary" style={{ marginTop: '1rem', width: '100%', background: role === 'admin' ? 'var(--error)' : role === 'warden' ? 'var(--secondary)' : 'var(--primary)' }}>
            {role === 'admin' ? 'Terminal Access' : role === 'warden' ? 'Facility Map' : 'Run Diagnostics'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem', 
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      background: active ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      cursor: 'pointer',
      fontWeight: active ? 600 : 400,
      transition: 'all 0.2s',
      border: active ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent'
    }}
    onMouseEnter={(e) => {
      if (!active) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
    }}
    onMouseLeave={(e) => {
      if (!active) e.currentTarget.style.background = 'transparent';
    }}
  >
    {icon} <span>{label}</span>
  </div>
);

const StatCard = ({ label, value, color, glow }) => (
  <div className="glass-card" style={{ 
    padding: '2rem', 
    border: '1px solid var(--border)',
    boxShadow: `0 10px 30px -10px ${glow}`,
    transition: 'transform 0.3s ease'
  }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
     onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{label}</p>
    <h2 style={{ color, fontSize: '2.25rem', WebkitTextFillColor: 'initial', background: 'none' }}>{value}</h2>
  </div>
);

const ActivityItem = ({ title, desc, time }) => (
  <div style={{ 
    padding: '1rem', 
    borderRadius: '0.5rem', 
    background: 'rgba(255, 255, 255, 0.02)',
    borderLeft: '4px solid var(--primary)'
  }}>
    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{title}</h4>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{desc}</p>
    <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 500 }}>{time}</p>
  </div>
);

export default Dashboard;
