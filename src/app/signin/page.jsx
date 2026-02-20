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

async function handleSignIn() {
  try {
    setError('')

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (signInError) {
      setError(`❌ ${signInError.message}`)
      return
    }

    setError('✅ Sign in successful! Redirecting...')
    window.location.href = '/profile'

  } catch (err) {
    setError(`❌ ${err.message}`)
  }
}


  function handleClick() {
    console.log("Button Clicked");
    console.log("Entered Name:", );
    console.log("Email:", email);
    console.log("Password length:", password.length);
  }
  return (
    <div>
      <div className="h-screen w-screen text-center bg-red-100">
        <BackButton />
        <div className="flex justify-center items-center w-full h-full">
          <div className="fixed flex justify-center items-center w-1/2 h-1/2 bg-red-300 rounded-2xl border border-white/20 shadow-lg drop-shadow-2xl backdrop-filter backdrop-blur-md" >
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-4xl mb-10">Sign In</h1>
              <Inputtext
                id="name"
                name="Enter Your Email: "
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
                text={loading ? "Signing in..." : "Sign In"}
                onClick={handleSignIn}
              />
              <p className="mt-4">Don't have an account? <a href="/signup" className="text-white underline">Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}