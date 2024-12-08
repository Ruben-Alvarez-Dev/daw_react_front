import React, { useState } from 'react';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import Card3 from '../components/Card3';
import Card4 from '../components/Card4';
import '../styles/Views.css';

const DashboardView = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleCardClick = (cardId) => {
    if (activeCard === cardId) {
      return;
    }
    setActiveCard(cardId);
  };

  const handleEmployeeUpdate = (updatedEmployee) => {
    setSelectedEmployee(updatedEmployee);
    console.log('Empleado actualizado:', updatedEmployee);
  };

  return (
    <div className="dashboard-view">
      <div className="display-container">
        <Card1 
          isActive={activeCard === 1}
          onClick={() => handleCardClick(1)}
        />
        <Card2 
          isActive={activeCard === 2}
          onClick={() => handleCardClick(2)}
        />
        <Card3 
          isActive={activeCard === 3}
          onClick={() => handleCardClick(3)}
          onEmployeeSelect={setSelectedEmployee}
        />
        <Card4 
          isActive={activeCard === 4}
          onClick={() => handleCardClick(4)}
          selectedEmployee={selectedEmployee}
          onEmployeeUpdate={handleEmployeeUpdate}
        />
      </div>
    </div>
  );
};

export default DashboardView;
