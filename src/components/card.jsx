export default function Card(props){
    return(
        <div className="flex flex-col justify-center w-40 h-40 items-center rounded-xl bg-gradient-to-b from-red-200 to-violet-200 drop-shadow-xl font-bold ">
             <h1 className=" bg-clip-text text-transparent text-2xl bg-gradient-to-t from-red-800 to-red-200">Hello {props.name}!!
             </h1>
             <button className="mt-5 bg-white p-2 rounded-full cursor-pointer hover:shadow-lg duration-400 text-inherit text-current ">Click</button>
        </div>
       
    )
}