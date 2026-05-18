import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Float, MeshTransmissionMaterial } from '@react-three/drei';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MapPin, Phone, Send,
  User, MessageSquare, Loader2, CheckCircle2, AlertCircle,
} from 'lucide-react';
import type { Theme, SectionProps } from '../types';
import { personal } from '../data/personal';
import { socials } from '../data/socials';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
    }
  }
}

const DecorationRing = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Torus args={[3, 0.2, 16, 100]} ref={mesh} rotation={[Math.PI / 2, 0, 0]}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          chromaticAberration={0.5}
          color="#8B5CF6"
        />
      </Torus>
    </Float>
  );
};

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  icon?: any;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label, id, name, type = 'text', value, onChange,
  isTextArea = false, icon: Icon, placeholder,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
      {label}
    </label>
    <div className="relative">
        <div className="absolute left-3.5 top-3.5 text-slate-500 pointer-events-none z-10">
          {Icon && <Icon size={16} />}
        </div>
      {isTextArea ? (
        <textarea
          id={id} name={name} value={value} onChange={onChange}
          placeholder={placeholder} rows={4}
          className={`w-full py-3 rounded-xl glass-dark border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 text-slate-200 resize-none placeholder:text-slate-600 text-sm ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
        />
      ) : (
        <input
          type={type} id={id} name={name} value={value}
          onChange={onChange} placeholder={placeholder}
          className={`w-full py-3 rounded-xl glass-dark border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 text-slate-200 placeholder:text-slate-600 text-sm ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
        />
      )}
    </div>
  </div>
);

interface ContactProps extends SectionProps { theme: Theme; }

const Contact: React.FC<ContactProps> = ({ id }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus('error');
      return;
    }
    setStatus('submitting');

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: formState.name, email: formState.email, message: formState.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      })
      .catch(() => {
        setStatus('idle');
        alert('Failed to send message. Please try again later.');
      });
  };

  const contactItems = [
    { icon: Mail,   value: personal.email,    href: `mailto:${personal.email}` },
    { icon: MapPin, value: personal.location,  href: null },
    { icon: Phone,  value: personal.phone,     href: `tel:${personal.phone}` },
  ];

  return (
    <section id={id} className="py-24 min-h-screen relative bg-slate-950 overflow-hidden">
      {/* 3D torus background */}
      <div className="absolute inset-0 pointer-events-none h-full w-full opacity-20">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <DecorationRing />
        </Canvas>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Let's talk
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Let's build something great together
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Open to freelance projects, collaborations, or full-time opportunities.
                Feel free to reach out — I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-center gap-4 group">
                  <div className="p-3 glass-dark rounded-xl border border-slate-800 group-hover:border-primary/30 group-hover:text-primary transition-all text-slate-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  {href ? (
                    <a href={href} className="text-slate-300 hover:text-primary transition-colors font-medium">
                      {value}
                    </a>
                  ) : (
                    <span className="text-slate-300 font-medium">{value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 glass-dark rounded-xl border border-slate-800 hover:border-primary/40 text-slate-400 hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-dark p-8 rounded-2xl border border-slate-800 shadow-2xl"
          >
            <form onSubmit={handleSubmit}>
              <FormField label="Your Name"      id="name"    name="name"    icon={User}          placeholder="Muhammad Ali"        value={formState.name}    onChange={handleChange} />
              <FormField label="Email Address"  id="email"   name="email"   icon={Mail} type="email" placeholder="ali@example.com" value={formState.email}   onChange={handleChange} />
              <FormField label="Message"        id="message" name="message" icon={MessageSquare} placeholder="Tell me about your project…" value={formState.message} onChange={handleChange} isTextArea />

              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl mb-3"
                  >
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" /> Please fill in all fields.
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center text-green-400 text-sm bg-green-500/10 border border-green-500/20 p-3 rounded-xl mb-3"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" /> Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed group mt-2"
              >
                {status === 'submitting' ? (
                  <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending…</>
                ) : (
                  <><Send className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
