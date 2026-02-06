
import React from 'react';

export const Logo: React.FC<{ className?: string; onClick?: () => void }> = ({ className = "h-10", onClick }) => (
  <button onClick={onClick} className="hover:opacity-90 transition-opacity flex items-center shrink-0">
    <img 
      src="logo_completo_sin_fondo.png" 
      alt="Open9 Logo" 
      className={`${className} object-contain`} 
    />
  </button>
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean; centered?: boolean }> = ({ title, subtitle, light, centered = true }) => (
  <div className={`${centered ? 'text-center' : 'text-left'} mb-12`}>
    <h2 className={`text-3xl md:text-6xl font-black mb-4 tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-blue-100' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
    <div className={`w-24 h-2 mt-8 rounded-full ${centered ? 'mx-auto' : ''} ${light ? 'bg-cyan-400' : 'bg-cyan-500'}`}></div>
  </div>
);
