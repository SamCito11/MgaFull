import { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Container 
} from '@mui/material';
// Update these imports
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../data/mockUsers';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      login(user);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        height: '100vh', // Set to full viewport height
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mt: -10// Remove margin to center vertically
      }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" align="center" sx={{ mb: 4, color: '#0455a2' }}>
            Iniciar Sesión
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              
              <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                sx={{ 
                  mt: 2,
                  backgroundColor: '#0455a2',
                  '&:hover': {
                    backgroundColor: '#7c9427'
                  }
                }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Auth;