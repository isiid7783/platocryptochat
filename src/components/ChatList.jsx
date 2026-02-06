export default function ChatList({ selected, onSelect }) {
  const chats = ["Alice", "Bob", "Charlie"]

  return (
    <div className="chat-list">
      {chats.map(name => (
        <div
          key={name}
          className={selected === name ? "chat-item active" : "chat-item"}
          onClick={() => onSelect(name)}
        >
          {name}
        </div>
      ))}
    </div>
  )
}
