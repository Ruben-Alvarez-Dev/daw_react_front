import { useCard } from '../context/CardContext';
import Card from '../components/Card';
import '../styles/Users.css';

const Users = () => {
  const { activeCard, updateActiveCard } = useCard();

  return (
    <div className="cards-container">
      <Card
        header={<h2>User Management</h2>}
        body={
          <div>
            <h3>Overview</h3>
            <p>Manage your users here</p>
            <p>Total users: 4</p>
            <p>Active users: 3</p>
            <p>Inactive users: 1</p>

            <h3>User Categories</h3>
            <p>Administrators: 2</p>
            <p>Regular users: 2</p>
            <p>Premium users: 0</p>
            <p>Trial users: 1</p>
            <p>Banned users: 0</p>

            <h3>Recent Activity</h3>
            <p>New users today: 1</p>
            <p>Logins today: 15</p>
            <p>Failed login attempts: 3</p>
            <p>Password resets: 2</p>
            <p>Profile updates: 5</p>

            <h3>System Status</h3>
            <p>System uptime: 15 days</p>
            <p>Last backup: Today 03:00 AM</p>
            <p>Database status: Online</p>
            <p>API status: Operational</p>
            <p>Cache status: Optimized</p>

            <h3>Security Overview</h3>
            <p>Two-factor enabled users: 2</p>
            <p>Security incidents: 0</p>
            <p>Pending security reviews: 1</p>
            <p>Last security scan: 2 hours ago</p>
            <p>Vulnerabilities detected: None</p>

            <h3>Pending Tasks</h3>
            <p>User approvals: 3</p>
            <p>Role change requests: 2</p>
            <p>Access requests: 4</p>
            <p>Support tickets: 1</p>
            <p>Bug reports: 0</p>

            <h3>Compliance</h3>
            <p>GDPR compliant users: 100%</p>
            <p>Privacy policy accepted: 100%</p>
            <p>Terms updated: 2 days ago</p>
            <p>Data retention check: Passed</p>
            <p>Audit logs: Up to date</p>
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
