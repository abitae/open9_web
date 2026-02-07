import React from 'react';
import { getApiBaseUrl } from '../api/client';

export const BannerOffline: React.FC = () => (
  <div className="fixed top-0 left-0 right-0 z-[100] min-h-10 bg-amber-500/95 text-slate-900 px-4 py-2 text-center text-sm font-bold flex flex-col items-center justify-center gap-0.5">
    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
      Sin conexión con el servidor.
    </span>
    <span className="font-mono text-xs font-normal break-all">
      API: {getApiBaseUrl()}
    </span>
    <span className="text-xs font-normal opacity-90">
      Prueba en el navegador: {getApiBaseUrl()}/api/projects — Abre el puerto en EC2 y revisa que el backend esté en marcha.
    </span>
  </div>
);
