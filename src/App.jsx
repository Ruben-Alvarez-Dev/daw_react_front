import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Aside from './components/Aside'
import Display from './components/Display'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="grid-container">
      <Navbar />
      <Aside />
      <main className="display">
        <div className="display-container">
          <Routes>
            <Route path="/dashboard" element={<h2>Dashboard</h2>} />
            <Route path="/usuarios" element={<h2>Usuarios</h2>} />
            <Route path="/restaurantes" element={<h2>Restaurantes</h2>} />
            <Route path="/mesas" element={<h2>Mesas</h2>} />
            <Route path="/reservas" element={<h2>Reservas</h2>} />
            <Route path="/settings" element={<h2>Settings</h2>} />
            <Route path="/" element={<h2>Bienvenido a La Louche</h2>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
