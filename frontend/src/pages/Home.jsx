import React from 'react';
import { Shield, Users, Bell, Key, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <div className="glow-overlay"></div>
      
      {/* Hero Section */}
      <header style={{
        padding: '10rem 0 8rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem', 
            background: 'rgba(139, 92, 246, 0.1)', 
            borderRadius: '2rem',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            marginBottom: '2rem',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            <Zap size={14} /> Next Gen Hostel Management
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 5.5rem)', 
            marginBottom: '1.5rem', 
            lineHeight: 1,
            maxWidth: '1000px',
            margin: '0 auto 1.5rem'
          }}>
            Experience the Future of <br />
            <span style={{ 
              background: 'linear-gradient(to right, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Hostel Living</span>
          </h1>

          <p style={{ 
            color: 'var(--text-muted)', 
            fontSize: '1.25rem', 
            maxWidth: '750px', 
            margin: '0 auto 3rem',
            fontWeight: 400
          }}>
            A cinematic approach to campus security, room management, and student 
            convenience. Seamlessly integrated, beautifully designed.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
              Launch Portal <ArrowRight size={20} />
            </Link>
            <button className="btn-outline" style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
              Explore Features
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section style={{ padding: '0 0 10rem' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2.5rem' 
          }}>
            <FeatureCard 
              icon={<Shield size={40} />} 
              title="Identity Verification" 
              desc="Next-generation biometrics and face recognition for absolute campus security."
              accent="var(--primary)"
            />
            <FeatureCard 
              icon={<Users size={40} />} 
              title="Intelligent Allocation" 
              desc="AI-driven room assignments based on lifestyle preferences and compatibility."
              accent="var(--secondary)"
            />
            <FeatureCard 
              icon={<Bell size={40} />} 
              title="Global Monitoring" 
              desc="Real-time alerts, maintenance tracking, and centralized communication hub."
              accent="var(--success)"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, accent }) => (
  <div className="glass-card animate-slide-in" style={{ 
    textAlign: 'left', 
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  }} onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-10px)';
    e.currentTarget.style.borderColor = accent;
  }} onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'var(--glass-border)';
  }}>
    <div style={{ 
      width: '80px', 
      height: '80px', 
      background: `rgba(${accent === 'var(--primary)' ? '139, 92, 246' : accent === 'var(--secondary)' ? '6, 182, 212' : '16, 185, 129'}, 0.1)`, 
      borderRadius: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      color: accent,
      border: `1px solid rgba(${accent === 'var(--primary)' ? '139, 92, 246' : accent === 'var(--secondary)' ? '6, 182, 212' : '16, 185, 129'}, 0.2)`
    }}>
      {icon}
    </div>
    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>{desc}</p>
  </div>
);

export default Home;
