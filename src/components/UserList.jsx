import { useState, useMemo } from 'react';
import Card from './Card';
import List from './List';
import SearchBar from './SearchBar';
import Button from './Button';
import { useUser } from '../context/UserContext';
import './UserList.css';

const UserListItem = ({ item }) => (
  <div className="user-list-item">
    <div className="user-list-item-line1">
      <span>{item.name}</span>
      <span>{item.email}</span>
      <span>{item.phone}</span>
    </div>
    <div className="user-list-item-line2">
      <span>{item.address}</span>
      <span>{item.location}</span>
      <span>{item.zip}</span>
      <span>{item.role}</span>
    </div>
  </div>
);

const UserList = ({ isActive, onClick, onUserSelect, onNewUser, users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedUser, selectUser } = useUser();

  const handleItemClick = (item) => {
    // Si el item ya está seleccionado, lo deseleccionamos
    const newItem = selectedUser?.id === item.id ? null : item;
    selectUser(newItem);
    if (onUserSelect) {
      onUserSelect(newItem);
    }
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return users;
    
    return users.filter(user => {
      const searchFields = [
        user.name,
        user.email,
        user.phone,
        user.location
      ];
      
      return searchFields.some(field => 
        field?.toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);

  const renderContent = () => {
    if (!users || users.length === 0) {
      return (
        <div className="list-message">
          No users available
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <div className="list-message">
          No users match your search
        </div>
      );
    }

    return (
      <List
        items={filteredUsers}
        selectedItem={selectedUser}
        onItemClick={handleItemClick}
        renderItem={(item) => <UserListItem item={item} />}
      />
    );
  };

  return (
    <Card 
      headerLeft="User List"
      headerRight={
        <Button
          variant="primary"
          onClick={() => onNewUser && onNewUser()}
        >
          New User
        </Button>
      }
      bodyTop={
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      }
      bodyCenter={renderContent()}
      footerLeft={
        selectedUser 
          ? `Selected: ${selectedUser.name} (ID: ${selectedUser.id})`
          : 'No user selected'
      }
      footerRight={selectedUser ? `ID: ${selectedUser.id}` : ''}
      isActive={isActive}
      onClick={onClick}
    />
  );
};

export default UserList;
