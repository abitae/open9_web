
import React, { useState, useEffect, useCallback } from 'react';
import { View, Project, ContactMessage, ProjectInquiry, ClientLogo } from './types';
import { Logo } from './components/UI';
import { HomeView, PortfolioView, ServicesView, AboutView, ContactView, StartProjectView } from './views/Public';
import { LoginView, AdminDashboard } from './views/Admin';
import { Linkedin, Twitter, Github, Mail, Phone, MapPin, ExternalLink, Lock } from 'lucide-react';
import * as api from './api/client';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);

  // Verificación de conexión con el API (al montar y cada 60s)
  useEffect(() => {
    const check = () => api.checkApiConnection().then(setApiConnected);
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial load: public data + restore session
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [projs, logos] = await Promise.all([api.getProjects(), api.getClientLogos()]);
        if (!cancelled) {
          setProjects(projs);
          setClientLogos(logos);
        }
      } catch (_) {
        if (!cancelled) {
          setProjects([]);
          setClientLogos([]);
        }
      }
      if (!cancelled) {
        if (api.isAuthenticated()) {
          try {
            await api.getInquiries();
            setIsLogged(true);
          } catch {
            api.clearToken();
            setIsLogged(false);
          }
        } else {
          setIsLogged(false);
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  // Load admin data when entering admin view
  useEffect(() => {
    if (!isLogged || currentView !== 'admin') return;
    (async () => {
      try {
        const [inq, msgs] = await Promise.all([api.getInquiries(), api.getMessages()]);
        setInquiries(inq);
        setMessages(msgs);
      } catch (e) {
        if (e instanceof Error && e.message === 'unauthorized') {
          api.clearToken();
          setIsLogged(false);
          setCurrentView('login');
        }
      }
    })();
  }, [isLogged, currentView]);

  const navigateTo = useCallback((view: View) => {
    if (view === 'admin' && !isLogged) setCurrentView('login');
    else setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isLogged]);

  const handleAddInquiry = useCallback(async (inquiry: ProjectInquiry) => {
    try {
      await api.postInquiry({
        clientName: inquiry.clientName,
        clientEmail: inquiry.clientEmail,
        clientPhone: inquiry.clientPhone,
        company: inquiry.company,
        projectType: inquiry.projectType,
        budget: inquiry.budget,
        description: inquiry.description,
        date: inquiry.date,
      });
      navigateTo('home');
      alert('Solicitud recibida. Un estratega técnico se pondrá en contacto contigo en las próximas 24 horas.');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error al enviar la solicitud.');
    }
  }, [navigateTo]);

  const handleLogin = useCallback(() => {
    setIsLogged(true);
    navigateTo('admin');
  }, [navigateTo]);

  const handleLogout = useCallback(() => {
    api.clearToken();
    setIsLogged(false);
    setCurrentView('login');
  }, []);

  const handleAddProject = useCallback(async (p: Project) => {
    try {
      const created = await api.createProject({ title: p.title, category: p.category, desc: p.desc, img: p.img, tech: p.tech, impact: p.impact });
      setProjects(prev => [...prev, created]);
    } catch (e) {
      if (e instanceof Error && e.message === 'unauthorized') handleLogout();
      else alert(e instanceof Error ? e.message : 'Error al crear proyecto.');
    }
  }, [handleLogout]);

  const handleDeleteProject = useCallback(async (id: number) => {
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      if (e instanceof Error && e.message === 'unauthorized') handleLogout();
      else alert(e instanceof Error ? e.message : 'Error al eliminar.');
    }
  }, [handleLogout]);

  const handleAddClientLogo = useCallback(async (l: ClientLogo) => {
    try {
      const created = await api.createClientLogo({ name: l.name, url: l.url });
      setClientLogos(prev => [...prev, created]);
    } catch (e) {
      if (e instanceof Error && e.message === 'unauthorized') handleLogout();
      else alert(e instanceof Error ? e.message : 'Error al agregar logo.');
    }
  }, [handleLogout]);

  const handleDeleteClientLogo = useCallback(async (id: number) => {
    try {
      await api.deleteClientLogo(id);
      setClientLogos(prev => prev.filter(l => l.id !== id));
    } catch (e) {
      if (e instanceof Error && e.message === 'unauthorized') handleLogout();
      else alert(e instanceof Error ? e.message : 'Error al eliminar.');
    }
  }, [handleLogout]);

  return (
    <div className="min-h-screen selection:bg-cyan-200">
      {apiConnected === false && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-amber-500/95 text-slate-900 px-4 text-center text-sm font-bold flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          Sin conexión con el servidor. Algunas funciones pueden no estar disponibles.
        </div>
      )}
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${apiConnected === false ? 'top-10' : 'top-0'} ${isScrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-xl shadow-xl py-3 border-b border-slate-100' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Logo onClick={() => navigateTo('home')} />
          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: 'Inicio', view: 'home' },
              { label: 'Servicios', view: 'servicios' },
              { label: 'Portafolio', view: 'portafolio' },
              { label: 'Nosotros', view: 'nosotros' },
              { label: 'Contacto', view: 'contacto' }
            ].map((item) => (
              <button 
                key={item.view} 
                onClick={() => navigateTo(item.view as View)}
                className={`text-sm font-black uppercase tracking-widest hover:text-[#4fd1c5] transition-colors ${currentView === item.view ? 'text-[#4fd1c5]' : 'text-slate-700'}`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center gap-4 ml-4">
              <button 
                onClick={() => navigateTo('admin')}
                className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${currentView === 'login' || currentView === 'admin' ? 'bg-[#4fd1c5] text-[#0a2e5c]' : 'text-slate-500 hover:text-[#0a2e5c] hover:bg-slate-100'}`}
                title="Acceso Staff"
              >
                <Lock size={14} />
                Admin
              </button>
              <button onClick={() => navigateTo('empezar')} className="bg-[#0a2e5c] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl hover:bg-[#0d4285] transition-all hover:scale-105">
                Iniciar Proyecto
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className={`min-h-screen ${apiConnected === false ? 'pt-10' : ''}`}>
        {loading ? (
          <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">Cargando...</div>
        ) : (
          <>
            {currentView === 'home' && <HomeView setView={navigateTo} clientLogos={clientLogos} />}
            {currentView === 'servicios' && <ServicesView setView={navigateTo} />}
            {currentView === 'portafolio' && <PortfolioView projects={projects} />}
            {currentView === 'nosotros' && <AboutView />}
            {currentView === 'contacto' && <ContactView />}
            {currentView === 'empezar' && <StartProjectView onInquirySubmit={handleAddInquiry} />}
            
            {currentView === 'login' && <LoginView onLogin={handleLogin} />}
            {currentView === 'admin' && isLogged && (
              <AdminDashboard 
                projects={projects} 
                messages={messages} 
                inquiries={inquiries}
                clientLogos={clientLogos}
                onAddProject={handleAddProject}
                onDeleteProject={handleDeleteProject}
                onAddClientLogo={handleAddClientLogo}
                onDeleteClientLogo={handleDeleteClientLogo}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-[#0a192f] pt-24 pb-12 text-slate-400">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-4">
              <div className="mb-8 grayscale invert brightness-0">
                <Logo onClick={() => navigateTo('home')} className="h-12" />
              </div>
              <p className="text-lg leading-relaxed mb-8 max-w-sm">
                Transformamos visiones ambiciosas en arquitecturas de software de alto rendimiento. Ingeniería de élite para empresas que lideran el mañana.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin size={20} />, url: "#" },
                  { icon: <Twitter size={20} />, url: "#" },
                  { icon: <Github size={20} />, url: "#" }
                ].map((social, idx) => (
                  <a key={idx} href={social.url} className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-[#4fd1c5] hover:text-[#0a2e5c] transition-all duration-300">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Compañía</h4>
              <ul className="space-y-4 font-bold text-sm uppercase tracking-tighter">
                <li><button onClick={() => navigateTo('home')} className="hover:text-[#4fd1c5] transition-colors">Inicio</button></li>
                <li><button onClick={() => navigateTo('nosotros')} className="hover:text-[#4fd1c5] transition-colors">Nosotros</button></li>
                <li><button onClick={() => navigateTo('portafolio')} className="hover:text-[#4fd1c5] transition-colors">Casos de Éxito</button></li>
                <li><button className="hover:text-[#4fd1c5] transition-colors">Carreras</button></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Soluciones</h4>
              <ul className="space-y-4 font-bold text-sm uppercase tracking-tighter">
                <li><button onClick={() => navigateTo('servicios')} className="hover:text-[#4fd1c5] transition-colors flex items-center gap-2 group">Sistemas Core <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => navigateTo('servicios')} className="hover:text-[#4fd1c5] transition-colors flex items-center gap-2 group">Mobile de Élite</button></li>
                <li><button onClick={() => navigateTo('servicios')} className="hover:text-[#4fd1c5] transition-colors flex items-center gap-2 group">Cloud Architectures</button></li>
                <li><button onClick={() => navigateTo('servicios')} className="hover:text-[#4fd1c5] transition-colors flex items-center gap-2 group">Security Audits</button></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Hablemos</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-[#4fd1c5] group-hover:bg-[#4fd1c5] group-hover:text-[#0a2e5c] transition-all">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-bold tracking-tight">executive@open9.io</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-[#4fd1c5] group-hover:bg-[#4fd1c5] group-hover:text-[#0a2e5c] transition-all">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm font-bold tracking-tight">+1 (555) 099-0099</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-[#4fd1c5] group-hover:bg-[#4fd1c5] group-hover:text-[#0a2e5c] transition-all">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm font-bold tracking-tight">Tech Tower, Level 9, SF</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-800/50 flex flex-col md:row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <p>&copy; {new Date().getFullYear()} Open9 Software Solutions. Todos los derechos reservados.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Términos</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`h-1 w-1 rounded-full ${apiConnected === true ? 'bg-green-500 animate-pulse' : apiConnected === false ? 'bg-red-500' : 'bg-slate-500'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 mr-4">
                {apiConnected === true ? 'Conectado al servidor' : apiConnected === false ? 'Sin conexión al servidor' : 'Comprobando conexión...'}
              </span>
              <button 
                onClick={() => navigateTo('admin')} 
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#4fd1c5] border border-slate-800 px-4 py-2 rounded-lg transition-all hover:bg-slate-800/30"
              >
                Staff Access
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
