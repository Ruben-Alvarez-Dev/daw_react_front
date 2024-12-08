import '../styles/Navbar.css'

const Navbar = ({ activeContainer }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mi App</div>
      {activeContainer && (
        <div className="active-container">
          {activeContainer}
        </div>
      )}
    </nav>
  )
}

export default Navbar
