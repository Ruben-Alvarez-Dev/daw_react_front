import { useView } from '../context/ViewContext';
import DashboardView from '../views/DashboardView';
import UsersView from '../views/UsersView';
import RestaurantsView from '../views/RestaurantsView';
import TablesView from '../views/TablesView';
import ReservationsView from '../views/ReservationsView';
import SettingsView from '../views/SettingsView';
import '../styles/Main.css'

const Main = () => {
  const { activeView } = useView();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'users':
        return <UsersView />;
      case 'restaurants':
        return <RestaurantsView />;
      case 'tables':
        return <TablesView />;
      case 'reservations':
        return <ReservationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="main">
      {renderView()}
    </main>
  )
}

export default Main
