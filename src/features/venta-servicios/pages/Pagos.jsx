import { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const Pagos = () => {
  // Initial payments data
  const [payments, setPayments] = useState([
    { 
      id: 1, 
      cliente: 'Giacomo Guilizzoni', 
      estudiante: 'Camilo Guilizzoni', 
      curso: 'Guitarra', 
      clases: 4, 
      valor_curso: 250000, 
      debes: 0, 
      estado: true
    },
    { 
      id: 2, 
      cliente: 'María Rodríguez', 
      estudiante: 'Carlos Rodríguez', 
      curso: 'Piano', 
      clases: 6, 
      valor_curso: 300000, 
      debes: 50000, 
      estado: true 
    },
    { 
      id: 3, 
      cliente: 'Juan Pérez', 
      estudiante: 'Ana Pérez', 
      curso: 'Violín', 
      clases: 5, 
      valor_curso: 280000, 
      debes: 30000, 
      estado: true 
    },
    { 
      id: 4, 
      cliente: 'Laura Martínez', 
      estudiante: 'Diego Martínez', 
      curso: 'Batería', 
      clases: 3, 
      valor_curso: 220000, 
      debes: 0, 
      estado: true 
    },
    { 
      id: 5, 
      cliente: 'Roberto Sánchez', 
      estudiante: 'Elena Sánchez', 
      curso: 'Saxofón', 
      clases: 7, 
      valor_curso: 350000, 
      debes: 100000, 
      estado: true 
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
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedPayment(null);
    setFormModalOpen(true);
  };

  const handleEdit = (payment) => {
    setIsEditing(true);
    setSelectedPayment(payment);
    setFormModalOpen(true);
  };

  const handleDelete = (payment) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar el pago con ID ${payment.id}?`);
    if (confirmDelete) {
      setPayments(prev => prev.filter(item => item.id !== payment.id));
    }
  };

  const handleView = (payment) => {
    setSelectedPayment(payment);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedPayment(null);
  };

  const handleCloseForm = () => {
    setFormModalOpen(false);
    setSelectedPayment(null);
    setIsEditing(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      setPayments(prev => prev.map(item => 
        item.id === selectedPayment.id ? { ...formData } : item
      ));
    } else {
      // Generate a new ID for new payments
      const newId = Math.max(...payments.map(p => p.id)) + 1;
      setPayments(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseForm();
  };

  const handleToggleStatus = (paymentId) => {
    setPayments(prev => prev.map(item => 
      item.id === paymentId ? { ...item, estado: !item.estado } : item
    ));
  };

  const columns = [
    { id: 'id', label: 'Nro Pago' },
    { id: 'cliente', label: 'Cliente' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'curso', label: 'Curso' },
    { id: 'clases', label: 'Clases' },
    { id: 'valor_curso', label: 'Valor Curso', render: (value) => `$${value.toLocaleString()}` },
    { id: 'debes', label: 'Debe', render: (value) => `$${value.toLocaleString()}` },
    { 
      id: 'estado', 
      label: 'Estado',
      render: (value, row) => (
        <StatusButton 
          active={value} 
          onClick={() => handleToggleStatus(row.id)}
        />
      )
    }
  ];

  const detailFields = [
    { id: 'id', label: 'Nro Pago' },
    { id: 'cliente', label: 'Cliente' },
    { id: 'estudiante', label: 'Estudiante' },
    { id: 'curso', label: 'Curso' },
    { id: 'clases', label: 'Clases' },
    { id: 'valor_curso', label: 'Valor Curso', render: (value) => `$${value.toLocaleString()}` },
    { id: 'debes', label: 'Debe', render: (value) => `$${value.toLocaleString()}` },
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const formFields = [
    { 
      id: 'cliente', 
      label: 'Cliente', 
      type: 'text',
      required: true
    },
    { 
      id: 'estudiante', 
      label: 'Estudiante', 
      type: 'text',
      required: true
    },
    { 
      id: 'curso', 
      label: 'Curso', 
      type: 'text',
      required: true
    },
    { 
      id: 'clases', 
      label: 'Clases', 
      type: 'number',
      required: true,
      min: 1
    },
    { 
      id: 'valor_curso', 
      label: 'Valor Curso', 
      type: 'number',
      required: true,
      min: 0
    },
    { 
      id: 'debes', 
      label: 'Debe', 
      type: 'number',
      required: true,
      min: 0
    },
    { 
      id: 'estado', 
      label: 'Estado', 
      type: 'switch',
      defaultValue: true
    }
  ];

  return (
    <>
      <GenericList
        data={payments}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onView={handleView}
        title="Gestión de Pagos"
      />
      
      <DetailModal
        title={`Detalle del Pago ${selectedPayment?.id}`}
        data={selectedPayment}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />

      <FormModal
        title={isEditing ? 'Editar Pago' : 'Crear Nuevo Pago'}
        fields={formFields}
        initialData={selectedPayment}
        open={formModalOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Pagos;