"use client";

export default function Input(props) {
  return (
    <div className="mb-5">
      <form>
        <label className="text-white font-shadow-xl text-lg tracking-wider">
        {props.name}
      </label>

      <input
        id={props.id}
        type={props.password ? "password" : "text"}
        value={props.value || ""}
        onChange={props.onChange}
        className={`bg-white border-none rounded-full p-2 pl-5 w-80 
                    text-red-400 focus:outline-none focus:ring-2 
                    focus:ring-red-400 
                    ${props.uppercase ? "uppercase" : ""}`}
      />
      </form>
      
    </div>
  );
}
