export default function Header({ name }) {
  return (
    <div className="header">
      <h3>{name || "No chat selected"}</h3>
      {name && <span className="status">Online</span>}
    </div>
  )
}
