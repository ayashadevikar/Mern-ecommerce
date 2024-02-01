
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import Home from './component/layout/Home';

function App() {
  return (
    <>
       <Router>
            <Header />
            <Routes>
                 <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
       </Router>
       
    </>
  );
}

export default App;
