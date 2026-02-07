export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <div
          key={i}
          className={m.from === "Me" ? "message me" : "message"}
        >
          <b>{m.from}:</b> {m.text}
        </div>
      ))}
    </div>
  )
}
