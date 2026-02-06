import { useState } from "react"

export default function ChatWindow({ chat }) {
  const [messages] = useState([
    { from: chat, text: "Hello" },
    { from: "Me", text: "Hi there." }
  ])

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
