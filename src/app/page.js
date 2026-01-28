import FirstButton from "@/components/button";
import Count from "@/components/count";
import Login from "@/app/signup/page"
import Heyyyy from "@/components/card";
import ChangingCard from "@/components/changingCard"
export default function Home() {
 
  console.log(Count);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
         <FirstButton text="hello"/>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left ">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Heyyy There-
          </h1>
          <div className="flex gap-10 w-screen ">
            <Heyyyy name="Text1"/>
            <Heyyyy name="Text2"/>
            <Heyyyy name="Text3"/>
          </div>
          <h1>{10 + 5}</h1>
          <div className="flex gap-6">
            <Count />
            <Count />
            
        </div>
        <ChangingCard id="1"/>
        </div>
         </main>
    </div>   
  );
}
