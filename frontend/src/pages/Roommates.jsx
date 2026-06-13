import React, { useState } from 'react';
import { Users, Mail, User, ShieldCheck, Settings, ExternalLink, Trash2, ArrowLeftRight, ArrowLeft, Send, MapPin, Phone, ShieldAlert, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Roommates = () => {
  const { user: currentUser } = useAuth();
  const role = currentUser?.role?.toLowerCase() || 'student';

  const [view, setView] = useState('list'); // 'list', 'profile', 'message', 'manage', 'transfer'
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [roommates, setRoommates] = useState([
    { id: 1, name: 'Akash Vishwakarma', room: '302-A', email: 'akash@example.com', phone: '+91 98765 43210', status: 'Online', bio: 'Computer Science Major. Tech enthusiast and coffee lover.' },
    { id: 2, name: 'Rahul Sharma', room: '302-B', email: 'rahul@example.com', phone: '+91 98765 43211', status: 'In Class', bio: 'Mechanical Engineering. Basketball player and gym regular.' },
    { id: 3, name: 'Mithu M.', room: '302-C', email: 'mithu@example.com', phone: '+91 98765 43212', status: 'Online', bio: 'Design Architecture. Passionate about UI/UX and dark aesthetics.' },
    { id: 4, name: 'Priya Singh', room: '201-A', email: 'priya@example.com', phone: '+91 98765 43213', status: 'Online', bio: 'Biotechnology student. Researching plant genetics.' },
  ]);

  const handleAction = (person, targetView) => {
    setSelectedPerson(person);
    setView(targetView);
  };

  if (view === 'profile' && selectedPerson) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setView('list')} className="btn-link" style={{ marginBottom: '2rem', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Back to Directory
        </button>
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
            <div style={{ width: '150px', height: '150px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '4rem', color: 'white', fontWeight: 800, flexShrink: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              {selectedPerson.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '3rem' }}>{selectedPerson.name}</h1>
                <span style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700 }}>Unit {selectedPerson.room}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>{selectedPerson.bio}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                  <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Intelligence</p>
                  <p style={{ fontSize: '1.1rem' }}>{selectedPerson.email}</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                  <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Secure Line</p>
                  <p style={{ fontSize: '1.1rem' }}>{selectedPerson.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'message' && selectedPerson) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setView('list')} className="btn-link" style={{ marginBottom: '2rem', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Close Channel
        </button>
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', height: '600px', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{selectedPerson.name.charAt(0)}</div>
             <div>
               <h3 style={{ fontSize: '1rem' }}>{selectedPerson.name}</h3>
               <p style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Active Link Protocol</p>
             </div>
          </div>
          <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '1rem 1rem 1rem 0', maxWidth: '70%', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.9rem' }}>Secure connection established. Peer is active. You may begin transmission.</p>
            </div>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="Type an encrypted message..." style={{ flex: 1, padding: '1rem', background: 'rgba(15, 23, 42, 0.5)' }} />
            <button className="btn-primary" style={{ width: '50px', height: '50px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if ((view === 'manage' || view === 'transfer') && selectedPerson) {
    return (
       <div className="animate-fade-in">
        <button onClick={() => setView('list')} className="btn-link" style={{ marginBottom: '2rem', padding: '0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          <ArrowLeft size={18} /> Abort Command
        </button>
        <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem', border: '1px solid var(--border)', textAlign: 'center' }}>
           <div style={{ 
             width: '80px', 
             height: '80px', 
             background: view === 'transfer' ? 'var(--secondary)' : 'var(--primary)', 
             borderRadius: '1.5rem', 
             margin: '0 auto 2rem',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             boxShadow: `0 0 30px ${view === 'transfer' ? 'rgba(6,182,212,0.3)' : 'rgba(139,92,246,0.3)'}`
           }}>
             {view === 'transfer' ? <ArrowLeftRight size={40} color="white" /> : <Settings size={40} color="white" />}
           </div>
           <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{view === 'transfer' ? 'Unit Transfer Protocol' : 'Record Manipulation'}</h1>
           <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>You are executing an authoritative command on resident <span style={{ color: 'white', fontWeight: 600 }}>{selectedPerson.name} (Unit {selectedPerson.room})</span>. Proceed with caution.</p>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {view === 'transfer' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Unit Designation</label>
                  <input type="text" placeholder="e.g., 405-B" required style={{ width: '100%', padding: '1.25rem' }} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Command Description</label>
                  <textarea rows="4" placeholder="Log the administrative changes..." style={{ width: '100%', padding: '1.25rem' }}></textarea>
                </div>
              )}
           </div>

           <button className="btn-primary" style={{ width: '100%', padding: '1.25rem', background: view === 'transfer' ? 'var(--secondary)' : 'var(--primary)' }} onClick={() => setView('list')}>
              <CheckCircle size={20} /> Execute Authorization
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>{role === 'student' ? 'Roommates' : 'Resident Directory'}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{role === 'student' ? 'The collective intelligence of your immediate proximity.' : 'Global database of all active residential personnel.'}</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {roommates.map((person) => (
          <div key={person.id} className="glass-card" style={{ 
            padding: '2.5rem', 
            border: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '1.5rem', 
              right: '1.5rem', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              background: person.status === 'Online' ? 'var(--success)' : 'var(--accent-gold)',
              boxShadow: `0 0 15px ${person.status === 'Online' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(251, 191, 36, 0.4)'}`
            }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}>
                {person.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{person.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={14} color="var(--primary)" /> Unit {person.room}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <Mail size={16} /> {person.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <User size={16} /> Status: <span style={{ color: 'white' }}>{person.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {role === 'student' ? (
                <>
                  <button className="btn-primary" style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem' }} onClick={() => handleAction(person, 'message')}>Message</button>
                  <button className="btn-outline" style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem' }} onClick={() => handleAction(person, 'profile')}>Profile</button>
                </>
              ) : (
                <>
                  <button className="btn-primary" style={{ flex: 2, padding: '0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => handleAction(person, 'manage')}>
                    <Settings size={16} /> Manage Record
                  </button>
                  <button className="btn-outline" style={{ flex: 1, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => handleAction(person, 'transfer')}>
                    <ArrowLeftRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roommates;
