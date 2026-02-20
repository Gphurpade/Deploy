'use client';
import Link from 'next/link';

import Takeinput from "@/components/takeinput";
import Button from "@/components/button";
import { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDownRight, MoveRight, Layers, Palette, Code } from 'lucide-react';


// --- Components ---

/*const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  );
};*/

const NoiseBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg className='w-full h-full'>
      <filter id='noiseFilter'>
        <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)' />
    </svg>
  </div>
);

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-1 left-0 w-96 h-96 bg-red-300 rounded-full blur-[120px]" />
      
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 flex gap-6"
      >
        <h1 className="text-[12vw] leading-[0.85] font-serif tracking-tighter mix-blend-difference text-white">
          palette <br />
          <span className="italic font-light text-neutral-400">SCRAPER</span>
        </h1>
        <div className=" flex flex-col items-center justify-end w-full">
      <Link href="/signup" className="mt-6">
        <button className="bg-black text-3xl w-60 font-mono border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all cursor-pointer">
            Explore
          </button>
      </Link>
                  </div>

      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex justify-between items-end mt-12 z-10"
      >
        <div className="w-64 text-sm text-black font-mono">
          <p>A studio of creators, coders, and dreamers.</p>
        </div>
        
          
      
          <p className="text-xl md:text-2xl font-bold text-white max-w-md ml-auto">
                        We craft digital experiences that blur the line between utility and art.
          </p>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/50"
      >
        <ArrowDownRight size={32} />
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ title, category, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[400px] md:h-[500px] w-full border-t border-white/20 flex flex-col justify-between p-6 transition-colors duration-500 hover:bg-neutral-900/50 cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs text-neutral-500">0{index + 1}</span>
        <motion.div 
          className="bg-white text-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1, rotate: -45 }}
        >
          <MoveRight size={16} />
        </motion.div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-4xl md:text-6xl font-serif text-neutral-300 group-hover:text-white transition-colors duration-300 mix-blend-difference">
          {title}
        </h3>
        <p className="text-neutral-500 mt-2 font-mono uppercase text-xs tracking-widest group-hover:text-neutral-400">
          {category}
        </p>
      </div>

      {/* Abstract Hover Visual */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-blue-900/0 group-hover:from-purple-900/10 group-hover:to-blue-900/10 transition-all duration-700 pointer-events-none" />
    </motion.div>
  );
};


const Marquee = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-white text-black py-12">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        {[...Array(4)].map((_, i) => (
          <h2 key={i} className="text-[8vw] font-bold uppercase tracking-tighter px-4">
            Create • Innovate • Disrupt • Ascend • 
          </h2>
        ))}
      </motion.div>
    </div>
  );
};

const Philosophy = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <section id="about"className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center opacity-10">
         <div className="mt-40 w-[800px] h-[800px] border-[100px] border-neutral-800 rounded-full" />

      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl z-10">
        <h1 className="text-5xl font-bold font-serif text-neutral-800 max-w-md">About Us</h1> 
        <div className="group space-y-6 md:mt-24 bg-white/20 border border-white/20 shadow-lg backdrop-filter backdrop-blur-md p-6 rounded-lg hover:bg-black/20 transition-colors">
          <Palette className="w-12 h-12 text-purple-400" />
          <h3 className="text-3xl font-bold font-serif text-neutral-800">Color Finder</h3>
          <p className="text-neutral-400 font-light leading-relaxed group-hover:text-white transition-colors">
            Get the color scheme of any website with a single click. Our scraper extracts the essence of design, giving you the palette that inspires.
          </p>
        </div>
        <div className="group space-y-6 md:mt-24 bg-white/20 border border-white/20 shadow-lg backdrop-filter backdrop-blur-md p-6 rounded-lg hover:bg-black/20 transition-colors">
          <Code className="w-12 h-12 text-blue-400" />
          <h3 className="text-3xl font-bold font-serif text-neutral-800">Pattern Code</h3>
          <p className="text-neutral-400 font-light leading-relaxed group-hover:text-white transition-colors">
            Choose Pattern you like and copy the CSS code to use in your project.
            We provide patterns that can be easily integrated into your designs, adding depth and texture with just a few lines of code.
          </p>
        </div>
        
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className=" flex flex-col justify-between p-6 md:p-20 bg-neutral-900 text-neutral-400">
    <div className="text-6xl md:text-9xl font-serif text-neutral-800 select-none">
      Let's Build Something <span className="text-red-300">Beautiful</span> Together.
    </div>
    
    <div className="flex justify-end items-end border-t border-neutral-800 pt-8">
      <p className="text-xs">© 2026  sitePALETTE</p>
    </div>
  </footer>
);

// --- Main Page ---

export default function LandingPage() {

  return (
    <main className="bg-red-100 min-h-screen text-white selection:bg-purple-500 selection:text-white overflow-hidden">
      <NoiseBackground />
      
      {/* Navigation (Minimal) */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-20 flex justify-between items-center z-50 mix-blend-difference">
        <span className="font-bold tracking-tighter text-xl">sitePALETTE</span>
        <div className="flex justify-between items-center w-1/7">
          <div className="flex">
             <Link href="#about" className="hover:text-white/50 duration-500">About</Link>   
          </div>
          <div className="flex">
             <Link href="/signin" className="hover:text-white/50 duration-500">Login</Link>  
          </div>
        </div>
         
      </nav>

      <Hero />
      <Philosophy />
     
      <Footer />
    </main>
  );
}