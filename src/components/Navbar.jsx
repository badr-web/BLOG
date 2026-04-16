import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Blog</h1>
      <button className="btn btn-create" onClick={() => navigate('/create')}>
        Create New
      </button>
    </nav>
  )
}

export default Navbar
