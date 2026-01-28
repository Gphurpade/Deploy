"use client";
import { supabase } from "@/lib/supabase/server";
import { useState } from "react";
import { askGemini } from "./server";

export default function Home() {
   /*const { data } = await supabase
    .from("chat_messages")
    .select("*")
    .order("created_at", { ascending: false });*/
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);

    // send new question + old chat to server
    const answer = await askGemini(input, history);

    setResponse(answer);

    // save conversation in browser memory
    setHistory(prev =>
      prev.concat({ question: input, answer: answer })
    );

    setLoading(false);
  };

  return (
    <div style={{ padding: "50px",   }}>
      <input
      style={{marginTop: "100px"}}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI..."
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      <p>{response}</p>

      <ul>
        {history.map((item, i) => (
          <li key={i}>
            <b>You:</b> {item.question}<br />
            <b>AI:</b> {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
