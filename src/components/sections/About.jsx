import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Card, CardContent } from '../ui/Card';
import useRevealAnimations from '../utils/useRevealAnimations';

// On-chain stats to display as NFT-card style metrics
const onChainStats = [
  { label: 'Projects Shipped', value: '12+', icon: '⬡', color: '#00f3ff' },
  { label: 'Commits', value: '2.4K', icon: '◈', color: '#ff00ff' },
  { label: 'Years Active', value: '3+', icon: '◆', color: '#00ff88' },
  { label: 'Clients Served', value: '8+', icon: '◉', color: '#f59e0b' },
];

const About = () => {
  const { ref: sectionRef, isVisible } = useRevealAnimations({
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  return (
    <section id="about" className="section-padding bg-[#0d0d15] relative overflow-hidden" ref={sectionRef}>
      {/* Hex grid background */}
      <div className="absolute inset-0 hex-grid-bg pointer-events-none opacity-30" />
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00f3ff]/6 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#ff00ff]/6 rounded-full filter blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className={`reveal-section-header ${isVisible ? 'reveal-active' : ''} text-center mb-16`}>
          {/* Web3 section label */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-[#00f3ff]/5 border border-[#00f3ff]/20 text-[#00f3ff]/70 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
            0x02 · IDENTITY BLOCK
          </span>
          <h2 className="heading-lg gradient-text mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* NFT-Style Profile Card */}
          <div className={`reveal reveal-fade-in-left ${isVisible ? 'reveal-active' : ''}`}>
            <div className="relative group max-w-sm mx-auto">
              {/* Outer glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d15]">
                {/* Card header — NFT collection bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#00f3ff]/8 to-[#ff00ff]/8 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L4 12l8 4.8L20 12 12 2z" fill="#00f3ff" opacity="0.9"/>
                      <path d="M12 18.5L4 13.8l8 8.2 8-8.2-8 4.7z" fill="#ff00ff" opacity="0.8"/>
                    </svg>
                    <span className="text-xs font-mono text-gray-400">DevNFT · #0042</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00ff88]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                    VERIFIED
                  </span>
                </div>

                {/* Avatar area */}
                <div className="relative p-8 flex flex-col items-center">
                  {/* Animated ring */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#00f3ff]/30 animate-spin" style={{ animationDuration: '12s' }} />
                    <div className="absolute -inset-4 rounded-full border border-[#ff00ff]/15 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                    <div className="w-36 h-36 rounded-full overflow-hidden border border-white/10 shadow-lg">
                        <img src="/avatar.jpg" alt="Omik" className="w-full h-full object-cover object-top" />
                    </div>
                    {/* Level badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#00f3ff] to-[#ff00ff] text-white whitespace-nowrap shadow-lg">
                      LVL 9 · Builder
                    </div>
                  </div>

                  {/* Name & title */}
                  <h3 className="text-xl font-bold gradient-text mb-1">Omik</h3>
                  <p className="text-sm text-[#00f3ff]/70 font-mono mb-4">Prompt Engineer · AI Dev</p>

                  {/* Traits row */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {['AI/ML', 'Web3', 'Automation', 'React', 'Python'].map(trait => (
                      <span key={trait} className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
                        {trait}
                      </span>
                    ))}
                  </div>


                </div>

                {/* On-chain stats footer */}
                <div className="grid grid-cols-2 divide-x divide-y divide-white/5 border-t border-white/5">
                  {onChainStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center py-3 px-2">
                      <span className="text-base font-bold mb-0.5" style={{ color: stat.color }}>
                        {stat.value}
                      </span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            {/* Bio */}
            <p className={`reveal reveal-text reveal-stagger-1 ${isVisible ? 'reveal-active' : ''} body-text text-lg`}>
              {portfolioData.about.bio}
            </p>

            {/* Highlights — on-chain style checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioData.about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`reveal reveal-fade-in-up reveal-stagger-${Math.min(index + 2, 10)} ${isVisible ? 'reveal-active' : ''} flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-[#00f3ff]/20 transition-colors`}
                >
                  <svg className="w-4 h-4 text-[#00ff88] flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-300">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Web3 Activity Feed */}
            <div className={`reveal reveal-fade-in-up reveal-stagger-4 ${isVisible ? 'reveal-active' : ''}`}>
              <div className="p-4 rounded-xl bg-[#050505] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Live Activity</span>
                </div>
                <div className="space-y-2">
                  {[
                    { action: 'Deployed', target: 'AI Automation Pipeline', time: '2h ago', color: '#00f3ff' },
                    { action: 'Merged PR', target: 'Neural UI Component', time: '1d ago', color: '#ff00ff' },
                    { action: 'Shipped', target: 'Web3 Portfolio v2.0', time: '3d ago', color: '#00ff88' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-gray-500">{item.time}</span>
                      <span className="font-semibold" style={{ color: item.color }}>{item.action}</span>
                      <span className="text-gray-400 truncate">{item.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
