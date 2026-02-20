"use client";
import {useState} from "react";

export default function state (props){
    const [count,setCount]=useState(1)
    const a=function updateCard(){
       // if(count<5)
           return setCount(count+1)
    }

    return(
        <div className="flex h-60 w-60 bg-green-300 rounded-xl shadow-2xl">
            <button onClick={() => updateCard(
                id=count, ClassName="visible"
            )}>Next {count}</button>
           <div id="1" className="text-red-600 bg-white w-3/4">{count}</div>
            <div id="2" className="hidden">def</div>
            <div id="3" className="hidden">ABC</div>
        </div>
    );
}