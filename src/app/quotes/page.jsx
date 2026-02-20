"use client";
import { supabase } from "@/lib/supabase/server";
import { useState,useEffect } from "react";
export default function Quote() {
const [q, setQuote]= useState([]);

useEffect(() => {
    const fetchQuotes= async () =>{
        const { data,error} = await supabase
        .from('quotes')
        .select('quote,author')
        if(error){
            console.log(error)
        }else{
            setQuote(data);
           
        }
    }
  fetchQuotes()
  }, []);
    
  return (
    <div className="h-screen w-screen flex justify-center items-center gap-4">
    
      {q && q.map((item,i)=>(
    <div key={i} className="bg-gray-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Quote: {item.quote}</h1>
    <h2>Author: {item.author}</h2>
        </div> 
    ))
    } 

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={()=>{
        console.log("Next Quotes");
       }}>
      Next
    </button>
      </div>  );
       }

