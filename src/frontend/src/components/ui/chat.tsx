// Chat.tsx
import React, { useState } from "react";

// Define a simple Message type with an optional context field as a string.
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  context?: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // A state mapping message id to a boolean indicating if context is shown.
  const [shownContexts, setShownContexts] = useState<{ [id: string]: boolean }>({});

  // Handle textarea changes.
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Toggle context visibility for a given message.
  const toggleContext = (id: string) => {
    setShownContexts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle form submission: send the message to backend and update messages.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Create the user's message.
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Prepare payload for the backend.
    const payload = {
      conversation_id: null,
      message: input,
    };

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/get_openai_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      // Ensure context is stored as a string.
      const contextText =
        data.context && typeof data.context !== "string"
          ? JSON.stringify(data.context, null, 2)
          : data.context;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer,
        context: contextText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
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
          <div
            key={msg.id}
            style={{
              marginBottom: "0.75rem",
              border: "1px solid #eee",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            <strong>{msg.role}:</strong> {msg.content}
            {msg.role === "assistant" && msg.context && (
              <div style={{ marginTop: "0.5rem" }}>
                <button
                  onClick={() => toggleContext(msg.id)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  {shownContexts[msg.id] ? "Hide Context" : "Show Context"}
                </button>
                {shownContexts[msg.id] && (
                  <pre
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.context}
                  </pre>
                )}
              </div>
            )}
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
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
