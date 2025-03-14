"use client"

import { useChat } from "@ai-sdk/react"
 
import { Chat } from "@/components/ui/chat"
 
export function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, stop } = useChat({})
 
  return (
    <Chat
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={false}
      stop={stop}
    />
  )
}
