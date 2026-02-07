import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ChatList from "./components/ChatList"
import ChatWindow from "./components/ChatWindow"
import MessageInput from "./components/MessageInput"
import { createSocket } from "./socket"
import { loadUser, saveUser } from "./store/userStore"
import { loadFriends, addFriend } from "./store/friendStore"
import { loadMessages, saveMessages } from "./store/messageStore"

export default function App() {

  const [me, setMe] = useState(loadUser())
  const [friends, setFriends] = useState(loadFriends())
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!me) {
      const name = prompt("Choose username")
      saveUser(name)
      setMe(name)
    }
  }, [])

  useEffect(() => {
    if (!me) return

    const ws = createSocket(me, (data) => {
      if (data.from === selected) {
        const updated = [...messages, {
          from: data.from,
          text: data.text
        }]
        setMessages(updated)
        saveMessages(selected, updated)
      }
    })

    setSocket(ws)
  }, [me, selected])

  useEffect(() => {
    if (selected) {
      setMessages(loadMessages(selected))
    }
  }, [selected])

  function handleAddFriend() {
    const name = prompt("Friend username")
    if (!name) return
    addFriend(name)
    setFriends(loadFriends())
  }

  function sendMessage(text) {
    if (!text || !selected || !socket) return

    const payload = {
      type: "message",
      from: me,
      to: selected,
      text
    }

    socket.send(JSON.stringify(payload))

    const updated = [...messages, {
      from: "Me",
      text
    }]

    setMessages(updated)
    saveMessages(selected, updated)
  }

  return (
    <div className="app">
      <Sidebar
        me={me}
        friends={friends}
        selected={selected}
        onSelect={setSelected}
        onAddFriend={handleAddFriend}
      />
      <div className="main">
        <Header name={selected} />
        {selected ? (
          <>
            <ChatWindow messages={messages} />
            <MessageInput onSend={sendMessage} />
          </>
        ) : (
          <div style={{padding:20}}>Select a friend</div>
        )}
      </div>
    </div>
  )
}

