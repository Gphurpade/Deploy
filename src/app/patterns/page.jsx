'use client';

import React, { useState } from 'react';

// --- PATTERN ENGINE ---
const PATTERNS = [
  { 
    id: 'dot-grid', 
    name: 'SaaS Dot Grid', 
    type: 'Tailwind',
    className: "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
    style: { backgroundColor: '#000000', backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '16px 16px' }
  },
  { 
    id: 'blueprint', 
    name: 'Blueprint Grid', 
    type: 'Tailwind',
    className: "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]",
    style: { backgroundColor: '#000000', backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)', backgroundSize: '24px 24px' }
  },
  { 
    id: 'isogonal-mesh', 
    name: 'Cyber Mesh', 
    type: 'CSS',
    style: { 
      backgroundColor: '#05070a', 
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.5) 1px, transparent 2px), repeating-conic-gradient(from 30deg, transparent 0deg 60deg, rgba(0, 242, 255, 0.1) 61deg 120deg, transparent 121deg 180deg)',
      backgroundSize: '40px 70px',
      backgroundPosition: '0 0, 20px 35px'
    } 
  },
  { 
    id: 'circuit', 
    name: 'Tech Circuit', 
    type: 'CSS',
    style: { 
      backgroundColor: '#000000',
      backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.35) 1px, transparent 0), linear-gradient(rgba(255, 255, 255, 0.36) 1px, transparent 0), linear-gradient(90deg, rgb(255, 255, 255) 1px, transparent 0), linear-gradient(rgb(255, 255, 255) 1px, transparent 0)',
      backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px'
    }
  },
  { 
    id: 'zigzag', 
    name: 'Modern ZigZag', 
    type: 'CSS',
    style: { 
        backgroundColor: '#000000', 
        backgroundImage: 'linear-gradient(135deg, #f0f0f0 25%, transparent 25%), linear-gradient(225deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(315deg, #f0f0f0 25%, transparent 25%)', 
        backgroundPosition: '10px 0, 10px 0, 0 0, 0 0', 
        backgroundSize: '20px 20px' 
    } 
  }
];

export default function PatternProGallery() {
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyCode = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCSS = (style) => {
    return Object.entries(style)
      .map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}: ${v};`)
      .join('\n');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-12">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Background Engine
        </h1>
        <p className="text-slate-500 text-lg">Copy-paste geometric patterns for Tailwind CSS and Vanilla CSS.</p>
      </header>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PATTERNS.map((p) => (
          <div key={p.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all">
            {/* Visual Preview */}
            <div className="h-48 w-full border-b border-slate-100 relative" style={p.style}>
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">{p.name}</h3>
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md ${p.type === 'Tailwind' ? 'bg-sky-100 text-sky-600' : 'bg-purple-100 text-purple-600'}`}>
                  {p.type}
                </span>
              </div>

              <div className="space-y-3">
                {p.className && (
                  <button 
                    onClick={() => copyCode(p.className)}
                    className="w-full py-2 px-4 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors flex justify-between items-center"
                  >
                    <span>Copy Tailwind</span>
                    <span className="text-slate-400 text-xs">Class</span>
                  </button>
                )}
                <button 
                  onClick={() => copyCode(getCSS(p.style))}
                  className="w-full py-2 px-4 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex justify-between items-center"
                >
                  <span>Copy Raw CSS</span>
                  <span className="text-slate-400 text-xs">Styles</span>
                </button>
                <button 
                  onClick={() => setSelected(p)}
                  className="w-full text-center text-xs text-blue-600 font-semibold mt-2 hover:underline"
                >
                  Live Fullscreen Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Overlay Preview */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
          {/* Real Pattern Background */}
          <div className="absolute inset-0 z-0" style={selected.style} />
          
          {/* Glass Card */}
          <div className="relative z-10 w-full max-w-4xl bg-white/70 backdrop-blur-2xl h-full md:h-auto md:rounded-3xl shadow-2xl border border-white/30 flex flex-col overflow-hidden">
            <div className="p-8 border-b border-black/5 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black">{selected.name}</h2>
                <p className="text-slate-600">This is a live preview of the pattern in a UI context.</p>
              </div>
              <button 
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-8 bg-slate-900 text-blue-300 font-mono text-sm overflow-auto max-h-[400px]">
              <div className="flex justify-between items-center mb-4 text-slate-500 uppercase text-xs tracking-widest">
                <span>Source Code</span>
                <span className="text-green-400">{copied ? 'Copied to clipboard!' : ''}</span>
              </div>
              <pre className="whitespace-pre-wrap">
                {selected.type === 'Tailwind' ? `\n<div className="${selected.className}"></div>` : `/* CSS Rules */\n.custom-pattern {\n${getCSS(selected.style)}\n}`}
              </pre>
            </div>

            <div className="p-8 bg-white/50 flex justify-end gap-4">
               <button 
                onClick={() => copyCode(selected.type === 'Tailwind' ? selected.className : getCSS(selected.style))}
                className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
               >
                 Copy Implementation Code
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl animate-bounce">
          Successfully Copied! 🚀
        </div>
      )}
    </div>
  );
}