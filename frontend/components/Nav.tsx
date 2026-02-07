import React, { useState, useEffect } from 'react';
import { Lock, Menu, X } from 'lucide-react';
import { Logo } from './UI';
import type { View } from '../types';

interface NavProps {
  currentView: View;
  isLogged: boolean;
  isScrolled: boolean;
  apiConnected: boolean | null;
  navigateTo: (view: View) => void;
}

const NAV_ITEMS: { label: string; view: View }[] = [
  { label: 'Inicio', view: 'home' },
  { label: 'Servicios', view: 'servicios' },
  { label: 'Portafolio', view: 'portafolio' },
  { label: 'Nosotros', view: 'nosotros' },
  { label: 'Contacto', view: 'contacto' },
];

export const Nav: React.FC<NavProps> = ({ currentView, isLogged, isScrolled, apiConnected, navigateTo }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeAndNavigate = (view: View) => {
    setMobileOpen(false);
    navigateTo(view);
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${apiConnected === false ? 'top-20' : 'top-0'} ${isScrolled || currentView !== 'home' ? 'bg-white/95 backdrop-blur-xl shadow-xl py-3 border-b border-slate-100' : 'bg-transparent py-8'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Logo onClick={() => navigateTo('home')} />
          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => navigateTo(item.view)}
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
                aria-label="Acceso Admin"
              >
                <Lock size={14} />
                Admin
              </button>
              <button
                onClick={() => navigateTo('empezar')}
                className="bg-[#0a2e5c] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl hover:bg-[#0d4285] transition-all hover:scale-105"
                aria-label="Iniciar Proyecto"
              >
                Iniciar Proyecto
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-12 h-12 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 hover:text-[#4fd1c5] transition-all"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay + panel */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <span className="text-sm font-black uppercase tracking-widest text-slate-500">Menú</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0a2e5c] transition-all"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.view}
                onClick={() => closeAndNavigate(item.view)}
                className={`text-left py-4 px-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${currentView === item.view ? 'bg-[#4fd1c5] text-[#0a2e5c]' : 'text-slate-700 hover:bg-slate-50 hover:text-[#4fd1c5]'}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => closeAndNavigate('admin')}
              className={`flex items-center gap-2 text-left py-4 px-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all mt-2 ${currentView === 'login' || currentView === 'admin' ? 'bg-[#4fd1c5] text-[#0a2e5c]' : 'text-slate-500 hover:bg-slate-50 hover:text-[#0a2e5c]'}`}
            >
              <Lock size={14} />
              Admin
            </button>
            <button
              onClick={() => closeAndNavigate('empezar')}
              className="mt-4 w-full bg-[#0a2e5c] text-white py-4 rounded-2xl font-black text-sm uppercase shadow-xl hover:bg-[#0d4285] transition-all text-center"
            >
              Iniciar Proyecto
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
