import { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const Profesores = () => {
  // Initial professors data
  const [professors, setProfessors] = useState([
    { 
      id: "12345678",
      nombre: "Juan", 
      apellido: "Pérez", 
      cc: "12345678", 
      telefono: "3001234567", 
      direccion: "Calle 10 #20-30", 
      especialidad: "Guitarra Clásica", 
      estado: true 
    },
    { 
      id: "87654321",
      nombre: "Maria", 
      apellido: "Gómez", 
      cc: "87654321", 
      telefono: "3023456789", 
      direccion: "Carrera 5 #15-25", 
      especialidad: "Piano Básico", 
      estado: true 
    },
    { 
      id: "11223344",
      nombre: "Carlos", 
      apellido: "Sánchez", 
      cc: "11223344", 
      telefono: "3203456781", 
      direccion: "Av. Siempre Viva #100", 
      especialidad: "Violín Intermedio", 
      estado: true 
    },
    { 
      id: "55667788",
      nombre: "Laura", 
      apellido: "Méndez", 
      cc: "55667788", 
      telefono: "3014567890", 
      direccion: "Calle 8 #12-22", 
      especialidad: "Canto Avanzado", 
      estado: true 
    },
    { 
      id: "33887766",
      nombre: "Andrés", 
      apellido: "Suárez", 
      cc: "33887766", 
      telefono: "3025678901", 
      direccion: "Carrera 7 #14-16", 
      especialidad: "Flauta Dulce", 
      estado: true 
    },
    { 
      id: "22445566",
      nombre: "Felipe", 
      apellido: "Gutiérrez", 
      cc: "22445566", 
      telefono: "3116789012", 
      direccion: "Av. Central #250", 
      especialidad: "Trompeta Básica", 
      estado: true 
    }
  ]);

  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedProfessor(null);
    setFormModalOpen(true);
  };

  const handleEdit = (professor) => {
    setIsEditing(true);
    setSelectedProfessor(professor);
    setFormModalOpen(true);
  };

  const handleDelete = (professor) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar al profesor con CC ${professor.cc}?`);
    if (confirmDelete) {
      setProfessors(prev => prev.filter(item => item.id !== professor.id));
    }
  };

  const handleView = (professor) => {
    setSelectedProfessor(professor);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedProfessor(null);
  };

  const handleCloseForm = () => {
    setFormModalOpen(false);
    setSelectedProfessor(null);
    setIsEditing(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      setProfessors(prev => prev.map(item => 
        item.id === selectedProfessor.id ? { ...formData, id: item.id } : item
      ));
    } else {
      // Use CC as ID for new professors
      setProfessors(prev => [...prev, { ...formData, id: formData.cc }]);
    }
    handleCloseForm();
  };

  const handleToggleStatus = (professorId) => {
    setProfessors(prev => prev.map(item => 
      item.id === professorId ? { ...item, estado: !item.estado } : item
    ));
  };

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'cc', label: 'CC' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'direccion', label: 'Dirección' },
    { id: 'especialidad', label: 'Especialidad' },
    { 
      id: 'estado', 
      label: 'Estado',
      render: (value, row) => (
        <StatusButton 
          active={value} 
          onClick={() => handleToggleStatus(row.id)}
        />
      )
    }
  ];

  const detailFields = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'cc', label: 'CC' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'direccion', label: 'Dirección' },
    { id: 'especialidad', label: 'Especialidad' },
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const formFields = [
    { 
      id: 'nombre', 
      label: 'Nombre', 
      type: 'text',
      required: true
    },
    { 
      id: 'apellido', 
      label: 'Apellido', 
      type: 'text',
      required: true
    },
    { 
      id: 'cc', 
      label: 'CC', 
      type: 'text',
      required: true,
      disabled: isEditing
    },
    { 
      id: 'telefono', 
      label: 'Teléfono', 
      type: 'text',
      required: true
    },
    { 
      id: 'direccion', 
      label: 'Dirección', 
      type: 'text',
      required: true
    },
    { 
      id: 'especialidad', 
      label: 'Especialidad', 
      type: 'text',
      required: true
    },
    { 
      id: 'estado', 
      label: 'Estado', 
      type: 'switch',
      defaultValue: true
    }
  ];

  return (
    <>
      <GenericList
        data={professors}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onView={handleView}
        title="Gestión de Profesores"
      />
      
      <DetailModal
        title={`Detalle del Profesor ${selectedProfessor?.nombre} ${selectedProfessor?.apellido}`}
        data={selectedProfessor}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />

      <FormModal
        title={isEditing ? 'Editar Profesor' : 'Crear Nuevo Profesor'}
        fields={formFields}
        initialData={selectedProfessor}
        open={formModalOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Profesores;