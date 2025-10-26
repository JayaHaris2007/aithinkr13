import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from './pages/Login';

import Home from './pages/Home';

import Main from './pages/Main';

import {Guest}  from './pages/Guest';

import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/guest" element={<Guest />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
