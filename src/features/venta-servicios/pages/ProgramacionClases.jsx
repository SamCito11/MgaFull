import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Info as InfoIcon 
} from '@mui/icons-material';
import { GenericList } from '../../../shared/components/GenericList';

const ProgramacionClases = () => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const horasClase = ['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', 
                      '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];
  
  const [programacion, setProgramacion] = useState([
    { 
      id: 1, 
      hora: '8:00 - 9:00', 
      lunes: 'Guitarra Básica', 
      martes: 'Piano Intermedio', 
      miercoles: '', 
      jueves: 'Guitarra Básica', 
      viernes: '', 
      sabado: 'Violín Avanzado',
      profesor: 'Juan Pérez',
      aula: 'A101'
    },
    { 
      id: 2, 
      hora: '9:00 - 10:00', 
      lunes: '', 
      martes: 'Canto Básico', 
      miercoles: 'Piano Intermedio', 
      jueves: '', 
      viernes: 'Canto Básico', 
      sabado: '',
      profesor: 'María Gómez',
      aula: 'A102'
    },
    { 
      id: 3, 
      hora: '10:00 - 11:00', 
      lunes: 'Violín Avanzado', 
      martes: '', 
      miercoles: 'Guitarra Básica', 
      jueves: 'Piano Intermedio', 
      viernes: 'Violín Avanzado', 
      sabado: '',
      profesor: 'Carlos Sánchez',
      aula: 'A103'
    }
  ]);

  const [detalleOpen, setDetalleOpen] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    hora: '',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: '',
    sabado: '',
    profesor: '',
    aula: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleOpenDetalle = (horario) => {
    setDetalleSeleccionado(horario);
    setDetalleOpen(true);
  };

  const handleCloseDetalle = () => {
    setDetalleOpen(false);
    setDetalleSeleccionado(null);
  };

  const handleOpenForm = (horario = null) => {
    if (horario) {
      setFormData(horario);
      setEditingId(horario.id);
    } else {
      setFormData({
        hora: '',
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: '',
        profesor: '',
        aula: ''
      });
      setEditingId(null);
    }
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setFormData({
      hora: '',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: '',
      profesor: '',
      aula: ''
    });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitForm = () => {
    if (editingId) {
      setProgramacion(prev => 
        prev.map(item => item.id === editingId ? { ...formData, id: editingId } : item)
      );
    } else {
      const newId = Math.max(0, ...programacion.map(item => item.id)) + 1;
      setProgramacion(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseForm();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Está seguro de eliminar este horario?');
    if (confirmDelete) {
      setProgramacion(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleCreate = () => {
    setFormData({
      hora: '',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: '',
      profesor: '',
      aula: ''
    });
    setEditingId(null);
    setFormOpen(true);
  };

  const columns = [
    { id: 'hora', label: 'Hora' },
    { id: 'lunes', label: 'Lunes' },
    { id: 'martes', label: 'Martes' },
    { id: 'miercoles', label: 'Miércoles' },
    { id: 'jueves', label: 'Jueves' },
    { id: 'viernes', label: 'Viernes' },
    { id: 'sabado', label: 'Sábado' },
    { id: 'profesor', label: 'Profesor' },
    { id: 'aula', label: 'Aula' }
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <GenericList
        data={programacion}
        columns={columns}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
        onCreate={handleCreate} // Added onCreate handler
        onView={handleOpenDetalle}
        title="Programación de Clases"
      />

      {/* Modal de Detalles */}
      <Dialog 
        open={detalleOpen} 
        onClose={handleCloseDetalle} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }
        }}
      >
        <DialogTitle sx={{ backgroundColor: '#0455a2', color: 'white', fontWeight: 'bold' }}>
          Detalles del Horario
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {detalleSeleccionado && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Hora: <span style={{ fontWeight: 'normal' }}>{detalleSeleccionado.hora}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Profesor: <span style={{ fontWeight: 'normal' }}>{detalleSeleccionado.profesor}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Aula: <span style={{ fontWeight: 'normal' }}>{detalleSeleccionado.aula}</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Clases programadas:</Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {diasSemana.map(dia => {
                    const diaKey = dia.toLowerCase().replace('é', 'e').replace('á', 'a');
                    return detalleSeleccionado[diaKey] ? (
                      <Box component="li" key={dia}>
                        <Typography>
                          <span style={{ fontWeight: 'bold' }}>{dia}:</span> {detalleSeleccionado[diaKey]}
                        </Typography>
                      </Box>
                    ) : null;
                  })}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDetalle}
            variant="outlined"
            sx={{ 
              borderColor: '#0455a2',
              color: '#0455a2',
              '&:hover': {
                borderColor: '#033b7a',
                backgroundColor: 'rgba(4, 85, 162, 0.04)'
              }
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Formulario */}
      <Dialog 
        open={formOpen} 
        onClose={handleCloseForm} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }
        }}
      >
        <DialogTitle sx={{ backgroundColor: '#0455a2', color: 'white', fontWeight: 'bold' }}>
          {editingId ? 'Editar Horario' : 'Nuevo Horario'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Hora"
                name="hora"
                value={formData.hora}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
              >
                {horasClase.map(hora => (
                  <MenuItem key={hora} value={hora}>{hora}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Profesor"
                name="profesor"
                value={formData.profesor}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Aula"
                name="aula"
                value={formData.aula}
                onChange={handleInputChange}
                required
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
              />
            </Grid>
            {diasSemana.map(dia => {
              const diaKey = dia.toLowerCase().replace('é', 'e').replace('á', 'a');
              return (
                <Grid item xs={12} sm={6} key={dia}>
                  <TextField
                    fullWidth
                    label={`Clase ${dia}`}
                    name={diaKey}
                    value={formData[diaKey]}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseForm}
            variant="outlined"
            sx={{ 
              borderColor: '#0455a2',
              color: '#0455a2',
              '&:hover': {
                borderColor: '#033b7a',
                backgroundColor: 'rgba(4, 85, 162, 0.04)'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitForm} 
            variant="contained"
            sx={{ 
              backgroundColor: '#0455a2',
              '&:hover': {
                backgroundColor: '#033b7a'
              }
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgramacionClases;