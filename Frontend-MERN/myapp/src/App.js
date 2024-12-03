import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import RegistrationForm from "./RegistrationForm";
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <div className="App dark:bg-black">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            {/* You can add more routes here for other pages like home, dashboard, etc. */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
