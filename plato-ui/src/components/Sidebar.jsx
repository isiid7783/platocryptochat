export default function Sidebar({ me, friends, selected, onSelect, onAddFriend }) {
  return (
    <div className="sidebar">
      <h2>{me}</h2>
      <button onClick={onAddFriend}>Add Friend</button>

      <div className="friend-list">
        {friends.map(f => (
          <div
            key={f}
            className={selected === f ? "friend active" : "friend"}
            onClick={() => onSelect(f)}
          >
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}
