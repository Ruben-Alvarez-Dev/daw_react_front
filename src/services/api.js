const API_URL = 'http://localhost:3005';

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Error fetching users');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) throw new Error('Error fetching user');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getRestaurants = async () => {
  try {
    const response = await fetch(`${API_URL}/restaurants`);
    if (!response.ok) throw new Error('Error fetching restaurants');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getTables = async () => {
  try {
    const response = await fetch(`${API_URL}/tables`);
    if (!response.ok) throw new Error('Error fetching tables');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const response = await fetch(`${API_URL}/reservations`);
    if (!response.ok) throw new Error('Error fetching reservations');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
