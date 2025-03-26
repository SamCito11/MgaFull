import React, { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const Clientes = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', age: 30, direccion: 'Calle 123', telefono: '123456789', estado: true },
    { id: 2, nombre: 'María', apellido: 'Gómez', age: 25, direccion: 'Avenida 456', telefono: '987654321', estado: false },
    // Add more clients as needed
  ]);

  const [selectedCliente, setSelectedCliente] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedCliente(null);
    setFormModalOpen(true);
  };

  const handleEdit = (cliente) => {
    setIsEditing(true);
    setSelectedCliente(cliente);
    setFormModalOpen(true);
  };

  const handleDelete = (cliente) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar el cliente ${cliente.nombre}?`);
    if (confirmDelete) {
      setClientes(prev => prev.filter(item => item.id !== cliente.id));
    }
  };

  const handleView = (cliente) => {
    setSelectedCliente(cliente);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedCliente(null);
  };

  const handleCloseForm = () => {
    setFormModalOpen(false);
    setSelectedCliente(null);
    setIsEditing(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      setClientes(prev => prev.map(item => 
        item.id === selectedCliente.id ? { ...formData, id: item.id } : item
      ));
    } else {
      const newId = Math.max(...clientes.map(c => c.id)) + 1;
      setClientes(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseForm();
  };

  const handleToggleStatus = (clienteId) => {
    setClientes(prev => prev.map(item => 
      item.id === clienteId ? { ...item, estado: !item.estado } : item
    ));
  };

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'age', label: 'Age' },
    { id: 'direccion', label: 'Dirección' },
    { id: 'telefono', label: 'Teléfono' },
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
    { id: 'age', label: 'Age' },
    { id: 'direccion', label: 'Dirección' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const formFields = [
    { id: 'nombre', label: 'Nombre', type: 'text', required: true },
    { id: 'apellido', label: 'Apellido', type: 'text', required: true },
    { id: 'age', label: 'Age', type: 'number', required: true },
    { id: 'direccion', label: 'Dirección', type: 'text', required: true },
    { id: 'telefono', label: 'Teléfono', type: 'text', required: true },
    { id: 'estado', label: 'Estado', type: 'switch', defaultValue: true }
  ];

  return (
    <>
      <GenericList
        data={clientes}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCreate={handleCreate}
        title="Gestión de Clientes"
      />
      
      <DetailModal
        title={`Detalle del Cliente: ${selectedCliente?.nombre}`}
        data={selectedCliente}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />

      <FormModal
        title={isEditing ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
        fields={formFields}
        initialData={selectedCliente}
        open={formModalOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Clientes;