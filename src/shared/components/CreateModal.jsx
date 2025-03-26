import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';

export function CreateModal({ open, onClose, onConfirm, fields }) {
  const [formData, setFormData] = useState({});

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field.id]: event.target.value
    }));
  };

  const handleSubmit = () => {
    onConfirm(formData);
    setFormData({});
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear Nuevo</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {fields.map((field) => (
            <TextField
              key={field.id}
              label={field.label}
              value={formData[field.id] || ''}
              onChange={handleChange(field)}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}