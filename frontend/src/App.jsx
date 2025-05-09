import React from 'react'
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'; 

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

const App = () => {
  return (
    <div>
      { routes}
    </div>
  )
}

export default App
