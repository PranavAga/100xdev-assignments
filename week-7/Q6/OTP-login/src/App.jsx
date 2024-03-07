import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPLogin from './components/OTPLogin';
import Home from './components/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<OTPLogin/>}
        />
        <Route
          path='/home'
          element={<Home/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
