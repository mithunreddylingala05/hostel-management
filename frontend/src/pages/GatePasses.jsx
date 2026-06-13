import React, { useState } from 'react';
import { ClipboardList, Plus, MapPin, Calendar, Smartphone, ArrowLeft, Send, CheckCircle, XCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GatePasses = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || 'student';

  const [view, setView] = useState('list'); // 'list', 'create', or 'detail'
  const [selectedPass, setSelectedPass] = useState(null);
  const [passes, setPasses] = useState([
    { id: 1, destination: 'Local Market', type: 'Outing', exit: '2026-06-13 14:00', entry: '2026-06-13 18:00', status: 'Approved', student: 'Mithu M.', reason: 'To buy essential groceries.' },
    { id: 2, destination: 'Home Town', type: 'Leave', exit: '2026-06-15 08:00', entry: '2026-06-20 20:00', status: 'Pending', student: 'Rahul S.', reason: 'Family event and holiday.' },
  ]);

  const [formData, setFormData] = useState({
    destination: '',
    type: 'Outing',
    exit: '',
    entry: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPass = {
      id: passes.length + 1,
      ...formData,
      status: 'Pending',
      student: user?.name
    };
    setPasses([newPass, ...passes]);
    setView('list');
    setFormData({ destination: '', type: 'Outing', exit: '', entry: '', reason: '' });
  };

  const handleUpdateStatus = (id, newStatus) => {
    setPasses(passes.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (selectedPass?.id === id) {
      setSelectedPass({ ...selectedPass, status: newStatus });
    }
  };

  const handleViewPass = (pass) => {
    setSelectedPass(pass);
    setView('detail');
  };

  if (view === 'create') {
    return (
      <div className="animate-fade-in">
        <header style={{ marginBottom: '3rem' }}>
          <button 
            onClick={() => setView('list')}
            className="btn-link"
            style={{ marginBottom: '1rem', padding: '0', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            <ArrowLeft size={18} /> Back to History
          </button>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Digital Pass Request</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Secure your campus departure with a cryptographic digital pass.</p>
        </header>

        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3.5rem', border: '1px solid var(--border)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Destination Portal</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="e.g., Central Station / Home" 
                  required 
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  style={{ width: '100%', paddingLeft: '3.5rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Exit Protocol</label>
                <input 
                  type="datetime-local" 
                  required 
                  value={formData.exit}
                  onChange={(e) => setFormData({...formData, exit: e.target.value})}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Entry Protocol</label>
                <input 
                  type="datetime-local" 
                  required 
                  value={formData.entry}
                  onChange={(e) => setFormData({...formData, entry: e.target.value})}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Transit Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Outing">Local Outing (Short Duration)</option>
                <option value="Leave">Home Leave (Long Duration)</option>
                <option value="Emergency">Emergency Protocol</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              <Send size={20} /> Request Digital Pass
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'detail' && selectedPass) {
    const isAuthorized = role === 'warden' || role === 'admin';
    return (
      <div className="animate-fade-in">
        <header style={{ marginBottom: '3rem' }}>
          <button 
            onClick={() => setView('list')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--primary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              marginBottom: '1rem',
              padding: '0'
            }}
          >
            <ArrowLeft size={18} /> Back to Pass History
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{selectedPass.type} Protocol</p>
              <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{selectedPass.destination}</h1>
              {isAuthorized && <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Candidate: <span style={{ color: 'white', fontWeight: 600 }}>{selectedPass.student}</span></p>}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {isAuthorized && selectedPass.status === 'Pending' ? (
                <>
                  <button className="btn-primary" onClick={() => handleUpdateStatus(selectedPass.id, 'Approved')} style={{ background: 'var(--success)' }}>
                    <CheckCircle size={18} /> Authorize
                  </button>
                  <button className="btn-outline" onClick={() => handleUpdateStatus(selectedPass.id, 'Rejected')} style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>
                    <XCircle size={18} /> Decline
                  </button>
                </>
              ) : (
                <div style={{ 
                  padding: '0.5rem 1.5rem', 
                  borderRadius: '2rem', 
                  fontSize: '0.9rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase',
                  background: selectedPass.status === 'Approved' ? 'rgba(16, 185, 129, 0.15)' : selectedPass.status === 'Rejected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                  color: selectedPass.status === 'Approved' ? 'var(--success)' : selectedPass.status === 'Rejected' ? 'var(--error)' : 'var(--accent-gold)',
                  border: `1px solid ${selectedPass.status === 'Approved' ? 'var(--success)' : selectedPass.status === 'Rejected' ? 'var(--error)' : 'var(--accent-gold)'}50`
                }}>
                  {selectedPass.status}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="glass-card" style={{ border: '1px solid var(--border)', padding: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                <Calendar size={20} />
                <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Exit Schedule</span>
              </div>
              <p style={{ fontSize: '1.5rem', color: 'white' }}>{selectedPass.exit}</p>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
                <Calendar size={20} />
                <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Entry Schedule</span>
              </div>
              <p style={{ fontSize: '1.5rem', color: 'white' }}>{selectedPass.entry}</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '200px', 
              height: '200px', 
              margin: '0 auto 2rem', 
              background: 'white', 
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)'
            }}>
              {/* Mock QR Code */}
              <div style={{ width: '160px', height: '160px', border: '8px solid black', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '10px', left: '10px', width: '40px', height: '40px', background: 'black' }}></div>
                 <div style={{ position: 'absolute', top: '10px', right: '10px', width: '40px', height: '40px', background: 'black' }}></div>
                 <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '40px', height: '40px', background: 'black' }}></div>
                 <div style={{ margin: '60px auto', width: '40px', height: '40px', background: 'black' }}></div>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Present this unique cryptogram at the gate for validation.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>{role === 'student' ? 'Gate Passes' : 'Access Control'}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{role === 'student' ? 'Request digital permission for campus exit.' : 'Review and authorize residential transit logs.'}</p>
        </div>
        {role === 'student' && (
          <button className="btn-primary" onClick={() => setView('create')}>
            <Plus size={20} /> Request Pass
          </button>
        )}
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2.5rem' }}>
        {passes.map((pass) => (
          <div key={pass.id} className="glass-card" style={{ 
            position: 'relative', 
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '1.5rem', 
              right: '1.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: '2rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: pass.status === 'Approved' ? 'rgba(16, 185, 129, 0.15)' : pass.status === 'Rejected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(251, 191, 36, 0.15)',
              color: pass.status === 'Approved' ? 'var(--success)' : pass.status === 'Rejected' ? 'var(--error)' : 'var(--accent-gold)',
              border: `1px solid ${pass.status === 'Approved' ? 'var(--success)' : pass.status === 'Rejected' ? 'var(--error)' : 'var(--accent-gold)'}50`
            }}>
              {pass.status}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--primary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>{pass.type}</p>
              <h3 style={{ fontSize: '1.75rem', color: 'white' }}>{pass.destination}</h3>
              {(role === 'warden' || role === 'admin') && (
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Requested by: <span style={{ color: 'white', fontWeight: 600 }}>{pass.student}</span></p>
              )}
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '1rem',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Exit Protocol</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', color: 'white' }}>
                  <Calendar size={18} color="var(--primary)" /> {pass.exit}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Entry Protocol</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', color: 'white' }}>
                  <Calendar size={18} color="var(--secondary)" /> {pass.entry}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={() => handleViewPass(pass)}
                style={{ 
                  flex: 1,
                  padding: '1rem', 
                  borderRadius: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  fontWeight: 700,
                  color: 'white',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                <Smartphone size={18} /> Inspect Pass
              </button>
              {(role === 'warden' || role === 'admin') && pass.status === 'Pending' && (
                <button 
                  onClick={() => handleUpdateStatus(pass.id, 'Approved')}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '0.75rem',
                    background: 'var(--success)',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <CheckCircle size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GatePasses;
