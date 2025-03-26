import { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';

const Asistencia = () => {
  const [asistencias, setAsistencias] = useState([
    {
      id: 'A001',
      nombreEstudiante: 'Juan',
      apellido: 'Pérez',
      fecha: '2024-01-20',
      hora: '09:00',
      profesor: 'Carlos Rodríguez'
    },
    {
      id: 'A002',
      nombreEstudiante: 'María',
      apellido: 'González',
      fecha: '2024-01-20',
      hora: '10:30',
      profesor: 'Ana Martínez'
    }
  ]);

  const [selectedAsistencia, setSelectedAsistencia] = useState(null);
  const [isEditingAsistencia, setIsEditingAsistencia] = useState(false);
  const [asistenciaDetailOpen, setAsistenciaDetailOpen] = useState(false);
  const [asistenciaFormOpen, setAsistenciaFormOpen] = useState(false);

  // Handlers
  const handleCreateAsistencia = () => {
    setIsEditingAsistencia(false);
    setSelectedAsistencia(null);
    setAsistenciaFormOpen(true);
  };

  const handleEditAsistencia = (asistencia) => {
    setIsEditingAsistencia(true);
    setSelectedAsistencia(asistencia);
    setAsistenciaFormOpen(true);
  };

  const handleDeleteAsistencia = (asistencia) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar la asistencia de ${asistencia.nombreEstudiante} ${asistencia.apellido}?`);
    if (confirmDelete) {
      setAsistencias(prev => prev.filter(item => item.id !== asistencia.id));
    }
  };

  const handleViewAsistencia = (asistencia) => {
    setSelectedAsistencia(asistencia);
    setAsistenciaDetailOpen(true);
  };

  const handleCloseAsistenciaDetail = () => {
    setAsistenciaDetailOpen(false);
    setSelectedAsistencia(null);
  };

  const handleCloseAsistenciaForm = () => {
    setAsistenciaFormOpen(false);
    setSelectedAsistencia(null);
    setIsEditingAsistencia(false);
  };

  const handleSubmitAsistencia = (formData) => {
    if (isEditingAsistencia) {
      setAsistencias(prev => prev.map(item => 
        item.id === selectedAsistencia.id ? { ...formData, id: item.id } : item
      ));
    } else {
      const newId = `A${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      setAsistencias(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseAsistenciaForm();
  };

  // Column and field definitions
  const asistenciasColumns = [
    { id: 'id', label: 'ID' },
    { id: 'nombreEstudiante', label: 'Nombre Estudiante' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'fecha', label: 'Fecha' },
    { id: 'hora', label: 'Hora' },
    { id: 'profesor', label: 'Profesor' }
  ];

  const asistenciasDetailFields = [
    { id: 'id', label: 'ID' },
    { id: 'nombreEstudiante', label: 'Nombre Estudiante' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'fecha', label: 'Fecha' },
    { id: 'hora', label: 'Hora' },
    { id: 'profesor', label: 'Profesor' }
  ];

  const asistenciasFormFields = [
    { 
      id: 'nombreEstudiante', 
      label: 'Nombre Estudiante', 
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
      id: 'fecha', 
      label: 'Fecha', 
      type: 'date',
      required: true
    },
    { 
      id: 'hora', 
      label: 'Hora', 
      type: 'time',
      required: true
    },
    { 
      id: 'profesor', 
      label: 'Profesor', 
      type: 'text',
      required: true
    }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      

      <GenericList
        data={asistencias}
        columns={asistenciasColumns}
        onEdit={handleEditAsistencia}
        onDelete={handleDeleteAsistencia}
        onCreate={handleCreateAsistencia}
        onView={handleViewAsistencia}
        title="Listado de Asistencias"
      />
      
      <DetailModal
        title={`Detalle de Asistencia: ${selectedAsistencia?.id}`}
        data={selectedAsistencia}
        fields={asistenciasDetailFields}
        open={asistenciaDetailOpen}
        onClose={handleCloseAsistenciaDetail}
      />

      <FormModal
        title={isEditingAsistencia ? 'Editar Asistencia' : 'Registrar Nueva Asistencia'}
        fields={asistenciasFormFields}
        initialData={selectedAsistencia}
        open={asistenciaFormOpen}
        onClose={handleCloseAsistenciaForm}
        onSubmit={handleSubmitAsistencia}
      />
    </Box>
  );
};

export default Asistencia;