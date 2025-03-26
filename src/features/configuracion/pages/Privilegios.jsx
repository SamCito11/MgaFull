import React, { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { ConfirmationDialog } from '../../../shared/components/ConfirmationDialog'; // Import ConfirmationDialog

const Privilegios = () => {
  const [data, setData] = useState([
    { id: 1, nombre_privilegio: 'Crear' },
    { id: 2, nombre_privilegio: 'Ver' },
    { id: 3, nombre_privilegio: 'Editar' },
    { id: 4, nombre_privilegio: 'Eliminar' },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // State for confirmation dialog

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'nombre_privilegio', label: 'Nombre Privilegio' },
  ];

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEditing(true);
    setFormModalOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setConfirmDialogOpen(true); // Open confirmation dialog
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== selectedRow.id));
    setConfirmDialogOpen(false); // Close confirmation dialog
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setDetailModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedRow(null);
    setIsEditing(false);
    setFormModalOpen(true);
  };

  const handleSaveEdit = (formData) => {
    setData(data.map(item => item.id === selectedRow.id ? { ...formData, id: item.id } : item));
    setFormModalOpen(false);
  };

  const handleAddPrivilege = (formData) => {
    const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1; // Ensure Math.max is used correctly
    setData([...data, { id: newId, nombre_privilegio: formData.nombre_privilegio }]);
    setFormModalOpen(false);
  };

  const formFields = [
    { id: 'nombre_privilegio', label: 'Nombre del Privilegio', type: 'text', required: true }
  ];

  return (
    <>
      <GenericList
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCreate={handleCreate}
        title="Lista de Privilegios"
      />

      <DetailModal
        title={`Detalle del Privilegio: ${selectedRow?.nombre_privilegio}`}
        data={selectedRow}
        fields={columns}
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />

      <FormModal
        title={isEditing ? 'Editar Privilegio' : 'Crear Nuevo Privilegio'}
        fields={formFields}
        initialData={selectedRow}
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={isEditing ? handleSaveEdit : handleAddPrivilege}
      />

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        content="¿Está seguro de que desea eliminar este privilegio?"
      />
    </>
  );
};

export default Privilegios;