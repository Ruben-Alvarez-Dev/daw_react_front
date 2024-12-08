import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CardProvider } from './context/CardContext';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Aside from './components/Aside';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeContainer, setActiveContainer] = useState(null)

  return (
    <BrowserRouter>
      <UserProvider>
        <CardProvider>
          <AppProvider>
            <div className="grid-container">
              <Navbar activeContainer={activeContainer} />
              <div className="main-content">
                <Aside />
                <Main onContainerChange={setActiveContainer} />
              </div>
              <Footer />
            </div>
          </AppProvider>
        </CardProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
