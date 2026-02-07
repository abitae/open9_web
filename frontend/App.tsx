import React, { useState, useEffect, useCallback } from 'react';
import { View, Project, ContactMessage, ProjectInquiry, ClientLogo } from './types';
import { HomeView, PortfolioView, ServicesView, AboutView, ContactView, StartProjectView } from './views/Public';
import { LoginView, AdminDashboard } from './views/Admin';
import * as api from './api/client';
import { useToast } from './context/ToastContext';
import { BannerOffline } from './components/BannerOffline';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const toast = useToast();
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

  // Initial load: public data + restore session (con timeout para no quedarse en "Cargando..." si el API no responde)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 10000);
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
      if (!cancelled) {
        clearTimeout(timeout);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
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
      toast.success('Solicitud recibida. Un estratega técnico se pondrá en contacto contigo en las próximas 24 horas.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al enviar la solicitud.');
    }
  }, [navigateTo, toast]);

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
      else toast.error(e instanceof Error ? e.message : 'Error al crear proyecto.');
    }
  }, [handleLogout, toast]);

  const handleDeleteProject = useCallback(async (id: number) => {
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      if (e instanceof Error && e.message === 'unauthorized') handleLogout();
      else toast.error(e instanceof Error ? e.message : 'Error al eliminar.');
    }
  }, [handleLogout, toast]);

  const handleAddClientLogo = useCallback(async (l: ClientLogo) => {
    try {
      const created = await api.createClientLogo({ name: l.name, url: l.url });
      setClientLogos(prev => [...prev, created]);
    } catch (e) {
      if (e instanceof Error && e.message === 'unauthorized') handleLogout();
      else toast.error(e instanceof Error ? e.message : 'Error al agregar logo.');
    }
  }, [handleLogout, toast]);

  const handleDeleteClientLogo = useCallback(async (id: number) => {
    try {
      await api.deleteClientLogo(id);
      setClientLogos(prev => prev.filter(l => l.id !== id));
    } catch (e) {
      if (e instanceof Error && e.message === 'unauthorized') handleLogout();
      else toast.error(e instanceof Error ? e.message : 'Error al eliminar.');
    }
  }, [handleLogout, toast]);

  return (
    <div className="min-h-screen selection:bg-cyan-200">
      {apiConnected === false && <BannerOffline />}
      <Nav
        currentView={currentView}
        isLogged={isLogged}
        isScrolled={isScrolled}
        apiConnected={apiConnected}
        navigateTo={navigateTo}
      />

      <main className={`min-h-screen ${apiConnected === false ? 'pt-20' : ''}`}>
        <ErrorBoundary onReset={() => setCurrentView('home')}>
          {loading ? (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-white">
              <div className="w-14 h-14 rounded-2xl border-4 border-slate-100 border-t-[#4fd1c5] animate-spin" aria-hidden />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Cargando...</p>
            </div>
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
        </ErrorBoundary>
      </main>

      <Footer apiConnected={apiConnected} navigateTo={navigateTo} />
    </div>
  );
}
