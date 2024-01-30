// import React from 'react';

import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    
      <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<LoginPage  />}/>
                <Route path="/signup" element={<SignUpPage />}/>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/product-detail" element={<ProductDetailPage />} />
            </Routes>
      </Router>
       
        
      
  );
}

export default App;
