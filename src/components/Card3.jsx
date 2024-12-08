import { useState } from 'react';
import Card from './Card';
import List from './List';
import '../styles/Card.css';

const Card3 = ({ isActive, onClick, onEmployeeSelect }) => {
  const [activeItem, setActiveItem] = useState(null);
  
  const items = [
    {
      id: 1,
      nombre: "Juan Pérez",
      edad: 28,
      profesion: "Desarrollador",
      departamento: "IT",
      salario: 45000,
      fechaContrato: "2023-01-15",
      proyecto: "Sistema ERP",
      nivel: "Senior",
      ubicacion: "Madrid",
      estado: "Activo",
      email: "juan.perez@empresa.com",
      telefono: "+34 666 555 444"
    },
    {
      id: 2,
      nombre: "Ana García",
      edad: 32,
      profesion: "Diseñadora UX",
      departamento: "Diseño",
      salario: 42000,
      fechaContrato: "2022-08-20",
      proyecto: "App Móvil",
      nivel: "Mid-Senior",
      ubicacion: "Barcelona",
      estado: "Activo",
      email: "ana.garcia@empresa.com",
      telefono: "+34 677 888 999"
    },
    {
      id: 3,
      nombre: "Carlos Ruiz",
      edad: 25,
      profesion: "Analista",
      departamento: "Data",
      salario: 35000,
      fechaContrato: "2023-03-10",
      proyecto: "BI Dashboard",
      nivel: "Junior",
      ubicacion: "Valencia",
      estado: "Activo",
      email: "carlos.ruiz@empresa.com",
      telefono: "+34 644 333 222"
    },
    {
      id: 4,
      nombre: "Laura Martín",
      edad: 35,
      profesion: "Project Manager",
      departamento: "Gestión",
      salario: 52000,
      fechaContrato: "2021-11-05",
      proyecto: "CRM Enterprise",
      nivel: "Senior",
      ubicacion: "Sevilla",
      estado: "Activo",
      email: "laura.martin@empresa.com",
      telefono: "+34 655 777 888"
    },
    {
      id: 5,
      nombre: "David López",
      edad: 29,
      profesion: "DevOps",
      departamento: "IT",
      salario: 48000,
      fechaContrato: "2022-06-15",
      proyecto: "Cloud Migration",
      nivel: "Senior",
      ubicacion: "Madrid",
      estado: "Activo",
      email: "david.lopez@empresa.com",
      telefono: "+34 633 444 555"
    }
  ];

  const handleItemClick = (index) => {
    setActiveItem(index === activeItem ? null : index);
    if (onEmployeeSelect) {
      onEmployeeSelect(index === activeItem ? null : items[index]);
    }
  };

  return (
    <Card 
      headerLeft="Lista de Empleados"
      headerRight={`${activeItem !== null ? items[activeItem].id : 'N/A'}`}
      bodyTop="Información detallada del personal"
      bodyCenter={
        <List
          items={items}
          activeItem={activeItem}
          onItemClick={handleItemClick}
          isCardActive={isActive}
        />
      }
      bodyBottom={`Total: ${items.length} empleados`}
      footerLeft="Estado"
      footerRight={activeItem !== null ? items[activeItem].estado : 'No seleccionado'}
      isActive={isActive}
      onClick={onClick}
    />
  );
};

export default Card3;
