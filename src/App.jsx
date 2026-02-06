import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ChatList from "./components/ChatList"
import ChatWindow from "./components/ChatWindow"
import MessageInput from "./components/MessageInput"
import { createSocket } from "./socket"
import { saveMessages, loadMessages } from "./messageStore"

export default function App() {

  const [me] = useState(
    localStorage.getItem("me") || prompt("Your name")
  )

  const [selectedChat, setSelectedChat] = useState("Alice")
  const [messages, setMessages] = useState(
    loadMessages("Alice")
  )

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    localStorage.setItem("me", me)

    const ws = createSocket(me, (data) => {
      if (data.from === selectedChat) {
        const updated = [...messages, {
          from: data.from,
          text: data.text
        }]
        setMessages(updated)
        saveMessages(selectedChat, updated)
      }
    })

    setSocket(ws)
  }, [])

  useEffect(() => {
    setMessages(loadMessages(selectedChat))
  }, [selectedChat])

  function sendMessage(text) {
    if (!text || !socket) return

    const payload = {
      type: "message",
      from: me,
      to: selectedChat,
      text
    }

    socket.send(JSON.stringify(payload))

    const updated = [...messages, {
      from: "Me",
      text
    }]

    setMessages(updated)
    saveMessages(selectedChat, updated)
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header name={selectedChat} />
        <div className="chat-area">
          <ChatList
            selected={selectedChat}
            onSelect={setSelectedChat}
          />
          <div className="conversation">
            <ChatWindow messages={messages} />
            <MessageInput onSend={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}
