import React from 'react';
import { Linkedin, Twitter, Github, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Logo } from './UI';
import type { View } from '../types';

interface FooterProps {
  apiConnected: boolean | null;
  navigateTo: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ apiConnected, navigateTo }) => (
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
              { icon: <Linkedin size={20} />, url: '#' },
              { icon: <Twitter size={20} />, url: '#' },
              { icon: <Github size={20} />, url: '#' },
            ].map((social, idx) => (
              <a key={idx} href={social.url} className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-[#4fd1c5] hover:text-[#0a2e5c] transition-all duration-300" aria-label="Red social">
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
);
