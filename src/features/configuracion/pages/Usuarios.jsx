import React, { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', tel: '123456789', correo: 'juan@example.com', rol: 'Admin', estado: true },
    { id: 2, nombre: 'Ana Gómez', tel: '987654321', correo: 'ana@example.com', rol: 'User', estado: false },
    // Add more users as needed
  ]);

  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedUsuario(null);
    setFormModalOpen(true);
  };

  const handleEdit = (usuario) => {
    setIsEditing(true);
    setSelectedUsuario(usuario);
    setFormModalOpen(true);
  };

  const handleDelete = (usuario) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar al usuario ${usuario.nombre}?`);
    if (confirmDelete) {
      setUsuarios(prev => prev.filter(item => item.id !== usuario.id));
    }
  };

  const handleView = (usuario) => {
    setSelectedUsuario(usuario);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedUsuario(null);
  };

  const handleCloseForm = () => {
    setFormModalOpen(false);
    setSelectedUsuario(null);
    setIsEditing(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      setUsuarios(prev => prev.map(item => 
        item.id === selectedUsuario.id ? { ...formData, id: item.id } : item
      ));
    } else {
      const newId = Math.max(...usuarios.map(u => u.id)) + 1;
      setUsuarios(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseForm();
  };

  const handleToggleStatus = (usuarioId) => {
    setUsuarios(prev => prev.map(item => 
      item.id === usuarioId ? { ...item, estado: !item.estado } : item
    ));
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'tel', label: 'Tel' },
    { id: 'correo', label: 'Correo' },
    { id: 'rol', label: 'Rol' },
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
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'tel', label: 'Tel' },
    { id: 'correo', label: 'Correo' },
    { id: 'rol', label: 'Rol' },
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const formFields = [
    { id: 'nombre', label: 'Nombre', type: 'text', required: true },
    { id: 'tel', label: 'Tel', type: 'text', required: true },
    { id: 'correo', label: 'Correo', type: 'email', required: true },
    { id: 'rol', label: 'Rol', type: 'text', required: true },
    { id: 'estado', label: 'Estado', type: 'switch', defaultValue: true }
  ];

  return (
    <>
      <GenericList
        data={usuarios}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCreate={handleCreate}
        title="Gestión de Usuarios"
      />
      
      <DetailModal
        title={`Detalle del Usuario: ${selectedUsuario?.nombre}`}
        data={selectedUsuario}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />

      <FormModal
        title={isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        fields={formFields}
        initialData={selectedUsuario}
        open={formModalOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Usuarios;