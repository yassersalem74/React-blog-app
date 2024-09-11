
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Logout from './components/Logout'
import ProtectedRoute from './components/ProtectedRoute'
import AddPostForm from './components/AddPostForm'
import EditPostForm from './components/EditPost'

function App() {

  return (
    <div className='m-2'>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/sign-up' element={<Registration />}></Route>
          <Route path="/logout" element={<Logout />} />
          <Route path="/add" element={<ProtectedRoute><AddPostForm /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditPostForm /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
