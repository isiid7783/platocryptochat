import { useState } from "react"

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("")

  function handleSend() {
    if (!text) return
    onSend(text)
    setText("")
  }

  return (
    <div className="input-area">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

