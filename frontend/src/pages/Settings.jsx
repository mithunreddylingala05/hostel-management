import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, User, Palette, ArrowLeft, Save, ShieldCheck, Mail, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const [currentSection, setCurrentSection] = useState('main'); // 'main', 'profile', 'security', etc.
  const { user } = useAuth();

  if (currentSection === 'profile') {
    return (
      <div className="animate-fade-in">
        <header style={{ marginBottom: '3rem' }}>
          <button onClick={() => setCurrentSection('main')} className="btn-link" style={{ marginBottom: '1rem', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Account Suite
          </button>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Profile Intelligence</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your identity and contact parameters.</p>
        </header>

        <div className="glass-card" style={{ maxWidth: '800px', padding: '3.5rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                <input type="text" defaultValue={user?.name} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact ID</label>
                <input type="email" defaultValue={user?.email} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bio / Status</label>
              <textarea rows="3" placeholder="Intelligence analyst for Block-C..." style={{ resize: 'none' }}></textarea>
            </div>
            <button className="btn-primary" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              <Save size={18} /> Update Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'security') {
    return (
      <div className="animate-fade-in">
        <header style={{ marginBottom: '3rem' }}>
          <button onClick={() => setCurrentSection('main')} className="btn-link" style={{ marginBottom: '1rem', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Account Suite
          </button>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Firewall Protocols</h1>
          <p style={{ color: 'var(--text-muted)' }}>Secure your core systems and access keys.</p>
        </header>

        <div className="glass-card" style={{ maxWidth: '800px', padding: '3.5rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <ShieldCheck color="var(--success)" size={32} />
                <div>
                   <h4 style={{ color: 'white', marginBottom: '0.25rem' }}>Encryption Active</h4>
                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your account is currently protected by 256-bit AES encryption.</p>
                </div>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Access Key</label>
                  <input type="password" placeholder="••••••••••••" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New Access Key</label>
                  <input type="password" placeholder="••••••••••••" />
                </div>
             </div>

             <button className="btn-primary" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
               <Lock size={18} /> Authorize Key Change
             </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'notifications') {
    return (
      <div className="animate-fade-in">
        <header style={{ marginBottom: '3rem' }}>
          <button onClick={() => setCurrentSection('main')} className="btn-link" style={{ marginBottom: '1rem', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Account Suite
          </button>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Notification Streams</h1>
          <p style={{ color: 'var(--text-muted)' }}>Configure real-time intelligence feeds.</p>
        </header>

        <div className="glass-card" style={{ maxWidth: '800px', padding: '3rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <NotificationToggle title="Mess Hall Updates" desc="Receive alerts for daily menus and schedule changes." active={true} />
            <NotificationToggle title="Gate Pass Approvals" desc="Instant notifications when your digital pass is signed." active={true} />
            <NotificationToggle title="Security Alerts" desc="Critical updates regarding campus safety protocols." active={false} />
            <NotificationToggle title="Maintenance Reports" desc="Status updates for your raised technical tickets." active={true} />
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'appearance') {
    return (
      <div className="animate-fade-in">
        <header style={{ marginBottom: '3rem' }}>
          <button onClick={() => setCurrentSection('main')} className="btn-link" style={{ marginBottom: '1rem', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
            <ArrowLeft size={18} /> Account Suite
          </button>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Interface Matrix</h1>
          <p style={{ color: 'var(--text-muted)' }}>Customize your visual HUD parameters.</p>
        </header>

        <div className="glass-card" style={{ maxWidth: '800px', padding: '3.5rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
               <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>Core HUD Theme</h3>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                  <ThemeOption name="Obsidian Noir" active={true} color="#0f172a" />
                  <ThemeOption name="Deep Sapphire" active={false} color="#1e293b" />
                  <ThemeOption name="Emerald Ghost" active={false} color="#064e3b" />
               </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <h4 style={{ color: 'white' }}>Glassmorphism Intensity</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Control the visual depth of interface cards.</p>
               </div>
               <input type="range" style={{ width: '200px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Account <span style={{ color: 'var(--primary)' }}>Suite</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Configure host intelligence and personal parameters.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SettingsSection 
          icon={<User size={22} />} 
          title="Profile Intelligence" 
          desc="Update your name, email, and personal identification."
          onClick={() => setCurrentSection('profile')}
        />
        <SettingsSection 
          icon={<Lock size={22} />} 
          title="Security Protocols" 
          desc="Manage firewall settings, access keys, and 2FA."
          onClick={() => setCurrentSection('security')}
        />
        <SettingsSection 
          icon={<Bell size={22} />} 
          title="Notification Streams" 
          desc="Configure real-time alerts for mess, gate, and security."
          onClick={() => setCurrentSection('notifications')}
        />
        <SettingsSection 
          icon={<Palette size={22} />} 
          title="Interface Matrix" 
          desc="Customize HUD theme, color space, and grid transparency."
          onClick={() => setCurrentSection('appearance')}
        />
      </div>
    </div>
  );
};

const SettingsSection = ({ icon, title, desc, onClick }) => (
  <div 
    className="glass-card" 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: '1px solid var(--border)',
      padding: '2rem 3rem',
      position: 'relative',
      overflow: 'hidden'
    }} 
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.02) translateX(10px)';
      e.currentTarget.style.borderColor = 'var(--primary)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
    }} 
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1) translateX(0)';
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.background = 'var(--glass)';
    }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
      <div style={{ 
        width: '60px', 
        height: '60px', 
        background: 'rgba(139, 92, 246, 0.1)', 
        borderRadius: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white', letterSpacing: '0.02em' }}>{title}</h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>{desc}</p>
      </div>
    </div>
    <div style={{ color: 'var(--primary)', fontSize: '1.5rem', opacity: 0.5 }}>→</div>
  </div>
);

const NotificationToggle = ({ title, desc, active }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <h4 style={{ color: 'white', marginBottom: '0.25rem' }}>{title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{desc}</p>
    </div>
    <div style={{ 
      width: '50px', 
      height: '26px', 
      background: active ? 'var(--primary)' : 'rgba(255,255,255,0.1)', 
      borderRadius: '20px',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s'
    }}>
      <div style={{ 
        width: '20px', 
        height: '20px', 
        background: 'white', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: '3px', 
        left: active ? '27px' : '3px',
        transition: 'all 0.3s'
      }}></div>
    </div>
  </div>
);

const ThemeOption = ({ name, active, color }) => (
  <div style={{ 
    border: active ? '2px solid var(--primary)' : '2px solid var(--border)', 
    borderRadius: '1rem', 
    padding: '1rem',
    cursor: 'pointer',
    textAlign: 'center',
    background: active ? 'rgba(139, 92, 246, 0.05)' : 'transparent'
  }}>
    <div style={{ width: '100%', height: '60px', background: color, borderRadius: '0.5rem', marginBottom: '0.75rem', border: '1px solid var(--border)' }}></div>
    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: active ? 'white' : 'var(--text-muted)' }}>{name}</p>
  </div>
);

export default Settings;
