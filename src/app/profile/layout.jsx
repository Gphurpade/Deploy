"use client"
import DropdownMenu from "@/components/dropdownMenu";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";


export default function LoggedInUsers({ children }) {
  return (
    
    <div className="flex w-screen h-screen">
<div className="fixed flex items-center justify-end font-bold w-screen bg-transparent h-15">
          <div className="flex w-1/3 justify-around text-white items-end cursor-pointer">
              
        <div className="hidden md:block text-xs font-mono border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black dropbtn">
           <DropdownMenu />  
        </div>
                                            
          </div>
        </div>
            {children}
    </div>
        
    
  );
}
