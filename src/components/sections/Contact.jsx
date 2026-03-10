import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Card, CardContent } from '../ui/Card';
import useRevealAnimations from '../utils/useRevealAnimations';

/* ─────────────────────────────────────────
   Inline SVG icons
───────────────────────────────────────── */
const icons = {
  user: (
    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  mail: (
    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  tag: (
    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  message: (
    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  send: (
    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  check: (
    <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

/* ─────────────────────────────────────────
   Success / Error feedback card
───────────────────────────────────────── */
const SubmitFeedback = ({ status, onReset }) => {
  const isSuccess = status === 'success';
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-5 animate-fade-in-up">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
          isSuccess
            ? 'bg-[#3ce6f9]/10 border-[#3ce6f9] text-[#3ce6f9]'
            : 'bg-red-500/10 border-red-500 text-red-400'
        }`}
        style={{ animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {isSuccess ? icons.check : icons.error}
      </div>

      <h4 className="text-xl font-bold text-white">
        {isSuccess ? 'Message Sent!' : 'Something went wrong'}
      </h4>
      <p className="text-gray-400 max-w-xs">
        {isSuccess
          ? "Thanks for reaching out! I'll get back to you as soon as possible."
          : 'Your message could not be sent. Please try again or email me directly.'}
      </p>

      <button
        onClick={onReset}
        className="mt-2 px-6 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300
          border-gray-600 text-gray-300 hover:border-[#3ce6f9] hover:text-[#3ce6f9]"
      >
        {isSuccess ? 'Send Another' : 'Try Again'}
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main Contact section
───────────────────────────────────────── */
const Contact = () => {
  const emptyForm = { name: '', email: '', subject: '', message: '' };

  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [focusedField, setFocusedField] = useState(null);

  const { ref: sectionRef, isVisible } = useRevealAnimations({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { name, email, subject, message } = formData;

      // ── Option A: Web3Forms (recommended, free & no backend needed)
      // 1. Sign up at https://web3forms.com/ and get your free access key
      // 2. Replace 'YOUR_WEB3FORMS_ACCESS_KEY' below with your key
      // 3. Delete Option B once you have a key
      const WEB3FORMS_KEY = 'fdd689d2-0e94-4283-991d-18e8cc4b8e50';

      if (WEB3FORMS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name,
            email,
            subject: subject || 'Portfolio Contact',
            message,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || 'Web3Forms error');
        setSubmitStatus('success');
        return;
      }

      // ── Option B: mailto fallback (works immediately, no signup)
      // Uses window.open so the page doesn't navigate away
      const mailtoUrl = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(
        subject || 'Portfolio Contact'
      )}&body=${encodeURIComponent(`Hi, I'm ${name} (${email}).\n\n${message}`)}`;

      await new Promise((r) => setTimeout(r, 900));
      window.open(mailtoUrl, '_blank');
      setSubmitStatus('success');
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus(null);
    setFormData(emptyForm);
  };

  const inputFields = [
    { name: 'name',    label: 'Name',    type: 'text',  icon: 'user', placeholder: 'Your name' },
    { name: 'email',   label: 'Email',   type: 'email', icon: 'mail', placeholder: 'your.email@example.com' },
    { name: 'subject', label: 'Subject', type: 'text',  icon: 'tag',  placeholder: "What's this about?" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3ce6f9]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className={`reveal-section-header ${isVisible ? 'reveal-active' : ''} text-center mb-16`}>
          <h2 className="heading-lg gradient-text mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] mx-auto rounded-full mb-6 animate-pulse" />
          <p className="body-text max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Left: Contact Info ── */}
          <div className={`reveal reveal-fade-in-left reveal-stagger-1 ${isVisible ? 'reveal-active' : ''} space-y-8`}>
            <div>
              <h3 className="heading-md mb-6">Let's Connect</h3>
              <p className="body-text text-lg mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                <Card className="relative hover:transform hover:-translate-y-1 transition-transform duration-300 hover:border-[#3ce6f9]/30">
                  <CardContent className="p-6 flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3ce6f9]/20 to-[#a855f7]/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-[#3ce6f9]/30">
                      <svg className="w-6 h-6 text-[#3ce6f9]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-1">Email</h4>
                      <a href={`mailto:${portfolioData.contact.email}`} className="text-[#3ce6f9] hover:text-[#a855f7] transition-colors">
                        {portfolioData.contact.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* GitHub card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a855f7] to-[#3ce6f9] rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                <Card className="relative hover:transform hover:-translate-y-1 transition-transform duration-300 hover:border-[#a855f7]/30">
                  <CardContent className="p-6 flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#a855f7]/20 to-[#3ce6f9]/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-[#a855f7]/30">
                      <svg className="w-6 h-6 text-[#a855f7]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-1">GitHub</h4>
                      <a href={portfolioData.contact.social.github} target="_blank" rel="noopener noreferrer" className="text-[#a855f7] hover:text-[#3ce6f9] transition-colors">
                        github.com/omik
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* LinkedIn card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                <Card className="relative hover:transform hover:-translate-y-1 transition-transform duration-300 hover:border-[#3ce6f9]/30">
                  <CardContent className="p-6 flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3ce6f9]/20 to-[#a855f7]/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-[#3ce6f9]/30">
                      <svg className="w-6 h-6 text-[#3ce6f9]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-1">LinkedIn</h4>
                      <a href={portfolioData.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#3ce6f9] hover:text-[#a855f7] transition-colors">
                        linkedin.com/in/omik
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Social icon row */}
            <div className="pt-6">
              <h4 className="heading-sm mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {/* GitHub */}
                <a href={portfolioData.contact.social.github} target="_blank" rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-[#a855f7]"
                  aria-label="GitHub">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#3ce6f9] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href={portfolioData.contact.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-[#3ce6f9]"
                  aria-label="LinkedIn">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {portfolioData.contact.social.twitter && (
                  <a href={portfolioData.contact.social.twitter} target="_blank" rel="noopener noreferrer"
                    className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-[#a855f7]"
                    aria-label="Twitter">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#3ce6f9] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}

                {portfolioData.contact.social.devto && (
                  <a href={portfolioData.contact.social.devto} target="_blank" rel="noopener noreferrer"
                    className="group relative w-12 h-12 bg-[#1a1a24] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-gray-700 hover:border-[#3ce6f9]"
                    aria-label="Dev.to">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.5 12.5c0 1.9-.8 3-2.3 3-1.5 0-2.2-1.1-2.2-3 0-1.9.7-3 2.2-3 1.5 0 2.3 1.1 2.3 3zm.8 0c0-2.3-1.2-3.8-3.1-3.8-1.9 0-3 1.5-3 3.8 0 2.3 1.1 3.8 3 3.8 1.9 0 3.1-1.5 3.1-3.8zm11.4 0c0 1.9-.8 3-2.3 3-1.5 0-2.2-1.1-2.2-3 0-1.9.7-3 2.2-3 1.5 0 2.3 1.1 2.3 3zm.8 0c0-2.3-1.2-3.8-3.1-3.8-1.9 0-3 1.5-3 3.8 0 2.3 1.1 3.8 3 3.8 1.9 0 3.1-1.5 3.1-3.8zm-8.3-3.6h-1.4v7.2h1.4v-4.4c0-1.1.9-2 2-2s1.8.9 1.8 2v4.4h1.4v-5c0-1.7-1.4-3.1-3.2-3.1-1.1 0-2 .5-2.5 1.3v-1.4z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Send a Message card ── */}
          <div className={`reveal reveal-fade-in-right reveal-stagger-2 ${isVisible ? 'reveal-active' : ''}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] rounded-2xl blur opacity-20" />
              <Card className="relative hover:border-[#3ce6f9]/30 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="heading-md mb-6">Send a Message</h3>

                  {/* ── Feedback state (success / error) ── */}
                  {submitStatus ? (
                    <SubmitFeedback status={submitStatus} onReset={handleReset} />
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      {/* Text / email / subject fields */}
                      {inputFields.map((field, index) => (
                        <div
                          key={field.name}
                          className={`reveal reveal-fade-in-up reveal-stagger-${Math.min(index + 3, 10)} relative`}
                        >
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] rounded-lg blur transition-opacity duration-300"
                            style={{ opacity: focusedField === field.name ? 0.15 : 0 }}
                          />
                          <div className="relative">
                            <label
                              htmlFor={field.name}
                              className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                            >
                              <span className="text-[#3ce6f9]">{icons[field.icon]}</span>
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              id={field.name}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              onFocus={() => setFocusedField(field.name)}
                              onBlur={() => setFocusedField(null)}
                              required
                              placeholder={field.placeholder}
                              aria-label={field.label}
                              className={`w-full px-4 py-3 bg-[#1a1a24]/80 backdrop-blur-sm border rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-300 ${
                                focusedField === field.name
                                  ? 'border-[#3ce6f9] shadow-[0_0_20px_rgba(60,230,249,0.25)]'
                                  : 'border-gray-700 hover:border-gray-600'
                              }`}
                            />
                          </div>
                        </div>
                      ))}

                      {/* Message textarea */}
                      <div className="reveal reveal-fade-in-up reveal-stagger-6 relative">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#3ce6f9] rounded-lg blur transition-opacity duration-300"
                          style={{ opacity: focusedField === 'message' ? 0.15 : 0 }}
                        />
                        <div className="relative">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                          >
                            <span className="text-[#a855f7]">{icons.message}</span>
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            rows={5}
                            placeholder="Your message..."
                            aria-label="Message"
                            className={`w-full px-4 py-3 bg-[#1a1a24]/80 backdrop-blur-sm border rounded-lg text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none ${
                              focusedField === 'message'
                                ? 'border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Submit button */}
                      <div className="reveal reveal-fade-in-up reveal-stagger-7">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          id="contact-submit-btn"
                          className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#3ce6f9] to-[#a855f7] p-0.5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(60,230,249,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <div className="relative flex items-center justify-center gap-2 rounded-lg bg-[#0a0a0f] px-8 py-4 transition-all duration-300 group-hover:bg-opacity-90">
                            {isSubmitting ? (
                              <>
                                <svg className="animate-spin h-5 w-5 text-[#3ce6f9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span className="text-white font-semibold">Sending…</span>
                              </>
                            ) : (
                              <>
                                <span className="text-[#3ce6f9] group-hover:text-white transition-colors duration-300">{icons.send}</span>
                                <span className="text-white font-semibold group-hover:text-[#3ce6f9] transition-colors duration-300">Send Message</span>
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe for the success/error icon pop-in */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease both; }
      `}</style>
    </section>
  );
};

export default Contact;
