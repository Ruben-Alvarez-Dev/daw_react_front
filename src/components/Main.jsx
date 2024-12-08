import { useState } from 'react'
import Card1 from './Card1'
import Card2 from './Card2'
import Card3 from './Card3'
import Card4 from './Card4'
import '../styles/Main.css'

const Main = ({ onContainerChange }) => {
  const [activeCard, setActiveCard] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleCardClick = (cardId) => {
    if (activeCard === cardId) {
      return
    }
    setActiveCard(cardId)
    onContainerChange(cardId ? `Contenedor ${cardId}` : null)
  }

  const handleEmployeeUpdate = (updatedEmployee) => {
    setSelectedEmployee(updatedEmployee)
    // Aquí podrías implementar la lógica para actualizar el empleado en la base de datos
    console.log('Empleado actualizado:', updatedEmployee)
  }

  return (
    <main className="display">
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
    </main>
  )
}

export default Main
