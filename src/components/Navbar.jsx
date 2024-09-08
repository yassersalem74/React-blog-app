import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-cyan-200">
      <div className="flex-1 text-2xl">
        <Link to="/" className='px-5 py-1 hover:bg-red-200 hover:transition-all'>HOME</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl gap-3">
          <Link to="/login" className='px-5 py-1 hover:bg-red-200 hover:transition-all'>Login</Link>
          <Link to="/sign-up" className='px-5 py-1 hover:bg-red-200 hover:transition-all'>Register</Link>
          {isLoggedIn && (
            <button onClick={handleLogout} className='px-5 py-1 hover:bg-red-200 hover:transition-all'>Logout</button>
          )}
        </ul>
      </div>
    </div>
  );
}