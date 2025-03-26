import React, { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 20, telefono: '123456789', acudiente: 'María López', estado: true },
    { id: 2, nombre: 'Ana', apellido: 'Gómez', edad: 22, telefono: '987654321', acudiente: 'Carlos Sánchez', estado: false },
    // Add more students as needed
  ]);

  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedEstudiante(null);
    setFormModalOpen(true);
  };

  const handleEdit = (estudiante) => {
    setIsEditing(true);
    setSelectedEstudiante(estudiante);
    setFormModalOpen(true);
  };

  const handleDelete = (estudiante) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar al estudiante ${estudiante.nombre}?`);
    if (confirmDelete) {
      setEstudiantes(prev => prev.filter(item => item.id !== estudiante.id));
    }
  };

  const handleView = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedEstudiante(null);
  };

  const handleCloseForm = () => {
    setFormModalOpen(false);
    setSelectedEstudiante(null);
    setIsEditing(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      setEstudiantes(prev => prev.map(item => 
        item.id === selectedEstudiante.id ? { ...formData, id: item.id } : item
      ));
    } else {
      const newId = Math.max(...estudiantes.map(e => e.id)) + 1;
      setEstudiantes(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseForm();
  };

  const handleToggleStatus = (estudianteId) => {
    setEstudiantes(prev => prev.map(item => 
      item.id === estudianteId ? { ...item, estado: !item.estado } : item
    ));
  };

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'edad', label: 'Edad' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'acudiente', label: 'Acudiente' },
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
    { id: 'edad', label: 'Edad' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'acudiente', label: 'Acudiente' },
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const formFields = [
    { id: 'nombre', label: 'Nombre', type: 'text', required: true },
    { id: 'apellido', label: 'Apellido', type: 'text', required: true },
    { id: 'edad', label: 'Edad', type: 'number', required: true },
    { id: 'telefono', label: 'Teléfono', type: 'text', required: true },
    { id: 'acudiente', label: 'Acudiente', type: 'text', required: true },
    { id: 'estado', label: 'Estado', type: 'switch', defaultValue: true }
  ];

  return (
    <>
      <GenericList
        data={estudiantes}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCreate={handleCreate}
        title="Gestión de Estudiantes"
      />
      
      <DetailModal
        title={`Detalle del Estudiante: ${selectedEstudiante?.nombre}`}
        data={selectedEstudiante}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />

      <FormModal
        title={isEditing ? 'Editar Estudiante' : 'Crear Nuevo Estudiante'}
        fields={formFields}
        initialData={selectedEstudiante}
        open={formModalOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Estudiantes;