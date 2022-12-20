import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Collections from './pages/Collections'

import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/collections"
              element={<Collections />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
