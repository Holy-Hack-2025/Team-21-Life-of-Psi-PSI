// src/chat/page.tsx
"use client"

import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";

export function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, stop } = useChat({});
  const filteredMessages = messages.filter(
    (msg) => msg.role === "user" || msg.role === "assistant"
  );
  return (
    <Chat
      messages={filteredMessages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={false}
      stop={stop}
    />
  );
}
