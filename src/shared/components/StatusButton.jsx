import { Chip } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

export const StatusButton = ({ active }) => {
  return (
    <Chip
      icon={active ? <CheckCircle /> : <Cancel />}
      label={active ? 'Activo' : 'Inactivo'}
      color={active ? 'success' : 'error'}
      variant="outlined"
      size="small"
    />
  );
};