import React, { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { ConfirmationDialog } from '../../../shared/components/ConfirmationDialog';

const VentaMatriculas = () => {
  const [data, setData] = useState([
    { id: 1, cliente: 'Juan Pérez', estudiante: 'Ana López', fecha_inicio: '2023-01-01', fecha_fin: '2023-12-31' },
    { id: 2, cliente: 'María Gómez', estudiante: 'Carlos Sánchez', fecha_inicio: '2023-02-01', fecha_fin: '2023-11-30' },
    // Add more data as needed
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'cliente', label: 'Cliente' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'fecha_inicio', label: 'Fecha de Inicio' },
    { id: 'fecha_fin', label: 'Fecha Fin' },
  ];

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEditing(true);
    setFormModalOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== selectedRow.id));
    setConfirmDialogOpen(false);
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

  const handleAddMatricula = (formData) => {
    const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
    setData([...data, { id: newId, ...formData }]);
    setFormModalOpen(false);
  };

  const formFields = [
    { id: 'cliente', label: 'Cliente', type: 'text', required: true },
    { id: 'estudiante', label: 'Estudiante', type: 'text', required: true },
    { id: 'fecha_inicio', label: 'Fecha de Inicio', type: 'date', required: true },
    { id: 'fecha_fin', label: 'Fecha Fin', type: 'date', required: true },
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
        title="Venta de Matrículas"
      />

      <DetailModal
        title={`Detalle de Matrícula: ${selectedRow?.cliente}`}
        data={selectedRow}
        fields={columns}
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />

      <FormModal
        title={isEditing ? 'Editar Matrícula' : 'Crear Nueva Matrícula'}
        fields={formFields}
        initialData={selectedRow}
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={isEditing ? handleSaveEdit : handleAddMatricula}
      />

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        content="¿Está seguro de que desea eliminar esta matrícula?"
      />
    </>
  );
};

export default VentaMatriculas;