import React from 'react';

/**
 * Inline SVG brand icons for each skill.
 * Each icon is 20×20 viewBox, coloured to match the skill's brand.
 */
const icons = {

  /* ── AI & ML ── */
  'TensorFlow/PyTorch': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* TensorFlow orange */}
      <path d="M1.5 6.5L12 0.5l10.5 6v12L12 24.5 1.5 18.5z" fill="#FF6F00" opacity="0.15"/>
      <path d="M12 0.5v24M1.5 6.5l10.5 6M22.5 6.5l-10.5 6" stroke="#FF6F00" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12.5" r="3" fill="#FF6F00"/>
    </svg>
  ),
  'OpenAI API (GPT-4, Claude)': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.2 10.1a6 6 0 0 0-.5-4.9 6.1 6.1 0 0 0-6.6-2.9A6 6 0 0 0 10.7 1a6.1 6.1 0 0 0-5.8 4.2 6 6 0 0 0-4 2.9 6.1 6.1 0 0 0 .8 7.2 6 6 0 0 0 .5 4.9 6.1 6.1 0 0 0 6.6 2.9 6 6 0 0 0 4.4 1.9 6.1 6.1 0 0 0 5.8-4.2 6 6 0 0 0 4-2.9 6.1 6.1 0 0 0-.8-7.8z" stroke="#10a37f" strokeWidth="1.5" fill="none"/>
      <path d="M9 12l2 2 4-4" stroke="#10a37f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'LangChain': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="9" width="6" height="6" rx="1.5" stroke="#1C3D5B" strokeWidth="1.5" fill="#1C3D5B" fillOpacity="0.2"/>
      <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="#3B82F6" strokeWidth="1.5" fill="#3B82F6" fillOpacity="0.2"/>
      <rect x="16" y="9" width="6" height="6" rx="1.5" stroke="#1C3D5B" strokeWidth="1.5" fill="#1C3D5B" fillOpacity="0.2"/>
      <path d="M8 12h1M15 12h1" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'Hugging Face': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FFD21E" fillOpacity="0.2" stroke="#FFD21E" strokeWidth="1.5"/>
      <circle cx="9" cy="11" r="1.2" fill="#FFD21E"/>
      <circle cx="15" cy="11" r="1.2" fill="#FFD21E"/>
      <path d="M8.5 15c.9 1.5 6.1 1.5 7 0" stroke="#FFD21E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'Computer Vision': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#8A2BE2" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3.5" stroke="#8A2BE2" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="1.2" fill="#8A2BE2"/>
    </svg>
  ),
  'NLP/LLMs': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#00F5FF" strokeWidth="1.5"/>
      <path d="M7 9h10M7 12h6M7 15h8" stroke="#00F5FF" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  /* ── Prompt Engineering ── */
  'GPT-4 Prompting': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.2 10.1a6 6 0 0 0-.5-4.9 6.1 6.1 0 0 0-6.6-2.9A6 6 0 0 0 10.7 1a6.1 6.1 0 0 0-5.8 4.2 6 6 0 0 0-4 2.9 6.1 6.1 0 0 0 .8 7.2 6 6 0 0 0 .5 4.9 6.1 6.1 0 0 0 6.6 2.9 6 6 0 0 0 4.4 1.9 6.1 6.1 0 0 0 5.8-4.2 6 6 0 0 0 4-2.9 6.1 6.1 0 0 0-.8-7.8z" stroke="#10a37f" strokeWidth="1.5" fill="none"/>
      <text x="8" y="15" fill="#10a37f" fontSize="7" fontWeight="bold" fontFamily="monospace">G4</text>
    </svg>
  ),
  'Claude Prompting': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#CC785C" strokeWidth="1.5" fill="#CC785C" fillOpacity="0.1"/>
      <text x="7.5" y="16" fill="#CC785C" fontSize="7" fontWeight="bold" fontFamily="monospace">Cl</text>
    </svg>
  ),
  'Prompt Templates': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#f59e0b" strokeWidth="1.5"/>
      <path d="M7 8h10M7 12h5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 15l2-2 2 2" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Chain-of-Thought': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="2.5" stroke="#00F5FF" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2.5" stroke="#8A2BE2" strokeWidth="1.5"/>
      <circle cx="19" cy="12" r="2.5" stroke="#00ff88" strokeWidth="1.5"/>
      <path d="M7.5 12h2M14.5 12h2" stroke="#00F5FF" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'Few-Shot Learning': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6h4v4H4zM10 6h4v4h-4zM4 14h4v4H4z" stroke="#8A2BE2" strokeWidth="1.5" rx="1"/>
      <path d="M14 16l3 3 3-5" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Prompt Optimization': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.15"/>
    </svg>
  ),

  /* ── Automation ── */
  'Zapier/Make': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" stroke="#FF4A00" strokeWidth="1.5" fill="#FF4A00" fillOpacity="0.15" strokeLinejoin="round"/>
    </svg>
  ),
  'Python Scripts': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 8 3.9 8 5v1.5h4v.5H6C4.34 7 3 8.34 3 10v3c0 1.66 1.34 3 3 3h1V14.5C7 13.12 8.12 12 9.5 12H14c1.1 0 2-.9 2-2V5c0-1.1-.9-3-4-3z" fill="#3776AB" fillOpacity="0.8"/>
      <path d="M12 22c3.87 0 4-1.9 4-3v-1.5h-4v-.5h6c1.66 0 3-1.34 3-3v-3c0-1.66-1.34-3-3-3h-1V9.5C17 10.88 15.88 12 14.5 12H10c-1.1 0-2 .9-2 2v5c0 1.1.9 3 4 3z" fill="#FFD43B" fillOpacity="0.9"/>
      <circle cx="10" cy="5.5" r=".8" fill="white"/>
      <circle cx="14" cy="18.5" r=".8" fill="white"/>
    </svg>
  ),
  'n8n': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="3" stroke="#EA4B71" strokeWidth="1.5" fill="#EA4B71" fillOpacity="0.2"/>
      <circle cx="19" cy="12" r="3" stroke="#EA4B71" strokeWidth="1.5" fill="#EA4B71" fillOpacity="0.2"/>
      <path d="M8 12h8" stroke="#EA4B71" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'API Integration': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="8" height="10" rx="1.5" stroke="#00F5FF" strokeWidth="1.5"/>
      <rect x="14" y="7" width="8" height="10" rx="1.5" stroke="#8A2BE2" strokeWidth="1.5"/>
      <path d="M10 12h4M12 10l2 2-2 2" stroke="#00F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Workflow Automation': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12h3l3-6 3 12 3-6h3" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'RPA Tools': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="#f59e0b" strokeWidth="1.5"/>
      <circle cx="12" cy="7" r="2" stroke="#f59e0b" strokeWidth="1.5"/>
      <path d="M8 13h8M8 17h5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  /* ── Web Development ── */
  'React/Next': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB"/>
    </svg>
  ),
  'Node': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7.5v9L12 22l10-5.5v-9z" stroke="#339933" strokeWidth="1.5" fill="#339933" fillOpacity="0.15"/>
      <path d="M12 6v12M7 8.5l5 3 5-3" stroke="#339933" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'TypeScript': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" fillOpacity="0.2" stroke="#3178C6" strokeWidth="1.5"/>
      <path d="M8 10h8M12 10v6" stroke="#3178C6" strokeWidth="2" strokeLinecap="round"/>
      <text x="6" y="8" fill="#3178C6" fontSize="5" fontWeight="bold" fontFamily="monospace">TS</text>
    </svg>
  ),
  'TailwindCSS': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.97 1 2.09 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.63 7.15 14.51 6 12 6z" fill="#38BDF8"/>
      <path d="M7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.97 1 2.09 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.63 13.15 9.51 12 7 12z" fill="#38BDF8"/>
    </svg>
  ),
  'APIs (REST/GraphQL)': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* GraphQL pink */}
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" stroke="#E10098" strokeWidth="1.5" fill="#E10098" fillOpacity="0.1"/>
      <circle cx="12" cy="2" r="1.5" fill="#E10098"/>
      <circle cx="20.66" cy="7" r="1.5" fill="#E10098"/>
      <circle cx="20.66" cy="17" r="1.5" fill="#E10098"/>
      <circle cx="12" cy="22" r="1.5" fill="#E10098"/>
      <circle cx="3.34" cy="17" r="1.5" fill="#E10098"/>
      <circle cx="3.34" cy="7" r="1.5" fill="#E10098"/>
      <circle cx="12" cy="12" r="2.5" fill="#E10098"/>
    </svg>
  ),
  'Vercel/Netlify': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L22 21H2L12 3z" fill="white" fillOpacity="0.9" stroke="white" strokeWidth="1"/>
    </svg>
  ),

  /* ── DevOps & Cloud ── */
  'Docker': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 10h2V8h-2v2zM10 10h2V8h-2v2zM7 10h2V8H7v2zM13 7h2V5h-2v2zM10 7h2V5h-2v2z" fill="#2496ED"/>
      <path d="M21.8 11.2a3 3 0 0 0-2.5-.6 4.5 4.5 0 0 0-4.5-3.6H4.5A4.5 4.5 0 0 0 0 11.5v.5a6 6 0 0 0 6 6h10a6 6 0 0 0 5.8-4.4 3 3 0 0 0 0-2.4z" stroke="#2496ED" strokeWidth="1.2" fill="#2496ED" fillOpacity="0.15"/>
    </svg>
  ),
  'GitHub Actions': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#2088FF" strokeWidth="1.5" fill="#2088FF" fillOpacity="0.1"/>
      <path d="M8 12l3 3 5-5" stroke="#2088FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'AWS/GCP': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cloud shape */}
      <path d="M17 18H7a5 5 0 0 1 0-10 5 5 0 0 1 9.9-1A4 4 0 0 1 21 11a4 4 0 0 1-4 4" stroke="#FF9900" strokeWidth="1.5" fill="none"/>
      <path d="M9 18v2M12 18v2M15 18v2" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'CI/CD': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="2.5" stroke="#00ff88" strokeWidth="1.5"/>
      <circle cx="19" cy="6" r="2.5" stroke="#00F5FF" strokeWidth="1.5"/>
      <circle cx="19" cy="18" r="2.5" stroke="#8A2BE2" strokeWidth="1.5"/>
      <path d="M7.5 12l9-6M7.5 12l9 6" stroke="#00F5FF" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  'Kubernetes': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l9 5v10l-9 5-9-5V7z" stroke="#326CE5" strokeWidth="1.5" fill="#326CE5" fillOpacity="0.1"/>
      <circle cx="12" cy="12" r="2.5" stroke="#326CE5" strokeWidth="1.5"/>
      <path d="M12 4v3M12 17v3M4.07 8l2.6 1.5M17.33 14.5l2.6 1.5M4.07 16l2.6-1.5M17.33 9.5l2.6-1.5" stroke="#326CE5" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  'Infrastructure as Code': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="#7B42BC" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="#7B42BC" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="#7B42BC" strokeWidth="1.5"/>
      <path d="M17.5 14v7M14 17.5h7" stroke="#7B42BC" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

/**
 * Returns a 20×20 skill icon for the given skill name.
 * Falls back to a generic code icon if the skill isn't mapped.
 */
const SkillIcon = ({ name, size = 18 }) => {
  const icon = icons[name] || (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" stroke="#00F5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <span
      style={{ width: size, height: size, display: 'inline-flex', flexShrink: 0 }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
};

export default SkillIcon;

/* ─────────────────────────────────────────────────
   Category header logos — one per skill card
───────────────────────────────────────────────── */
const categoryLogos = {

  /** 1 · AI & Machine Learning — glowing neural brain */
  'AI & Machine Learning': ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#00F5FF" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* glow disc */}
      <circle cx="24" cy="24" r="22" fill="url(#brain-glow)"/>
      {/* outer ring */}
      <circle cx="24" cy="24" r="20" stroke="#00F5FF" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3"/>
      {/* neural nodes */}
      <circle cx="24" cy="10" r="3"  fill="#00F5FF" fillOpacity="0.9"/>
      <circle cx="10" cy="20" r="3"  fill="#61DAFB" fillOpacity="0.9"/>
      <circle cx="38" cy="20" r="3"  fill="#61DAFB" fillOpacity="0.9"/>
      <circle cx="15" cy="36" r="3"  fill="#8A2BE2" fillOpacity="0.9"/>
      <circle cx="33" cy="36" r="3"  fill="#8A2BE2" fillOpacity="0.9"/>
      <circle cx="24" cy="24" r="4"  fill="#00F5FF"/>
      {/* connections */}
      <line x1="24" y1="10" x2="10" y2="20" stroke="#00F5FF" strokeWidth="1.2" strokeOpacity="0.6"/>
      <line x1="24" y1="10" x2="38" y2="20" stroke="#00F5FF" strokeWidth="1.2" strokeOpacity="0.6"/>
      <line x1="10" y1="20" x2="24" y2="24" stroke="#61DAFB" strokeWidth="1.2" strokeOpacity="0.6"/>
      <line x1="38" y1="20" x2="24" y2="24" stroke="#61DAFB" strokeWidth="1.2" strokeOpacity="0.6"/>
      <line x1="24" y1="24" x2="15" y2="36" stroke="#8A2BE2" strokeWidth="1.2" strokeOpacity="0.6"/>
      <line x1="24" y1="24" x2="33" y2="36" stroke="#8A2BE2" strokeWidth="1.2" strokeOpacity="0.6"/>
      <line x1="10" y1="20" x2="15" y2="36" stroke="#00F5FF" strokeWidth="0.8" strokeOpacity="0.35"/>
      <line x1="38" y1="20" x2="33" y2="36" stroke="#00F5FF" strokeWidth="0.8" strokeOpacity="0.35"/>
    </svg>
  ),

  /** 2 · Prompt Engineering — chat bubble with spark cursor */
  'Prompt Engineering': ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chat-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#chat-glow)"/>
      {/* chat bubble body */}
      <rect x="7" y="9" width="34" height="24" rx="6" stroke="#f59e0b" strokeWidth="1.8" fill="#f59e0b" fillOpacity="0.08"/>
      {/* bubble tail */}
      <path d="M14 33l-5 6 8-3" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* cursor lines */}
      <path d="M13 18h10M13 23h14M13 28h8" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/>
      {/* blinking cursor */}
      <rect x="28" y="27" width="2" height="9" rx="1" fill="#f59e0b" opacity="0.9"/>
      {/* lightning bolt spark */}
      <path d="M34 11l-3.5 5.5h3l-3.5 5.5" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  /** 3 · Automation — gear with inner lightning bolt */
  'Automation': ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gear-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#gear-glow)"/>
      {/* gear teeth path */}
      <path
        d="M24 6l2.5 4.5a13 13 0 0 1 5 2.1l5-1.1 3 5.2-3.3 3.9a13 13 0 0 1 0 6.8l3.3 3.9-3 5.2-5-1.1a13 13 0 0 1-5 2.1L24 42l-2.5-4.5a13 13 0 0 1-5-2.1l-5 1.1-3-5.2 3.3-3.9a13 13 0 0 1 0-6.8L8.5 16.7l3-5.2 5 1.1a13 13 0 0 1 5-2.1z"
        stroke="#00ff88" strokeWidth="1.6" fill="#00ff88" fillOpacity="0.07"
      />
      {/* inner circle */}
      <circle cx="24" cy="24" r="7" stroke="#00ff88" strokeWidth="1.4" fill="none"/>
      {/* lightning bolt inside */}
      <path d="M25.5 17.5l-4 6.5h3.5l-4 6.5" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  /** 4 · Web Development — browser window with code brackets */
  'Web Development': ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="web-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#61DAFB" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#61DAFB" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#web-glow)"/>
      {/* browser chrome */}
      <rect x="6" y="10" width="36" height="28" rx="4" stroke="#61DAFB" strokeWidth="1.6" fill="#61DAFB" fillOpacity="0.06"/>
      {/* browser top bar */}
      <line x1="6" y1="18" x2="42" y2="18" stroke="#61DAFB" strokeWidth="1.2" strokeOpacity="0.6"/>
      {/* traffic lights */}
      <circle cx="12" cy="14" r="1.5" fill="#ff5f57"/>
      <circle cx="17" cy="14" r="1.5" fill="#febc2e"/>
      <circle cx="22" cy="14" r="1.5" fill="#28c840"/>
      {/* code brackets */}
      <path d="M16 27l-4 3 4 3" stroke="#61DAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 27l4 3-4 3" stroke="#8A2BE2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27 24l-6 12" stroke="#00F5FF" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),

  /** 5 · DevOps & Cloud — cloud with CI/CD pipeline arrows */
  'DevOps & Cloud': ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cloud-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#cloud-glow)"/>
      {/* cloud shape */}
      <path
        d="M33 22a8 8 0 0 0-15.5-2A6 6 0 0 0 12 26a6 6 0 0 0 6 6h15a5 5 0 0 0 0-10z"
        stroke="#38BDF8" strokeWidth="1.6" fill="#38BDF8" fillOpacity="0.1"
      />
      {/* pipeline nodes */}
      <circle cx="16" cy="39" r="2.5" fill="#00ff88"/>
      <circle cx="24" cy="39" r="2.5" fill="#00F5FF"/>
      <circle cx="32" cy="39" r="2.5" fill="#8A2BE2"/>
      {/* pipeline connectors */}
      <path d="M18.5 39h3M26.5 39h3" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round"/>
      {/* down arrows from cloud to pipeline */}
      <path d="M24 32v5" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M22 36l2 2 2-2" stroke="#38BDF8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/**
 * Returns the category logo SVG for a given category name.
 * Falls back to a generic grid icon if category isn't mapped.
 */
export const CategoryIcon = ({ name, size = 40 }) => {
  const Logo = categoryLogos[name];
  if (Logo) return <Logo size={size} />;

  // fallback
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="15" height="15" rx="2" stroke="#00F5FF" strokeWidth="1.5"/>
      <rect x="27" y="6" width="15" height="15" rx="2" stroke="#00F5FF" strokeWidth="1.5"/>
      <rect x="6" y="27" width="15" height="15" rx="2" stroke="#00F5FF" strokeWidth="1.5"/>
      <rect x="27" y="27" width="15" height="15" rx="2" stroke="#00F5FF" strokeWidth="1.5"/>
    </svg>
  );
};

