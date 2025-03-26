import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: '#0455a2', color: 'white', fontWeight: 'bold' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#0455a2', textTransform: 'uppercase', fontWeight: 'bold' }}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} sx={{ backgroundColor: '#0455a2', color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};