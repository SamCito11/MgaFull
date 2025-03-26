import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Menu, MenuItem } from '@mui/material';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { ConfirmationDialog } from '../../../shared/components/ConfirmationDialog'; // Ensure this path is correct

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const ProgramacionProfesores = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Juan López',
      start: new Date(2024, 10, 4, 10, 0),
      end: new Date(2024, 10, 4, 11, 0),
      resource: 'Juan López'
    },
    {
      id: 2,
      title: 'Ana Martínez',
      start: new Date(2024, 10, 14, 12, 0),
      end: new Date(2024, 10, 14, 13, 0),
      resource: 'Ana Martínez'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', start: '', end: '' });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // State for confirmation dialog

  const handleSelectEvent = (event, e) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm')
    });
    setMenuAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      start: moment(start).format('YYYY-MM-DDTHH:mm'),
      end: moment(end).format('YYYY-MM-DDTHH:mm')
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({ title: '', start: '', end: '' });
  };

  const handleSubmit = () => {
    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...selectedEvent, ...formData, start: new Date(formData.start), end: new Date(formData.end) } : event
      ));
    } else {
      const newEvent = {
        id: events.length + 1,
        title: formData.title,
        start: new Date(formData.start),
        end: new Date(formData.end),
        resource: formData.title
      };
      setEvents([...events, newEvent]);
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    setConfirmDialogOpen(true); // Open confirmation dialog
  };

  const confirmDelete = () => {
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    handleCloseMenu();
    setConfirmDialogOpen(false); // Close confirmation dialog
  };

  const handleDragEnd = ({ event, start, end }) => {
    const updatedEvent = { ...event, start, end };
    setEvents(events.map(evt => (evt.id === event.id ? updatedEvent : evt)));
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', p: 3 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#0455a2', mb: 3 }}>
        Programación de Profesores
      </Typography>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleDragEnd}
        popup
      />

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        sx={{
          '& .MuiMenuItem-root': {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#333',
            borderRadius: '4px',
            border: '1px solid #ddd',
            margin: '4px',
            '&:hover': {
              backgroundColor: '#0455a2',
              color: 'white'
            }
          }
        }}
      >
        <MenuItem onClick={() => { setDialogOpen(true); handleCloseMenu(); }}>
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Eliminar
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ backgroundColor: '#0455a2', color: 'white', fontWeight: 'bold' }}>
          {selectedEvent ? 'Editar Profesor' : 'Agregar Profesor'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre del Profesor"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Inicio"
            type="datetime-local"
            value={formData.start}
            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Fin"
            type="datetime-local"
            value={formData.end}
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#0455a2', textTransform: 'uppercase', fontWeight: 'bold' }}>Cancelar</Button>
          <Button onClick={handleSubmit} sx={{ backgroundColor: '#0455a2', color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
            {selectedEvent ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        content="¿Está seguro de que desea eliminar este evento?"
      />
    </Box>
  );
};

export default ProgramacionProfesores;