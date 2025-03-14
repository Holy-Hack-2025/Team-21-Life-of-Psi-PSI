// Instead of defining your own UIMessage type, import it:
import type { UIMessage } from "@ai-sdk/ui-utils";

export interface ChatProps {
  messages: UIMessage[];
  input: string;
  handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  handleSubmit: (
    event?: React.FormEvent | { preventDefault: () => void },
    options?: any
  ) => void;
  isGenerating: boolean;
  stop: () => void;
}

// Your Chat component remains as before:
export const Chat: React.FC<ChatProps> = ({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isGenerating,
  stop,
}) => {
  return (
    <div className="chat-container">
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.role}:</strong> {msg.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={handleInputChange} />
        <button type="submit">
          {isGenerating ? "Generating..." : "Send"}
        </button>
      </form>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
