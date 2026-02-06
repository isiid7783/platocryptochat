export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <div
          key={i}
          className={m.from === "Me" ? "message me" : "message"}
        >
          {m.text}
        </div>
      ))}
    </div>
  )
}
