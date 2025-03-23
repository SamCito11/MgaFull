import { useState } from 'react';
import { Link } from 'react-router-dom';
import TeAcuerdasLogo from '../../assets/TeAcuerdas.png';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  Security,
  Settings,
  MusicNote,
  ShoppingCart,
  People,
  Person,
  VpnKey,
  School,
  Schedule,
  Class,
  MeetingRoom,
  Payment,
  AssignmentTurnedIn
} from '@mui/icons-material';

const Navigation = () => {
  const [openMenus, setOpenMenus] = useState({});

  const handleSubmenuClick = (key) => {
    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <Dashboard />
    },
    {
      label: 'Configuración',
      icon: <Settings />,
      submenu: [
        { label: 'Roles', path: '/configuracion/roles', icon: <VpnKey /> },
        { label: 'Usuarios', path: '/configuracion/usuarios', icon: <Person /> },
        { label: 'Privilegios', path: '/configuracion/privilegios', icon: <Security /> }
      ]
    },
    {
      label: 'Servicios Musicales',
      icon: <MusicNote />,
      submenu: [
        { label: 'Profesores', path: '/servicios-musicales/profesores', icon: <People /> },
        { label: 'Programación de Profesores', path: '/servicios-musicales/programacion-profesores', icon: <Schedule /> },
        { label: 'Cursos/Matrículas', path: '/servicios-musicales/cursos-matriculas', icon: <School /> },
        { label: 'Aulas', path: '/servicios-musicales/aulas', icon: <MeetingRoom /> },
        { label: 'Clases', path: '/servicios-musicales/clases', icon: <Class /> }
      ]
    },
    {
      label: 'Venta de Servicios',
      icon: <ShoppingCart />,
      submenu: [
        { label: 'Clientes', path: '/venta-servicios/clientes', icon: <People /> },
        { label: 'Estudiantes', path: '/venta-servicios/estudiantes', icon: <School /> },
        { label: 'Venta de Matrículas', path: '/venta-servicios/venta-matriculas', icon: <ShoppingCart /> },
        { label: 'Venta de Cursos', path: '/venta-servicios/venta-cursos', icon: <ShoppingCart /> },
        { label: 'Pagos', path: '/venta-servicios/pagos', icon: <Payment /> },
        { label: 'Programación de Clases', path: '/venta-servicios/programacion-clases', icon: <Schedule /> },
        { label: 'Asistencia', path: '/venta-servicios/asistencia', icon: <AssignmentTurnedIn /> }
      ]
    }
  ];

  const renderMenuItem = (item) => {
    if (item.submenu) {
      return (
        <div key={item.label}>
          <ListItemButton onClick={() => handleSubmenuClick(item.label)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
            {openMenus[item.label] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.submenu.map((subItem) => (
                <ListItemButton
                  key={subItem.path}
                  component={Link}
                  to={subItem.path}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      );
    }

    return (
      <ListItemButton
        key={item.path}
        component={Link}
        to={item.path}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: '#0455a2',
          color: 'white',
          '& .MuiListItemIcon-root': {
            minWidth: '40px',
            color: 'white !important'
          },
          '& .MuiListItemButton-root': {
            padding: '12px 24px',
            color: 'white !important',
            '& .MuiListItemText-primary': {
              color: 'white !important'
            },
            '&:hover': {
              backgroundColor: '#6c8221',
              transition: 'all 0.3s ease',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: 'white !important'
              }
            }
          }
        },
        '& .MuiPaper-root': {
          background: 'linear-gradient(180deg, #0455a2 0%, #033b70 100%)',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
          '& .MuiListItemText-root': {
            '& .MuiTypography-root': {
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'white !important'
            }
          }
        }
      }}
    >
      <List sx={{ pt: 4, pb: 3 }}>
        <div style={{ 
          height: '180px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '0px',  
          padding: '20px',
          marginTop: '10px'
        }}>
          <img 
            src={TeAcuerdasLogo} 
            alt="Logo" 
            style={{ 
              height: '160px',  
              width: '260px',   
              objectFit: 'contain',
              maxWidth: '100%'
            }} 
          />
        </div>
        {menuItems.map(renderMenuItem)}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <ListItemButton
            component={Link}
            to="/auth"
            sx={{
              backgroundColor: '#6c8221',
              borderRadius: '8px',
              margin: '0 12px',
              '&:hover': {
                backgroundColor: '#7c9427'
              }
            }}
          >
            <ListItemIcon><Security /></ListItemIcon>
            <ListItemText primary="Autenticación" />
          </ListItemButton>
        </div>
      </List>
    </Drawer>
  );
};

export default Navigation;