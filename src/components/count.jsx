"use client";
import {useState} from "react";
export default function Count() {
  const [count, setCount] = useState(0);

  const inc = () => {
    setCount(count + 1);
  };

  const dec = () => {
    if (count > 0) {
      //for(let i=0;i<5;i++) //use of previous state in reactJS
      setCount(prev=>prev - 1);
    }
  };

  return (
    <div className="flex gap-6">
      <button
        className="py-3 px-5 bg-red-200 cursor-pointer"
        onClick={dec}
      >
        -
      </button>

      <h1 className="pt-3">{count}</h1>

      <button
        className="py-3 px-5 bg-green-200 cursor-pointer"
        onClick={inc}
      >
        +
      </button>
    </div>
  );
}