import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Aside from './components/Aside'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  const [activeContainer, setActiveContainer] = useState(null)

  return (
    <div className="grid-container">
      <Navbar activeContainer={activeContainer} />
      <div className="main-content">
        <Aside />
        <Main onContainerChange={setActiveContainer} />
      </div>
      <Footer />
    </div>
  )
}

export default App
