import React, { useState } from 'react';
import { Box, Paper, Tabs, Tab, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const localizer = momentLocalizer(moment);

const Clases = () => {
  const [tabValue, setTabValue] = useState(0);

  // Classes state
  const [classes, setClasses] = useState([
    { id: 'C001', curso: 'Guitarra Clásica', profesor: 'Juan Pérez', estudiante: 'Ana López', fecha: '2023-01-01', hora_inicio: '10:00', hora_fin: '11:00', estado: true },
    { id: 'C002', curso: 'Piano Intermedio', profesor: 'Maria Gómez', estudiante: 'Carlos Sánchez', fecha: '2023-02-01', hora_inicio: '11:00', hora_fin: '12:00', estado: true },
    // Add more classes as needed
  ]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classDetailOpen, setClassDetailOpen] = useState(false);
  const [classFormOpen, setClassFormOpen] = useState(false);
  const [isEditingClass, setIsEditingClass] = useState(false);

  // Calendar events
  const events = classes.map(cls => ({
    id: cls.id,
    title: `${cls.curso} - ${cls.estudiante}`,
    start: new Date(`${cls.fecha}T${cls.hora}`),
    end: new Date(`${cls.fecha}T${cls.hora}`),
  }));

  // Tab handling
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Classes handlers
  const handleCreateClass = () => {
    setIsEditingClass(false);
    setSelectedClass(null);
    setClassFormOpen(true);
  };

  const handleEditClass = (cls) => {
    setIsEditingClass(true);
    setSelectedClass(cls);
    setClassFormOpen(true);
  };

  const handleDeleteClass = (cls) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar la clase ${cls.curso}?`);
    if (confirmDelete) {
      setClasses(prev => prev.filter(item => item.id !== cls.id));
    }
  };

  const handleViewClass = (cls) => {
    setSelectedClass(cls);
    setClassDetailOpen(true);
  };

  const handleCloseClassDetail = () => {
    setClassDetailOpen(false);
    setSelectedClass(null);
  };

  const handleCloseClassForm = () => {
    setClassFormOpen(false);
    setSelectedClass(null);
    setIsEditingClass(false);
  };

  const handleSubmitClass = (formData) => {
    if (isEditingClass) {
      setClasses(prev => prev.map(item => 
        item.id === selectedClass.id ? { ...formData, id: item.id } : item
      ));
    } else {
      // Generate a new ID for new classes
      const newId = `C${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      setClasses(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseClassForm();
  };

  const handleToggleClassStatus = (classId) => {
    setClasses(prev => prev.map(item => 
      item.id === classId ? { ...item, estado: !item.estado } : item
    ));
  };

  // Classes columns and fields
  const classesColumns = [
    { id: 'curso', label: 'Curso' },
    { id: 'profesor', label: 'Profesor' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'fecha', label: 'Fecha' },
    { id: 'hora_inicio', label: 'Hora de Inicio' }, // Updated to include start time
    { id: 'hora_fin', label: 'Hora de Fin' }, // Updated to include end time
    { 
      id: 'estado', 
      label: 'Estado',
      render: (value, row) => (
        <StatusButton 
          active={value} 
          onClick={() => handleToggleClassStatus(row.id)}
        />
      )
    }
  ];

  const classesDetailFields = [
    { id: 'id', label: 'Código' },
    { id: 'curso', label: 'Curso' },
    { id: 'profesor', label: 'Profesor' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'fecha', label: 'Fecha' },
    { id: 'hora_inicio', label: 'Hora de Inicio' }, // Updated to include start time
    { id: 'hora_fin', label: 'Hora de Fin' }, // Updated to include end time
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const classesFormFields = [
    { id: 'curso', label: 'Curso', type: 'text', required: true },
    { id: 'profesor', label: 'Profesor', type: 'text', required: true },
    { id: 'estudiante', label: 'Estudiante', type: 'text', required: true },
    { id: 'fecha', label: 'Fecha', type: 'date', required: true },
    { id: 'hora_inicio', label: 'Hora de Inicio', type: 'time', required: true }, // Updated to include start time
    { id: 'hora_fin', label: 'Hora de Fin', type: 'time', required: true }, // Updated to include end time
    { id: 'estado', label: 'Estado', type: 'switch', defaultValue: true }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ borderBottom: 0, borderColor: 'transparent', mb: 2, boxShadow: 'none', backgroundColor: 'transparent' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="standard"
          sx={{ 
            '& .MuiTab-root': { 
              fontWeight: 'bold',
              fontSize: '0.9rem',
              color: '#555',
              textTransform: 'uppercase',
              minWidth: '120px',
              minHeight: '36px',
              padding: '6px 12px',
              marginRight: '8px',
              marginTop: '8px',
              marginBottom: '8px',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              border: '1px solid #ddd',
              backgroundColor: 'transparent'
            },
            '& .Mui-selected': {
              color: '#fff !important',
              backgroundColor: '#0455a2',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab 
            label="Calendario" 
            id="tab-0" 
            aria-controls="tabpanel-0" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(4, 85, 162, 0.05)'
              }
            }}
          />
          <Tab 
            label="Clases" 
            id="tab-1" 
            aria-controls="tabpanel-1" 
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(4, 85, 162, 0.05)'
              }
            }}
          />
        </Tabs>
      </Paper>

      <div role="tabpanel" hidden={tabValue !== 0} id="tabpanel-0" aria-labelledby="tab-0" style={{ height: 'calc(100% - 48px)' }}>
        {tabValue === 0 && (
          <Box sx={{ height: '100%' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
              selectable
              onSelectEvent={handleViewClass}
            />
          </Box>
        )}
      </div>

      <div role="tabpanel" hidden={tabValue !== 1} id="tabpanel-1" aria-labelledby="tab-1" style={{ height: 'calc(100% - 48px)' }}>
        {tabValue === 1 && (
          <Box sx={{ height: '100%' }}>
            <GenericList
              data={classes}
              columns={classesColumns}
              onEdit={handleEditClass}
              onDelete={handleDeleteClass}
              onCreate={handleCreateClass}
              onView={handleViewClass}
              title="Gestión de Clases"
            />
            
            <DetailModal
              title={`Detalle de Clase: ${selectedClass?.curso}`}
              data={selectedClass}
              fields={classesDetailFields}
              open={classDetailOpen}
              onClose={handleCloseClassDetail}
            />

            <FormModal
              title={isEditingClass ? 'Editar Clase' : 'Crear Nueva Clase'}
              fields={classesFormFields}
              initialData={selectedClass}
              open={classFormOpen}
              onClose={handleCloseClassForm}
              onSubmit={handleSubmitClass}
            />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Clases;