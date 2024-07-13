import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Guru</h1>
        </Link>
        {/* <img src="https://static.vecteezy.com/system/resources/previews/015/698/881/large_2x/turtle-exercise-cartoon-doodle-kawaii-anime-coloring-page-cute-illustration-drawing-clipart-character-chibi-manga-comics-free-png.png" alt='workout babu' height={90} width={90}/> */}
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
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