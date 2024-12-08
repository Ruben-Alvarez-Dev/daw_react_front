import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CardProvider } from './context/CardContext';
import { AppProvider } from './context/AppContext';
import { ViewProvider } from './context/ViewContext';
import Navbar from './components/Navbar';
import Aside from './components/Aside';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ViewProvider>
        <UserProvider>
          <CardProvider>
            <AppProvider>
              <div className="grid-container">
                <Navbar />
                <div className="main-content">
                  <Aside />
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Main />} />
                    <Route path="/users" element={<Main />} />
                    <Route path="/restaurants" element={<Main />} />
                    <Route path="/tables" element={<Main />} />
                    <Route path="/reservations" element={<Main />} />
                    <Route path="/settings" element={<Main />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </AppProvider>
          </CardProvider>
        </UserProvider>
      </ViewProvider>
    </BrowserRouter>
  )
}

export default App
