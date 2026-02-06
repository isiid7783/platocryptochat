import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ChatList from "./components/ChatList"
import ChatWindow from "./components/ChatWindow"
import MessageInput from "./components/MessageInput"

export default function App() {
  const [selectedChat, setSelectedChat] = useState("Alice")

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
            <ChatWindow chat={selectedChat} />
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  )
}
