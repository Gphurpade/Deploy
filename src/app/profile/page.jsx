"use client";
import Link from 'next/link';
import {motion} from 'framer-motion';
import { MoveRight } from 'lucide-react';




export default function ProfilePage({ name }) {
  
const ProjectCard = ({ title, category, image, link }) => {
  return (
    <Link href={link} >
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[400px] md:h-[500px] w-full border-t border-white/20 flex flex-col justify-between p-6 transition-colors duration-500 hover:bg-neutral-900/50 cursor-pointer"
    >
        <img src={image} alt="Profile Placeholder" className="w-80 h-80 object-cover rounded-lg" />
      <div className="flex justify-end items-start" >
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
    </Link>
  );
};

 const Gallery = () => {
  const projects = [
    { title: "Website Palette", category: "Color Scraping", image: "/paint-palette-artist-svgrepo-com.svg", link: "/palette"},
    { title: "Pattern Gallery", category: "Design Patterns", image: "/pattern_pic.svg", link: "/patterns" },

  ];

  return (
    <section className="py-32 px-6 md:px-20 bg-black">
      <div className="mb-10">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">My Projects</h1>
        <p className="text-neutral-500 font-mono text-sm tracking-widest">A curated collection of my work and experiments</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
        {projects.map((proj, i) => (
          <ProjectCard key={i} {...proj} index={i} />

        ))}

      </div>
    </section>
  );
};

    return(
      
        <div className="h-screen w-screen text-center bg-red-100 flex flex-col ">
            <div className="mt-25 flex flex-col justify-start items-start w-full px-10 py-5">
            <h1 className="font-bold text-red-300 text-6xl mb-10">Welcome to Your Profile {name}</h1>
            <hr className="w-1/2 border-t border-gray-800"></hr>
                </div>
            <Gallery />
        </div>
    );
}