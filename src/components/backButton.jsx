import { motion } from 'framer-motion';
import { MoveRight, ArrowRight,ArrowLeft } from 'lucide-react';
export default function BackButton() {
    return (
        <div className=" absolute top-5 left-5 ">
            <div className="flex justify-center items-center">       
            <a href="/" className="bg-black hidden md:block text-xs font-mono border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all cursor-pointer">
              <ArrowLeft className="inline mr-2" size={16} /> Back to Home
            </a>
            </div>
        </div>
    );
}