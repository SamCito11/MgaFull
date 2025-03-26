import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Switch,
  FormControlLabel,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';

export const FormModal = ({ 
  title, 
  fields, 
  initialData, 
  open, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData({...initialData});
      } else {
        const defaultData = {};
        fields.forEach(field => {
          defaultData[field.id] = field.defaultValue || '';
        });
        setFormData(defaultData);
      }
    }
  }, [initialData, fields, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'grid', gap: 2 }}>
            {fields.map((field) => {
              if (field.type === 'switch') {
                return (
                  <FormControlLabel
                    key={field.id}
                    control={
                      <Switch
                        checked={!!formData[field.id]}
                        onChange={(e) => handleChange(field.id, e.target.checked)}
                        color="primary"
                      />
                    }
                    label={field.label}
                  />
                );
              }

              return (
                <TextField
                  key={field.id}
                  fullWidth
                  label={field.label}
                  type={field.type || 'text'}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                  disabled={field.disabled}
                  InputProps={{
                    inputProps: { 
                      min: field.min,
                      max: field.max
                    }
                  }}
                />
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};