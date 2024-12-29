import { useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Contact from './Pages/Contact';
import DetailedPage from './Pages/DetailedPage';
import Home from './Pages/HomePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/detailed" element={<DetailedPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
