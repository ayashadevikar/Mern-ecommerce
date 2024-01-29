// import React from 'react';

import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    
      <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<LoginPage  />}/>
                <Route path="/signup" element={<SignUpPage />}/>
            </Routes>
      </Router>
       
        
      
  );
}

export default App;
