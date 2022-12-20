import { Link } from "react-router-dom"
import { useLogout } from "../hooks/user/useLogout"
import { useAuthContext } from "../hooks/user/useAuthContext"

import './Navbar.css'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <header>
      <div className="component-navbar">
        <div className="component-navbar-links">
          <Link to="/">
            <h1>Home</h1>
          </Link>
          {user &&  (<Link to="/collections">
            <h1>Collections</h1>
          </Link>)}
        </div>
        <nav>
          {user && (
            <div>
              <span>{user.user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar