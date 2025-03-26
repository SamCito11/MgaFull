import { useState } from 'react';
import { GenericList } from '../../../shared/components/GenericList';
import { DetailModal } from '../../../shared/components/DetailModal';
import { FormModal } from '../../../shared/components/FormModal';
import { StatusButton } from '../../../shared/components/StatusButton';

const Roles = () => {
  // Initial roles data
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      nombre: 'Administrador', 
      descripcion: 'Control total del sistema', 
      fecha: '5/11/2024', 
      estado: true 
    },
    { 
      id: 2, 
      nombre: 'Secretario', 
      descripcion: 'Gestión administrativa', 
      fecha: '5/11/2024', 
      estado: true 
    },
    { 
      id: 3, 
      nombre: 'Profesor', 
      descripcion: 'Gestión de cursos y estudiantes', 
      fecha: '5/11/2024', 
      estado: true 
    },
    { 
      id: 4, 
      nombre: 'Estudiantes', 
      descripcion: 'Acceso limitado para estudiantes', 
      fecha: '5/11/2024', 
      estado: true 
    }
  ]);

  const [selectedRole, setSelectedRole] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreate = () => {
    setIsEditing(false);
    setSelectedRole(null);
    setFormModalOpen(true);
  };

  const handleEdit = (role) => {
    setIsEditing(true);
    setSelectedRole(role);
    setFormModalOpen(true);
  };

  const handleDelete = (role) => {
    const confirmDelete = window.confirm(`¿Está seguro de eliminar el rol ${role.nombre}?`);
    if (confirmDelete) {
      setRoles(prev => prev.filter(item => item.id !== role.id));
    }
  };

  const handleView = (role) => {
    setSelectedRole(role);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedRole(null);
  };

  const handleCloseForm = () => {
    setFormModalOpen(false);
    setSelectedRole(null);
    setIsEditing(false);
  };

  const handleSubmit = (formData) => {
    if (isEditing) {
      setRoles(prev => prev.map(item => 
        item.id === selectedRole.id ? { ...formData, id: item.id } : item
      ));
    } else {
      // Generate a new ID for new roles
      const newId = Math.max(...roles.map(r => r.id)) + 1;
      const today = new Date().toLocaleDateString();
      setRoles(prev => [...prev, { ...formData, id: newId, fecha: today }]);
    }
    handleCloseForm();
  };

  const handleToggleStatus = (roleId) => {
    setRoles(prev => prev.map(item => 
      item.id === roleId ? { ...item, estado: !item.estado } : item
    ));
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'descripcion', label: 'Descripción' },
    { id: 'fecha', label: 'Fecha Creación' },
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
    { id: 'id', label: 'ID' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'descripcion', label: 'Descripción' },
    { id: 'fecha', label: 'Fecha Creación' },
    { id: 'estado', label: 'Estado', render: (value) => <StatusButton active={value} /> }
  ];

  const formFields = [
    { 
      id: 'nombre', 
      label: 'Nombre', 
      type: 'text',
      required: true
    },
    { 
      id: 'descripcion', 
      label: 'Descripción', 
      type: 'text',
      required: true
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
        data={roles}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onView={handleView}
        title="Gestión de Roles"
      />
      
      <DetailModal
        title={`Detalle del Rol: ${selectedRole?.nombre}`}
        data={selectedRole}
        fields={detailFields}
        open={detailModalOpen}
        onClose={handleCloseDetail}
      />

      <FormModal
        title={isEditing ? 'Editar Rol' : 'Crear Nuevo Rol'}
        fields={formFields}
        initialData={selectedRole}
        open={formModalOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Roles;