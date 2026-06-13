import React, { useState } from 'react';
import { MessageSquare, Plus, Clock, CheckCircle, AlertCircle, ArrowLeft, Send, Sparkles, UserCheck, ShieldCloseIcon, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Complaints = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || 'student';
  
  const [view, setView] = useState('list'); // 'list', 'create', or 'detail'
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setSetComplaints] = useState([
    { id: 1, title: 'Wifi not working', category: 'Technical', status: 'Pending', date: '2026-06-12', description: 'The wifi in the common room is extremely slow and keeps disconnecting every 5 minutes.', user: 'Akash V.' },
    { id: 2, title: 'Water leakage', category: 'Plumbing', status: 'In Progress', date: '2026-06-11', description: 'There is a severe water leakage in the bathroom of Room 302. It needs immediate attention.', user: 'Rahul S.' },
    { id: 3, title: 'Light bulb replacement', category: 'Maintenance', status: 'Resolved', date: '2026-06-10', description: 'One of the study lamps is flickering. Please replace the bulb.', user: 'Mithu M.' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Maintenance',
    description: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'var(--error)';
      case 'In Progress': return 'var(--primary)';
      case 'Resolved': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <AlertCircle size={16} />;
      case 'In Progress': return <Clock size={16} />;
      case 'Resolved': return <CheckCircle size={16} />;
      default: return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComplaint = {
      id: complaints.length + 1,
      ...formData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      user: user?.name
    };
    setSetComplaints([newComplaint, ...complaints]);
    setView('list');
    setFormData({ title: '', category: 'Maintenance', description: '' });
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setView('detail');
  };

  const handleProcessTicket = (id, newStatus) => {
    setSetComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedComplaint?.id === id) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus });
    }
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
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>Raise a Ticket</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Our response teams are standing by to resolve your issues.</p>
        </header>

        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3.5rem', border: '1px solid var(--border)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Incident Title</label>
              <input 
                type="text" 
                placeholder="e.g., Short circuit in Room 302" 
                required 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Maintenance">General Maintenance</option>
                <option value="Electrical">Electrical Systems</option>
                <option value="Plumbing">Hydraulic/Plumbing</option>
                <option value="Technical">Technical/IT Support</option>
                <option value="Security">Security & Safety</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Detailed Description</label>
              <textarea 
                rows="5" 
                placeholder="Describe the issue in detail for our technical teams..." 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{ resize: 'none' }}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              <Send size={20} /> Deploy Technical Request
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'detail' && selectedComplaint) {
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
            <ArrowLeft size={18} /> Back to History
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Ticket #COMP-{selectedComplaint.id}0{selectedComplaint.id}</span>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '0.5rem', 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  textTransform: 'uppercase',
                  background: `${getStatusColor(selectedComplaint.status)}15`,
                  color: getStatusColor(selectedComplaint.status),
                  border: `1px solid ${getStatusColor(selectedComplaint.status)}30`
                }}>
                  {selectedComplaint.status}
                </span>
              </div>
              <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>{selectedComplaint.title}</h1>
            </div>
            {isAuthorized && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                {selectedComplaint.status === 'Pending' && (
                  <button className="btn-primary" onClick={() => handleProcessTicket(selectedComplaint.id, 'In Progress')} style={{ padding: '0.75rem 1.5rem', background: 'var(--primary)' }}>
                    <Wrench size={18} /> Assign Squad
                  </button>
                )}
                {selectedComplaint.status === 'In Progress' && (
                  <button className="btn-primary" onClick={() => handleProcessTicket(selectedComplaint.id, 'Resolved')} style={{ padding: '0.75rem 1.5rem', background: 'var(--success)' }}>
                    <CheckCircle size={18} /> Finalize Ticket
                  </button>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="glass-card" style={{ padding: '3.5rem', border: '1px solid var(--border)' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Incident Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Student Name</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedComplaint.user}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Category</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedComplaint.category}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Filing Date</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedComplaint.date}</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Description</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)' }}>
              {selectedComplaint.description || "No additional description provided."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.75rem', marginBottom: '0.5rem' }}>{role === 'student' ? 'Complaints' : 'Ticket Control'}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{role === 'student' ? 'Request maintenance or report issues.' : 'Manage and resolve resident technical requests.'}</p>
        </div>
        {role === 'student' && (
          <button className="btn-primary" onClick={() => setView('create')}>
            <Plus size={20} /> New Ticket
          </button>
        )}
      </header>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Ticket Details</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{role === 'student' ? 'Category' : 'Student'}</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Date</th>
                <th style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: 'white' }}>{c.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: #COMP-{c.id}0{c.id}</div>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    {role === 'student' ? (
                      <span style={{ 
                        padding: '0.4rem 1rem', 
                        borderRadius: '2rem', 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-main)',
                        border: '1px solid var(--glass-border)'
                      }}>
                        {c.category}
                      </span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <UserCheck size={14} color="var(--primary)" />
                         <span style={{ fontWeight: 600 }}>{c.user}</span>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      color: getStatusColor(c.status),
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '0.25rem 0.75rem',
                      background: `${getStatusColor(c.status)}15`,
                      borderRadius: '0.5rem'
                    }}>
                      {getStatusIcon(c.status)} {c.status}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{c.date}</td>
                  <td style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                      <button 
                        className="btn-outline" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                        onClick={() => handleViewDetails(c)}
                      >
                        Inspect
                      </button>
                      {(role === 'warden' || role === 'admin') && c.status === 'Pending' && (
                        <button 
                          className="btn-primary" 
                          style={{ padding: '0.5rem', borderRadius: '0.5rem', minWidth: '40px' }}
                          onClick={() => handleProcessTicket(c.id, 'In Progress')}
                        >
                          <Wrench size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
