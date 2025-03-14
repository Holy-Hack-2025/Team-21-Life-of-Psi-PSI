// Chat.tsx
import React, { useState } from "react";

// Define a simple Message type
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle the change in the textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handle form submission: send the message to backend and update the messages list.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Create the user's message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    // Update state with the new user message
    setMessages((prev) => [...prev, userMessage]);

    // Prepare payload for the backend
    // Note: In this simple example, we send conversation_id as null (new conversation).
    const payload = {
      conversation_id: null,
      message: input,
    };

    // Clear the input and set loading
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/get_openai_answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Assume the backend returns an object with an "answer" field
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
      // Optionally, add an error message to the chat
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        fontFamily: "sans-serif",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Chat Interface</h2>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "1rem",
          height: "300px",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: "0.75rem" }}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div>Assistant is typing...</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{ width: "100%", height: "80px", padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
