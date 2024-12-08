import { Link } from 'react-router-dom';
import { MdDashboard, MdPeople, MdRestaurant, MdTableBar, MdEventNote, MdSettings } from 'react-icons/md';

const Aside = () => {
  return (
    <aside className="aside">
      <nav className="aside-nav">
        <ul className="aside-menu">
          <li>
            <Link to="/dashboard">
              <MdDashboard /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <MdPeople /> <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/restaurants">
              <MdRestaurant /> <span>Restaurantes</span>
            </Link>
          </li>
          <li>
            <Link to="/tables">
              <MdTableBar /> <span>Mesas</span>
            </Link>
          </li>
          <li>
            <Link to="/reservations">
              <MdEventNote /> <span>Reservas</span>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <MdSettings /> <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
