import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Peliculas from './components/Peliculas';
import DetallesPeliculas from './components/DetallesPeliculas';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Peliculas />} />
        <Route path="/film/:id" element={<DetallesPeliculas />} />
      </Routes>
    </Router>
  );
}

export default App;
