import Card from './Card';
import Form from './Form';
import Button from './Button';
import '../styles/Card.css';

const Card4 = ({ isActive, onClick, selectedEmployee, onEmployeeUpdate }) => {
  const handleSave = (updatedData) => {
    if (onEmployeeUpdate) {
      onEmployeeUpdate(updatedData);
    }
  };

  return (
    <Card 
      headerLeft="Editar Empleado"
      headerRight={selectedEmployee ? `#${selectedEmployee.id}` : '-'}
      bodyTop="Formulario de edición"
      bodyCenter={
        <Form
          data={selectedEmployee}
          onSave={handleSave}
          isCardActive={isActive}
        />
      }
      bodyBottom={selectedEmployee ? `Editando: ${selectedEmployee.nombre}` : 'Esperando selección...'}
      footerLeft="Estado"
      footerRight={selectedEmployee ? 'Editando' : 'Inactivo'}
      footerCenter={
        <>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Delete</Button>
        </>
      }
      isActive={isActive}
      onClick={onClick}
    />
  );
};

export default Card4;
