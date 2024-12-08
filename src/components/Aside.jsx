import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdPeople, MdRestaurant, MdTableBar, MdEventNote, MdSettings } from 'react-icons/md';
import { useView } from '../context/ViewContext';
import '../styles/Aside.css';

const Aside = () => {
  const { setActiveView } = useView();
  const navigate = useNavigate();

  const handleNavClick = (e, view, path) => {
    e.preventDefault();
    setActiveView(view);
    navigate(path);
  };

  return (
    <aside className="aside">
      <nav className="aside-nav">
        <ul className="aside-menu">
          <li>
            <a href="#" onClick={(e) => handleNavClick(e, 'dashboard', '/dashboard')}>
              <MdDashboard /> <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNavClick(e, 'users', '/users')}>
              <MdPeople /> <span>Usuarios</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNavClick(e, 'restaurants', '/restaurants')}>
              <MdRestaurant /> <span>Restaurantes</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNavClick(e, 'tables', '/tables')}>
              <MdTableBar /> <span>Mesas</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNavClick(e, 'reservations', '/reservations')}>
              <MdEventNote /> <span>Reservas</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNavClick(e, 'settings', '/settings')}>
              <MdSettings /> <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
