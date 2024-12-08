import { useCard } from '../context/CardContext';
import Card from '../components/Card';
import '../styles/views/Users.css';

const Users = () => {
  const { activeCard, updateActiveCard } = useCard();

  return (
    <div className="cards-container">
      <Card
        header={<h2>User Management</h2>}
        body={
          <div>
            <p>Manage your users here</p>
            <p>Total users: 4</p>
          </div>
        }
        footer={<button className="custom-button primary">Add User</button>}
        isActive={activeCard.id === 'management'}
        onActivate={() => updateActiveCard('management', 'User Management')}
      />
      <Card
        header={<h2>User Statistics</h2>}
        body={
          <div>
            <p>Active users: 3</p>
            <p>Admins: 1</p>
            <p>Supervisors: 1</p>
            <p>Customers: 2</p>
          </div>
        }
        footer={<button className="custom-button success">View Details</button>}
        isActive={activeCard.id === 'statistics'}
        onActivate={() => updateActiveCard('statistics', 'User Statistics')}
      />
      <Card
        header={<h2>User Activity</h2>}
        body={
          <div>
            <p>Recent Actions:</p>
            <p>• New login: Admin (2min ago)</p>
            <p>• Profile updated: John (5min ago)</p>
            <p>• Password changed: Sarah (10min ago)</p>
            <p>• Role updated: Mike (15min ago)</p>
          </div>
        }
        footer={<button className="custom-button warning">View All Activity</button>}
        isActive={activeCard.id === 'activity'}
        onActivate={() => updateActiveCard('activity', 'User Activity')}
      />
    </div>
  );
};

export default Users;
