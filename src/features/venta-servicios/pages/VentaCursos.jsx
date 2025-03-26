import React, { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const VentaCursos = () => {
  const [cursos, setCursos] = useState([
    { id: 1, cliente: 'Juan Pérez', estudiante: 'Ana López', ciclo: '2023-01', curso: 'Guitarra Clásica', clases: 10, valor_curso: 500, debe: 100, estado: true },
    { id: 2, cliente: 'María Gómez', estudiante: 'Carlos Sánchez', ciclo: '2023-02', curso: 'Piano Intermedio', clases: 8, valor_curso: 400, debe: 50, estado: false },
  ]);

  const [selectedCurso, setSelectedCurso] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedCurso(null);
    setFormModalOpen(true);
  };

  const handleEdit = (curso) => {
    setIsEditing(true);
    setSelectedCurso(curso);
    setFormModalOpen(true);
  };

  const handleDelete = (curso) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar el curso de ${curso.curso}?`);
    if (confirmDelete) {
      setCursos(prev => prev.filter(item => item.id !== curso.id));
    }
  };

  const handleView = (curso) => {
    setSelectedCurso(curso);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedCurso(null);
  };

  const handleCloseForm = () => {
    setFormModalOpen(false);
    setSelectedCurso(null);
    setIsEditing(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      setCursos(prev => prev.map(item => 
        item.id === selectedCurso.id ? { ...formData, id: item.id } : item
      ));
    } else {
      const newId = Math.max(...cursos.map(c => c.id)) + 1;
      setCursos(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseForm();
  };

  const handleToggleStatus = (cursoId) => {
    setCursos(prev => prev.map(item => 
      item.id === cursoId ? { ...item, estado: !item.estado } : item
    ));
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'cliente', label: 'Cliente' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'ciclo', label: 'Ciclo' },
    { id: 'curso', label: 'Curso' },
    { id: 'clases', label: 'Clases' },
    { id: 'valor_curso', label: 'Valor Curso' },
    { id: 'debe', label: 'Debe' },
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
    { id: 'cliente', label: 'Cliente' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'ciclo', label: 'Ciclo' },
    { id: 'curso', label: 'Curso' },
    { id: 'clases', label: 'Clases' },
    { id: 'valor_curso', label: 'Valor Curso' },
    { id: 'debe', label: 'Debe' },
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const formFields = [
    { id: 'cliente', label: 'Cliente', type: 'text', required: true },
    { id: 'estudiante', label: 'Estudiante', type: 'text', required: true },
    { id: 'ciclo', label: 'Ciclo', type: 'text', required: true },
    { id: 'curso', label: 'Curso', type: 'text', required: true },
    { id: 'clases', label: 'Clases', type: 'number', required: true },
    { id: 'valor_curso', label: 'Valor Curso', type: 'number', required: true },
    { id: 'debe', label: 'Debe', type: 'number', required: true },
    { id: 'estado', label: 'Estado', type: 'switch', defaultValue: true }
  ];

  return (
    <>
      <GenericList
        data={cursos}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCreate={handleCreate}
        title="Gestión de Venta de Cursos"
      />
      
      <DetailModal
        title={`Detalle del Curso: ${selectedCurso?.curso}`}
        data={selectedCurso}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />

      <FormModal
        title={isEditing ? 'Editar Curso' : 'Crear Nuevo Curso'}
        fields={formFields}
        initialData={selectedCurso}
        open={formModalOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default VentaCursos;