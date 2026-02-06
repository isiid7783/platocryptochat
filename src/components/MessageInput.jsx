import { useState } from "react"

export default function MessageInput() {
  const [text, setText] = useState("")

  function send() {
    if (!text) return
    console.log("Send:", text)
    setText("")
  }

  return (
    <div className="input-area">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={send}>Send</button>
    </div>
  )
}
