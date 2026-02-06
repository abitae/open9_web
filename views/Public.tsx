
import React, { useState } from 'react';
import { ArrowRight, Target, Star, Quote, Cpu, Smartphone, Cloud, Shield, Zap, Layers, Users, Award, Globe, MessageSquare, Mail, Phone, MapPin, Send, Rocket, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionTitle } from '../components/UI';
import { TerminalConsole } from '../components/TerminalConsole';
import { Project, View, ProjectInquiry, ClientLogo } from '../types';
import * as api from '../api/client';

export const HomeView: React.FC<{ setView: (v: View) => void, clientLogos: ClientLogo[] }> = ({ setView, clientLogos }) => (
  <div className="animate-in fade-in duration-1000">
    <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-[#4fd1c5]/10 rounded-full blur-[160px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="lg:w-1/2 text-left">
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter">
              Elevamos tu Visión a <br/><span className="gradient-text">Código de Élite.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-xl font-medium">
              Open9 is the software boutique that transforms complex challenges into high-performance digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setView('empezar')} className="group bg-[#0a2e5c] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#0d4285] hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-xl">
                Iniciar Proyecto <ArrowRight size={28} className="group-hover:translate-x-2" />
                </button>
                <button onClick={() => setView('servicios')} className="group bg-white text-[#0a2e5c] border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-4">
                Explorar Stack
                </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative w-full">
             <div className="relative group perspective-1000">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0a2e5c] to-[#4fd1c5] rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative z-10 bg-[#0a192f] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
                    <div className="flex items-center justify-between px-6 py-4 bg-[#112240] border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Layers size={12} className="text-cyan-400" /> open9-core-architecture.ts
                        </div>
                        <div className="w-10"></div>
                    </div>
                    <TerminalConsole />
                </div>
                
                <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 hidden md:block animate-bounce-subtle">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Optimización</div>
                            <div className="text-lg font-black text-slate-900">100% Efficiency</div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    {/* Logos Carousel Section */}
    <section className="py-24 bg-slate-50 overflow-hidden border-y border-slate-100">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0a2e5c] opacity-50 mb-2">Marcas Globales</p>
          <h2 className="text-2xl font-black text-slate-900">Empresas que confían en nuestra ingeniería</h2>
        </div>
      </div>
      <div className="relative flex">
        <div className="animate-marquee whitespace-nowrap flex items-center py-4">
          {[...clientLogos, ...clientLogos].map((logo, idx) => (
            <div key={`${logo.id}-${idx}`} className="mx-12 shrink-0 h-12 flex items-center">
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-full w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
          <Quote className="absolute top-10 left-10 text-[#0a2e5c]/5" size={160} />
          <div className="relative z-10">
             <div className="flex gap-1.5 mb-6">
               {[1,2,3,4,5].map(i => <Star key={i} size={22} className="text-[#4fd1c5]" fill="currentColor" />)}
             </div>
             <h3 className="text-xl md:text-3xl font-bold text-slate-800 siding-snug mb-8 italic">
               "Open9 is not just a software company, it's a business accelerator. They are, quite simply, the best."
             </h3>
             <div className="flex items-center gap-5">
               <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl">
                 <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a" className="w-full h-full object-cover" alt="CEO" />
               </div>
               <div>
                 <div className="text-xl font-black text-slate-900">Marcus Thorne</div>
                 <div className="text-[#0a2e5c] font-black uppercase text-xs tracking-widest">CEO Nexus Solutions</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const ServicesView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <section className="pt-32 pb-24 bg-white animate-in slide-in-from-bottom-4 duration-700">
    <div className="container mx-auto px-6">
      <SectionTitle 
        title="Capacidades Core" 
        subtitle="Ingeniería especializada para demandas extraordinarias."
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {[
          { icon: <Cpu />, title: "Sistemas Core & Backend", desc: "Arquitecturas en Go y Rust diseñadas para procesar millones de transacciones con latencia mínima." },
          { icon: <Smartphone />, title: "Mobile de Élite", desc: "Experiencias nativas y multiplataforma que redefinen el estándar de interacción móvil." },
          { icon: <Cloud />, title: "Cloud Architectures", desc: "Infraestructura escalable y resiliente sobre AWS, GCP y Azure, optimizada para costos y rendimiento." },
          { icon: <Shield />, title: "Ciberseguridad", desc: "Auditorías proactivas y blindaje de aplicaciones para proteger el activo más valioso: tus datos." },
          { icon: <Zap />, title: "Optimización AI", desc: "Integración de modelos inteligentes para automatizar flujos de trabajo complejos y toma de decisiones." },
          { icon: <Layers />, title: "UX/UI Estratégico", desc: "Diseño que no solo es estéticamente superior, sino que impulsa conversiones y retención de usuarios." }
        ].map((s, i) => (
          <div key={i} className="group p-10 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-[#4fd1c5] hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#0a2e5c] mb-8 shadow-sm group-hover:bg-[#0a2e5c] group-hover:text-white transition-all">
              {React.cloneElement(s.icon as React.ReactElement<{ size?: number }>, { size: 32 })}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{s.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6 font-medium">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0a2e5c] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-8">¿Listo para escalar tu infraestructura?</h2>
        <button onClick={() => setView('empezar')} className="bg-[#4fd1c5] text-[#0a2e5c] px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
          Consultar con un Arquitecto
        </button>
      </div>
    </div>
  </section>
);

export const AboutView: React.FC = () => (
  <section className="pt-32 pb-24 bg-white animate-in fade-in duration-700">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
        <div className="lg:w-1/2">
          <SectionTitle 
            centered={false}
            title="Ingeniería con Propósito" 
            subtitle="No somos una agencia, somos tu equipo de ingeniería extendido."
          />
          <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">
            En Open9, creemos que el software excepcional es el resultado de la precisión técnica combinada con una comprensión profunda de los objetivos de negocio. Fundada por ingenieros, para líderes visionarios.
          </p>
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: "Proyectos Entregados", val: "150+" },
              { label: "Ingenieros Senior", val: "45" },
              { label: "NPS del Cliente", val: "98%" },
              { label: " uptime Garantizado", val: "99.9%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black text-[#0a2e5c] mb-2">{stat.val}</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 rounded-[3rem] rotate-3 -z-10 opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" className="rounded-[3rem] shadow-2xl" alt="Team" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          { icon: <Target />, title: "Misión", text: "Empoderar a las organizaciones mediante tecnología que no solo funciona, sino que escala y evoluciona." },
          { icon: <Award />, title: "Excelencia", text: "Mantenemos los estándares de código más altos de la industria, garantizando mantenibilidad a largo plazo." },
          { icon: <Globe />, title: "Impacto Global", text: "Nuestras soluciones operan en múltiples regiones, soportando cargas críticas de trabajo global." }
        ].map((item, i) => (
          <div key={i} className="text-center p-8">
            <div className="w-20 h-20 bg-blue-50 text-[#0a2e5c] rounded-3xl flex items-center justify-center mx-auto mb-8">
              {React.cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 36 })}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const PortfolioView: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [filter, setFilter] = useState('Todos');
  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="pt-32 pb-24 bg-white min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6">
        <SectionTitle title="Casos de Éxito" subtitle="Ingeniería que habla por sí misma." />
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {['Todos', 'Enterprise', 'Mobile', 'Web'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-8 py-3 rounded-2xl font-black transition-all ${filter === f ? 'bg-[#0a2e5c] text-white shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {filtered.map(p => (
            <div key={p.id} className="group bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-xl flex flex-col">
              <div className="relative h-80 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-cyan-400 font-black uppercase text-xs mb-2 tracking-widest">{p.category}</div>
                  <h3 className="text-3xl font-black text-white">{p.title}</h3>
                </div>
              </div>
              <div className="p-10 flex-grow">
                <p className="text-xl text-slate-600 mb-8 font-medium">{p.desc}</p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {p.tech.map((t, idx) => <span key={idx} className="px-4 py-2 bg-slate-50 text-[#0a2e5c] text-sm font-bold rounded-xl border border-slate-100">{t}</span>)}
                </div>
                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Target className="text-[#4fd1c5]" size={24} />
                      <span className="font-black text-slate-800 uppercase tracking-tighter">{p.impact}</span>
                   </div>
                   <button className="text-[#0a2e5c] font-black flex items-center gap-2 hover:translate-x-1 transition-transform">Detalles <ArrowRight size={20} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) {
      setStatus('error');
      setErrorMessage('Nombre y mensaje son obligatorios.');
      return;
    }
    setStatus('sending');
    setErrorMessage('');
    try {
      await api.postContactMessage({ name: name.trim(), company: company.trim(), subject: subject.trim(), body: body.trim(), date: new Date().toLocaleDateString() });
      setStatus('success');
      setName('');
      setCompany('');
      setSubject('');
      setBody('');
    } catch (e) {
      setStatus('error');
      setErrorMessage(e instanceof Error ? e.message : 'Error al enviar el mensaje.');
    }
  };

  return (
    <section className="pt-32 pb-24 bg-white min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6">
        <SectionTitle title="Conecta con Open9" subtitle="Estamos listos para resolver tus desafíos técnicos más complejos." />
        
        <div className="grid lg:grid-cols-12 gap-16 max-w-6xl mx-auto">
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Información Directa</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0a2e5c] shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</div>
                    <div className="text-lg font-black text-slate-800">executive@open9.io</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0a2e5c] shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teléfono</div>
                    <div className="text-lg font-black text-slate-800">+1 (555) 099-0099</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0a2e5c] shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Oficina Central</div>
                    <div className="text-lg font-black text-slate-800">Tech Tower, Level 9, SF</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-[#0a2e5c] rounded-[2.5rem] text-white">
              <h4 className="text-xl font-black mb-4">¿Buscas Soporte?</h4>
              <p className="opacity-80 mb-6 font-medium">Nuestros clientes de Enterprise tienen acceso 24/7 a través de sus canales dedicados.</p>
              <button className="flex items-center gap-3 font-black text-cyan-400 hover:text-white transition-colors">
                Ir al Portal de Soporte <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase ml-2">Nombre</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-[#4fd1c5] outline-none" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase ml-2">Empresa</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-[#4fd1c5] outline-none" placeholder="Tu compañía" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase ml-2">Asunto</label>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-[#4fd1c5] outline-none" placeholder="¿Cómo podemos ayudarte?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase ml-2">Mensaje</label>
                <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-[#4fd1c5] outline-none" rows={6} placeholder="Cuéntanos sobre tu proyecto..."></textarea>
              </div>
              {status === 'success' && <p className="text-green-600 font-bold">Mensaje enviado correctamente.</p>}
              {status === 'error' && errorMessage && <p className="text-red-500 font-bold">{errorMessage}</p>}
              <button type="submit" disabled={status === 'sending'} className="w-full bg-[#0a2e5c] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#0d4285] transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50">
                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'} <Send size={24} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const StartProjectView: React.FC<{ onInquirySubmit: (i: ProjectInquiry) => void }> = ({ onInquirySubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    company: '',
    projectType: '',
    budget: '',
    description: ''
  });
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validateStep3 = () => {
    const newErrors: { email?: string; phone?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9}$/;

    if (!emailRegex.test(formData.clientEmail)) {
      newErrors.email = "Correo electrónico inválido.";
    }
    if (!phoneRegex.test(formData.clientPhone)) {
      newErrors.phone = "El teléfono debe tener exactamente 9 dígitos numéricos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing again
    if (field === 'clientEmail') setErrors(prev => ({ ...prev, email: undefined }));
    if (field === 'clientPhone') setErrors(prev => ({ ...prev, phone: undefined }));
  };

  const handleNextToStep4 = () => {
    if (validateStep3()) {
      setStep(4);
    }
  };

  const handleFinalSubmit = () => {
    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone) {
      alert("Por favor completa todos los datos de contacto.");
      return;
    }
    const inquiry: ProjectInquiry = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    onInquirySubmit(inquiry);
    alert("Solicitud recibida. Un estratega técnico se pondrá en contacto contigo en las próximas 24 horas.");
  };

  return (
    <section className="pt-32 pb-24 bg-white min-h-screen animate-in zoom-in-95 duration-500">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all ${step >= i ? 'bg-[#0a2e5c] text-white' : 'bg-slate-100 text-slate-400'}`}>
                {step > i ? <CheckCircle2 size={24} /> : i}
              </div>
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Nueva Iniciativa</h2>
          <p className="text-xl text-slate-500 font-medium">Define los parámetros de tu visión tecnológica.</p>
        </div>

        <div className="bg-slate-50 p-10 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-xl">
          {step === 1 && (
            <div className="space-y-10">
              <h3 className="text-2xl font-black text-slate-800 mb-8 text-center">¿Qué tipo de solución necesitas?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { id: 'enterprise', title: 'Enterprise Software', icon: <Layers /> },
                  { id: 'mobile', title: 'Mobile App Élite', icon: <Smartphone /> },
                  { id: 'cloud', title: 'Cloud Infrastructure', icon: <Cloud /> },
                  { id: 'custom', title: 'Desarrollo a Medida', icon: <Rocket /> }
                ].map(type => (
                  <button 
                    key={type.id}
                    onClick={() => { updateField('projectType', type.title); setStep(2); }}
                    className={`p-8 bg-white rounded-3xl border-2 transition-all text-left group ${formData.projectType === type.title ? 'border-[#4fd1c5] shadow-xl' : 'border-transparent hover:border-[#4fd1c5] hover:shadow-2xl'}`}
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0a2e5c] mb-6 group-hover:bg-[#0a2e5c] group-hover:text-white transition-all">
                      {React.cloneElement(type.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                    </div>
                    <span className="text-xl font-black text-slate-800">{type.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <h3 className="text-2xl font-black text-slate-800 mb-8 text-center">Rango de Inversión Estimado</h3>
              <div className="grid gap-4">
                {['$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'].map(range => (
                  <button 
                    key={range}
                    onClick={() => { updateField('budget', range); setStep(3); }}
                    className={`p-6 bg-white rounded-2xl border-2 transition-all text-center text-xl font-black text-slate-800 ${formData.budget === range ? 'border-[#4fd1c5]' : 'border-transparent hover:border-[#4fd1c5]'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="text-slate-400 font-bold hover:text-slate-600 block mx-auto">Volver al paso anterior</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-800 mb-8 text-center">Datos del Cliente</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase ml-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    value={formData.clientName} 
                    onChange={e => updateField('clientName', e.target.value)}
                    className="w-full p-5 bg-white border border-slate-100 rounded-2xl font-bold focus:border-[#4fd1c5] outline-none" 
                    placeholder="Escribe tu nombre" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase ml-2">Empresa / Organización</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={e => updateField('company', e.target.value)}
                    className="w-full p-5 bg-white border border-slate-100 rounded-2xl font-bold focus:border-[#4fd1c5] outline-none" 
                    placeholder="Nombre de tu compañía" 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase ml-2">Email Corporativo</label>
                  <input 
                    type="email" 
                    value={formData.clientEmail}
                    onChange={e => updateField('clientEmail', e.target.value)}
                    className={`w-full p-5 bg-white border ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-2xl font-bold focus:border-[#4fd1c5] outline-none`}
                    placeholder="email@tuempresa.com" 
                  />
                  {errors.email && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle size={12}/> {errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase ml-2">Teléfono (9 dígitos)</label>
                  <input 
                    type="tel" 
                    value={formData.clientPhone}
                    onChange={e => updateField('clientPhone', e.target.value.replace(/\D/g, '').slice(0, 9))}
                    className={`w-full p-5 bg-white border ${errors.phone ? 'border-red-500' : 'border-slate-100'} rounded-2xl font-bold focus:border-[#4fd1c5] outline-none`}
                    placeholder="Ej: 912345678" 
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><AlertCircle size={12}/> {errors.phone}</p>}
                </div>
              </div>

              <button 
                onClick={handleNextToStep4}
                disabled={!formData.clientName || !formData.clientEmail || !formData.clientPhone}
                className="w-full bg-[#0a2e5c] text-white py-6 rounded-2xl font-black text-xl hover:bg-[#0d4285] transition-all disabled:opacity-50 mt-4"
              >
                Continuar
              </button>
              <button onClick={() => setStep(2)} className="text-slate-400 font-bold hover:text-slate-600 block mx-auto">Volver al paso anterior</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-slate-800 mb-8 text-center">Detalles del Desafío</h3>
              <textarea 
                value={formData.description}
                onChange={e => updateField('description', e.target.value)}
                className="w-full p-6 bg-white border border-slate-100 rounded-3xl font-bold focus:border-[#4fd1c5] outline-none min-h-[200px]" 
                placeholder="Describe brevemente el objetivo principal de este proyecto..."
              ></textarea>
              <button 
                onClick={handleFinalSubmit}
                className="w-full bg-[#4fd1c5] text-[#0a2e5c] py-6 rounded-2xl font-black text-xl hover:scale-105 shadow-2xl transition-all"
              >
                Enviar Propuesta a Ingeniería
              </button>
              <button onClick={() => setStep(3)} className="text-slate-400 font-bold hover:text-slate-600 block mx-auto">Volver al paso anterior</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
