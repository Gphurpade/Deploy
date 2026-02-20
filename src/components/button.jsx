"use client";

export default function button(name){
    return (<div className="display:flex content-center mt-5">
            <h1 onClick={name.onClick} className="display:flex content-center text-center text-xl text-red-200 hover:bg-red-100 cursor-pointer rounded-xl hover: duration-500 bg-black px-5 py-2 font-bold">
            {name.text}
            </h1>
    </div> );
}