import { useState, useEffect } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { Box, Typography, Grid } from '@mui/material';
import * as XLSX from 'xlsx';

const Pagos = () => {
  const [payments, setPayments] = useState([
    { 
      id: 1, 
      cliente: 'Giacomo Guilizzoni', 
      estudiante: 'Camilo Guilizzoni',
      matricula: 50000,
      estado: true,
      historial: [
        {
          curso: 'Guitarra',
          precio_curso: 250000,
          clases_totales: 16,
          clases_tomadas: 4,
          fecha_inicio: '2024-01-15'
        },
        {
          curso: 'Piano',
          precio_curso: 300000,
          clases_totales: 12,
          clases_tomadas: 8,
          fecha_inicio: '2023-09-10'
        },
        {
          curso: 'Batería',
          precio_curso: 280000,
          clases_totales: 16,
          clases_tomadas: 2,
          fecha_inicio: '2024-03-01'
        }
      ]
    },
    { 
      id: 2, 
      cliente: 'María Rodríguez', 
      estudiante: 'Carlos Rodríguez',
      matricula: 60000,
      estado: true,
      historial: [
        {
          curso: 'Piano',
          precio_curso: 300000,
          clases_totales: 16,
          clases_tomadas: 6,
          fecha_inicio: '2024-02-01'
        },
        {
          curso: 'Violín',
          precio_curso: 280000,
          clases_totales: 12,
          clases_tomadas: 4,
          fecha_inicio: '2024-01-15'
        },
        {
          curso: 'Flauta Traversa',
          precio_curso: 260000,
          clases_totales: 16,
          clases_tomadas: 3,
          fecha_inicio: '2024-03-01'
        }
      ]
    },
    { 
      id: 3, 
      cliente: 'Juan Pérez', 
      estudiante: 'Ana Pérez',
      matricula: 55000,
      estado: true,
      historial: [
        {
          curso: 'Violín',
          precio_curso: 280000,
          clases_totales: 16,
          clases_tomadas: 5,
          fecha_inicio: '2024-01-20'
        },
        {
          curso: 'Canto',
          precio_curso: 320000,
          clases_totales: 12,
          clases_tomadas: 6,
          fecha_inicio: '2024-02-15'
        },
        {
          curso: 'Piano',
          precio_curso: 300000,
          clases_totales: 16,
          clases_tomadas: 2,
          fecha_inicio: '2024-03-10'
        }
      ]
    },
    { 
      id: 4, 
      cliente: 'Laura Martínez', 
      estudiante: 'Diego Martínez',
      matricula: 45000,
      debes: 150000,
      estado: true,
      historial: [
        {
          curso: 'Batería',
          precio_curso: 220000,
          clases_totales: 12,
          clases_tomadas: 3,
          fecha_inicio: '2024-02-15'
        },
        {
          curso: 'Percusión',
          precio_curso: 180000,
          clases_totales: 8,
          clases_tomadas: 2,
          fecha_inicio: '2024-03-01'
        },
        {
          curso: 'Guitarra Eléctrica',
          precio_curso: 250000,
          clases_totales: 16,
          clases_tomadas: 4,
          fecha_inicio: '2024-01-20'
        }
      ]
    },
    { 
      id: 5, 
      cliente: 'Roberto Sánchez', 
      estudiante: 'Elena Sánchez',
      matricula: 55000,
      debes: 200000,
      estado: true,
      historial: [
        {
          curso: 'Saxofón',
          precio_curso: 350000,
          clases_totales: 16,
          clases_tomadas: 7,
          fecha_inicio: '2024-01-10'
        },
        {
          curso: 'Clarinete',
          precio_curso: 280000,
          clases_totales: 12,
          clases_tomadas: 5,
          fecha_inicio: '2024-02-01'
        },
        {
          curso: 'Flauta Traversa',
          precio_curso: 260000,
          clases_totales: 12,
          clases_tomadas: 3,
          fecha_inicio: '2024-03-15'
        }
      ]
    },
    { 
      id: 6, 
      cliente: 'Carmen López',
      estudiante: 'Miguel López',
      curso: 'Trompeta',
      clases: 4,
      valor_curso: 240000,
      debes: 20000,
      estado: true
    },
    { 
      id: 7, 
      cliente: 'Pablo García',
      estudiante: 'Sofía García',
      curso: 'Clarinete',
      clases: 5,
      valor_curso: 270000,
      debes: 0,
      estado: true
    },
    { 
      id: 8, 
      cliente: 'Ana Díaz',
      estudiante: 'Luis Díaz',
      curso: 'Flauta',
      clases: 6,
      valor_curso: 290000,
      debes: 60000,
      estado: true
    },
    { 
      id: 9, 
      cliente: 'Carlos Ruiz',
      estudiante: 'Marina Ruiz',
      curso: 'Canto',
      clases: 4,
      valor_curso: 260000,
      debes: 10000,
      estado: true
    },
    { 
      id: 10, 
      cliente: 'Isabel Morales',
      estudiante: 'Javier Morales',
      curso: 'Percusión',
      clases: 5,
      valor_curso: 230000,
      debes: 40000,
      estado: true
    }
  ]);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleView = (payment) => {
    setSelectedPayment(payment);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedPayment(null);
  };

  // Update columns to remove estado
  const columns = [
    { id: 'id', label: 'Nro Pago' },
    { id: 'cliente', label: 'Cliente' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'valor_total', label: 'Valor Total' },
    { id: 'debes', label: 'Debes', render: (value) => `$${value || 0}` }
  ];

  // Update detailFields to remove estado
  const detailFields = [
    { id: 'id', label: 'Nro Pago' },
    { id: 'cliente', label: 'Cliente' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'matricula', label: 'Matrícula' },
    { 
      id: 'historial', 
      label: 'Historial de Cursos',
      render: (value, data) => {
        const totalCursos = value?.reduce((sum, item) => sum + item.precio_curso, 0) || 0;
        const valorTotal = totalCursos + data.matricula;
        return (
          <Box>
            {value?.map((item, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {item.curso}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">Precio del curso: ${item.precio_curso}</Typography>
                    <Typography variant="body2">Clases totales: {item.clases_totales}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Clases tomadas: {item.clases_tomadas}</Typography>
                    <Typography variant="body2">Fecha inicio: {item.fecha_inicio}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="subtitle1">Resumen de Pagos</Typography>
              <Typography variant="body2">Total Cursos: ${totalCursos}</Typography>
              <Typography variant="body2">Matrícula: ${data.matricula}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Valor Total: ${valorTotal}
              </Typography>
              <Typography variant="body2" color="error">Debes: ${data.debes || 0}</Typography>
            </Box>
          </Box>
        );
      }
    },
    { id: 'debes', label: 'Debes', render: (value) => `$${value || 0}` }
  ];

  const handleExportExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Prepare the data
    const worksheetData = [
      ['Cliente', 'Estudiante', 'Debe'], // Header row
      ...payments.map(payment => [
        payment.cliente,
        payment.estudiante,
        payment.debes
      ])
    ];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pagos');

    // Write the file
    XLSX.writeFile(workbook, 'pagos.xlsx');
  };

  return (
    <>
      <GenericList
        data={payments.map(p => ({
          ...p,
          valor_total: (p.historial?.reduce((sum, item) => sum + item.precio_curso, 0) || 0) + p.matricula
        }))}
        columns={columns}
        onView={handleView}
        onExportPdf={handleExportExcel} // Update this prop
        title="Gestión de Pagos"
      />
      
      <DetailModal
        title={`Detalle del Pago: ${selectedPayment?.id}`}
        data={selectedPayment}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default Pagos;
