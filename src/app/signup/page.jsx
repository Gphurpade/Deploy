import Inputtext from "@/components/takeinput";
import Button from "@/components/button";
export default function LoginPage(){
    return(
    <div>
         <div>
    <h1 className="text-white">This Is Login Page</h1>
  
     <div className="h-screen w-screen text-center bg-red-100">
            <div className="border-2 flex justify-center items-center w-full h-full">
                <div className="fixed flex justify-center items-center w-1/2 h-1/2 bg-red-300 rounded-2xl ">
                    <div className="flex flex-col justify-center items-center ">
                        <h1 className="font-bold text-4xl mb-10">Sign Up</h1>
                        <Inputtext name="Enter Your Name: " uppercase />
                        <Inputtext name="Enter Your email: "/>
                        <Inputtext name="Enter Password: " password/>
                        {/*<label className="text-white font-shadow-xl text-lg tracking-wider" htmlFor="input">Enter Password: </label>
                        <input className="bg-white border-none rounded-full p-1 pl-5 w-80 text-3xl text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 " type="password"/>*/}
                     <Button text="Sign Up" />
                    </div>
                </div>
            </div>
            <h1>
            Login
            </h1>
        </div>
          </div>
    </div>
    );
}