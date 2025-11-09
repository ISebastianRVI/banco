import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{
          mt: 8,
          p: 4,
          textAlign: 'center',
          background: 'linear-gradient(to right bottom, #1976d2, #64b5f6)',
          color: 'white'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a Mi Banco
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Tu dinero, seguro y a tu alcance
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Gestiona tus finanzas de manera segura y eficiente con nuestra plataforma bancaria.
          Realiza transferencias, consulta tu saldo y mantén el control de tus transacciones.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/register')}
          sx={{
            mr: 2,
            backgroundColor: 'white',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            }
          }}
        >
          Crear Cuenta
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/login')}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: '#e3f2fd',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          Iniciar Sesión
        </Button>
      </Paper>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Nuestros Servicios
        </Typography>
        <Paper 
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Transferencias Seguras
          </Typography>
          <Typography variant="body1" textAlign="center">
            Realiza transferencias a cualquier cuenta de manera segura y rápida.
          </Typography>
        </Paper>

        <Paper 
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Control Total
          </Typography>
          <Typography variant="body1" textAlign="center">
            Accede a tu historial de transacciones y mantén el control de tus finanzas.
          </Typography>
        </Paper>

        <Paper 
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Seguridad Garantizada
          </Typography>
          <Typography variant="body1" textAlign="center">
            Tu dinero está protegido con los más altos estándares de seguridad.
          </Typography>
        </Paper>
      </Container>
    </Container>
  );
};

export default Home;