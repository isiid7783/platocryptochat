export default function Header({ name }) {
  return (
    <div className="header">
      <h2>{name}</h2>
      <div className="status">Encrypted</div>
    </div>
  )
}
