import { useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Button,
  Box, 
  Typography,
  TablePagination
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Visibility as ViewIcon 
} from '@mui/icons-material';

export const GenericList = ({
  data,
  columns,
  onEdit,
  onDelete,
  onCreate,
  onView,
  title,
  pagination
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3, height: '100%', width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#0455a2'
          }}
        >
          {title}
        </Typography>
        {onCreate && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onCreate}
            sx={{ borderRadius: '20px', px: 3 }}
          >
            Crear Nuevo
          </Button>
        )}
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell 
                    key={column.id}
                    align="center"
                    sx={{ 
                      fontWeight: 'bold',
                      backgroundColor: '#0455a2',
                      color: 'white'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell 
                  align="center"
                  sx={{ 
                    fontWeight: 'bold',
                    backgroundColor: '#0455a2',
                    color: 'white'
                  }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow 
                  key={row.id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: '#7c9427 !important',
                      '& td': { color: 'white' }
                    }
                  }}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={`${row.id}-${column.id}`}
                      align="center"
                    >
                      {column.render ? column.render(row[column.id], row) : row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton onClick={() => onView(row)} color="info">
                        <ViewIcon />
                      </IconButton>
                      <IconButton onClick={() => onEdit(row)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(row)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 16, 24]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </Paper>
    </Box>
  );
};