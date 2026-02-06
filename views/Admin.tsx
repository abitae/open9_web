
import React, { useState } from 'react';
import { Lock, Plus, Trash2, Rocket, MessageSquare, LayoutGrid, User, Mail, DollarSign, Calendar, Phone, Image as ImageIcon } from 'lucide-react';
import { Project, ContactMessage, ProjectInquiry, ClientLogo } from '../types';
import * as api from '../api/client';

export const LoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      setError('Usuario y contraseña son obligatorios.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.login(username.trim(), password);
      api.setToken(res.token);
      onLogin();
    } catch (e) {
      setError(e instanceof Error ? (e.message === 'unauthorized' ? 'Credenciales incorrectas.' : e.message) : 'Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-50 text-[#0a2e5c] rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Acceso Admin</h2>
          <p className="text-slate-500 font-medium">Panel de Gestión Open9</p>
        </div>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className="w-full px-8 py-6 rounded-2xl bg-slate-50 border border-slate-200 mb-4 font-bold outline-none focus:border-[#4fd1c5] transition-all"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className="w-full px-8 py-6 rounded-2xl bg-slate-50 border border-slate-200 mb-4 font-bold outline-none focus:border-[#4fd1c5] transition-all"
        />
        {error && <p className="text-red-500 text-sm font-bold mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#0a2e5c] text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:bg-[#0d4285] transition-all disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar al Sistema'}
        </button>
      </div>
    </section>
  );
};

export const AdminDashboard: React.FC<{ 
  projects: Project[], 
  messages: ContactMessage[], 
  inquiries: ProjectInquiry[],
  clientLogos: ClientLogo[],
  onAddProject: (p: Project) => void,
  onDeleteProject: (id: number) => void,
  onAddClientLogo: (l: ClientLogo) => void,
  onDeleteClientLogo: (id: number) => void
}> = ({ projects, messages, inquiries, clientLogos, onAddProject, onDeleteProject, onAddClientLogo, onDeleteClientLogo }) => {
  const [tab, setTab] = useState<'projects' | 'messages' | 'inquiries' | 'clients'>('inquiries');

  return (
    <section className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <h2 className="text-5xl font-black text-slate-900">Panel Central</h2>
          <div className="flex flex-wrap gap-2 p-2 bg-white rounded-3xl shadow-md border border-slate-100">
            <button 
              onClick={() => setTab('inquiries')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${tab === 'inquiries' ? 'bg-[#4fd1c5] text-[#0a2e5c] shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Rocket size={18} /> Solicitudes
            </button>
            <button 
              onClick={() => setTab('clients')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${tab === 'clients' ? 'bg-[#0a2e5c] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ImageIcon size={18} /> Clientes
            </button>
            <button 
              onClick={() => setTab('projects')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${tab === 'projects' ? 'bg-[#0a2e5c] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutGrid size={18} /> Portafolio
            </button>
            <button 
              onClick={() => setTab('messages')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${tab === 'messages' ? 'bg-[#0a2e5c] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <MessageSquare size={18} /> Mensajes
            </button>
          </div>
        </div>

        {tab === 'inquiries' && (
          <div className="space-y-6">
            {inquiries.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                <Rocket size={60} className="mx-auto text-slate-200 mb-6" />
                <p className="text-xl font-bold text-slate-400">Sin solicitudes de proyecto activas.</p>
              </div>
            ) : (
              inquiries.map(iq => (
                <div key={iq.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-[#4fd1c5] transition-all group">
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-1.5 bg-[#0a2e5c] text-white text-xs font-black uppercase rounded-full tracking-widest">{iq.projectType}</span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Calendar size={14} /> {iq.date}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">{iq.company || 'Empresa no especificada'}</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-2"><User size={16} className="text-[#4fd1c5]" /> {iq.clientName}</div>
                        <div className="flex items-center gap-2"><Mail size={16} className="text-[#4fd1c5]" /> {iq.clientEmail}</div>
                        <div className="flex items-center gap-2"><Phone size={16} className="text-[#4fd1c5]" /> {iq.clientPhone}</div>
                        <div className="flex items-center gap-2"><DollarSign size={16} className="text-[#4fd1c5]" /> {iq.budget}</div>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-slate-700 italic">"{iq.description}"</p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col gap-2">
                      <button className="bg-[#0a2e5c] text-white px-6 py-3 rounded-xl font-black text-sm uppercase hover:bg-black transition-all">Gestionar</button>
                      <button className="text-slate-400 hover:text-red-500 font-bold text-sm uppercase px-6 py-2">Archivar</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'clients' && (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-32">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-800">
                  <ImageIcon className="text-[#4fd1c5]" /> Gestionar Logos
                </h3>
                <p className="text-slate-500 mb-6 font-medium text-sm">Administra las marcas que aparecen en el carrusel de la página principal.</p>
                <button 
                  onClick={() => onAddClientLogo({ 
                    id: Date.now(), 
                    name: "Nuevo Cliente", 
                    url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_logo_2019_%28stacked%29.svg" 
                  })} 
                  className="w-full bg-[#4fd1c5] text-[#0a2e5c] py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-md"
                >
                  Agregar Logo Mock
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {clientLogos.map(logo => (
                <div key={logo.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-12 bg-slate-50 rounded-xl flex items-center justify-center p-2">
                      <img src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <span className="block text-lg font-black text-slate-800">{logo.name}</span>
                      <span className="text-xs font-bold text-slate-400 truncate max-w-[200px] block">{logo.url}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteClientLogo(logo.id)} 
                    className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-32">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-slate-800">
                  <Plus className="text-[#4fd1c5]" /> Nuevo Proyecto
                </h3>
                <p className="text-slate-500 mb-6 font-medium text-sm">Añade rápidamente un nuevo caso de éxito al portafolio público.</p>
                <button 
                  onClick={() => onAddProject({ 
                    id: Date.now(), 
                    title: "Nuevo Proyecto de Élite", 
                    category: "Web", 
                    desc: "Descripción del sistema desarrollado por Open9.", 
                    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", 
                    tech: ["React", "Go"], 
                    impact: "Optimización 100%" 
                  })} 
                  className="w-full bg-[#4fd1c5] text-[#0a2e5c] py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-md"
                >
                  Agregar Rápido
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {projects.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                  <p className="text-xl font-bold text-slate-400">No hay proyectos registrados.</p>
                </div>
              ) : (
                projects.map(p => (
                  <div key={p.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="block text-xl font-black text-slate-800">{p.title}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.category}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onDeleteProject(p.id)} 
                      className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className="space-y-8">
            {messages.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                <p className="text-xl font-bold text-slate-400">Bandeja de entrada vacía.</p>
              </div>
            ) : (
              messages.map(m => (
                <div key={m.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-2xl font-black text-slate-900">{m.subject}</h4>
                      <p className="text-[#0a2e5c] font-black text-lg">{m.name} <span className="text-slate-400 font-medium">@ {m.company}</span></p>
                    </div>
                    <span className="text-sm font-bold text-slate-400 uppercase bg-slate-50 px-4 py-2 rounded-full">{m.date}</span>
                  </div>
                  <p className="mt-4 text-lg text-slate-600 leading-relaxed italic border-l-4 border-[#4fd1c5] pl-6 py-2 bg-slate-50/50 rounded-r-2xl">
                    "{m.body}"
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};
