import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import AddPostForm from './components/AddPostForm';
import EditPostForm from './components/EditPost';
import Error from './components/Error';

function App() {
  return (
    <div className='m-2'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/add" element={<ProtectedRoute><AddPostForm /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditPostForm /></ProtectedRoute>} />
          <Route path="*" element={<Error />} /> {/* This will match any path not matched by previous routes */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;