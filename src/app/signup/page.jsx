"use client";

import { useState } from "react";
import Inputtext from "@/components/takeinput";
import Button from "@/components/button";
import { createClient } from "@/lib/supabase/client";
import BackButton from "@/components/backButton";
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const supabase = createClient();

 async function handleSignUp() {
    try {
      setError("");
      setLoading(true);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        // The "options" object is where metadata goes
        options: {
          data: {
            full_name: enteredName, // You can name this key whatever you like
          },
        },
      });

      if (signUpError) {
        setError(`❌ ${signUpError.message}`);
        return;
      }

      setError("✅ Sign up successful! Redirecting...");
      // window.location.href = "/profile"; // Optional: Use router.push if using Next.js navigation
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    console.log("Button Clicked");
    console.log("Entered Name:", enteredName);
    console.log("Email:", email);
    console.log("Password length:", password.length);
  }
  return (
    <div>
      <div className="h-screen w-screen text-center bg-red-100">
        <div className="flex justify-center items-center w-full h-full">
          <BackButton />
          <div className="fixed flex justify-center items-center w-1/2 h-1/2 bg-red-300 rounded-2xl border border-white/20 shadow-lg drop-shadow-2xl backdrop-filter backdrop-blur-md" >
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-4xl mb-10">Sign Up</h1>
              <Inputtext
                id="name"
                name="Enter Your Name: "
                uppercase
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
              />
              <Inputtext
                id="email"
                name="Enter Your email: "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Inputtext
                id="password"
                name="Enter Password: "
                password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <p className="text-white font-bold mt-4 text-sm">{error}</p>
              )}
              <Button
                text={loading ? "Signing up..." : "Sign Up"}
                onClick={handleSignUp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}