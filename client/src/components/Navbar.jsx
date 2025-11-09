import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Box, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Banca Estebanquito
          </Typography>
          <Box>
            {isAuthenticated ? (
              <>
                <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                  {user?.nombre}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Iniciar Sesión
                </Button>
                <Button color="inherit" onClick={() => navigate('/register')}>
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;