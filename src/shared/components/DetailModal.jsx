import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';

export const DetailModal = ({ 
  open, 
  onClose, 
  title,
  data,
  fields 
}) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Box sx={{ display: 'grid', gap: 2 }}>
            {fields.map((field) => (
              <Box key={field.id}>
                <Typography color="text.secondary" variant="body2">
                  {field.label}
                </Typography>
                <Typography variant="body1">
                  {field.render ? field.render(data[field.id]) : data[field.id]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};