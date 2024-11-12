import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/login" element={<Login />} />
            {/* You can add more routes here for other pages like home, dashboard, etc. */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
