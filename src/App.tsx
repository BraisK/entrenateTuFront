import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserList from './pages/UserList'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Trains from './pages/TrainsList'
import TrainForm from './pages/TrainForm'
import TrainDetail from './pages/TrainDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col">
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex grow justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userList" element={<UserList />} />
              <Route path="/trains" element={<Trains />} />
              <Route path="/trains/:id" element={<TrainDetail />} />
              <Route path="/trains/new" element={<TrainForm />} />
              <Route path="/trains/edit/:id" element={<TrainForm />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App