import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSaldo, realizarTransferencia, getHistorialTransacciones, solicitarPrestamo } from '../services/api';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';

const Dashboard = () => {
  const [saldo, setSaldo] = useState(0);
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [transferencia, setTransferencia] = useState({ monto: '', cuenta_destino: '' });
  const [prestamo, setPrestamo] = useState({ monto: '', plazo: '' });
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [saldoData, historialData] = await Promise.all([
          getSaldo(),
          getHistorialTransacciones(),
        ]);
        setSaldo(saldoData.saldo);
        setNumeroCuenta(saldoData.numero_cuenta);
        setHistorial(historialData);
      } catch (error) {
        setError('Error al cargar los datos', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTransferencia = async (e) => {
    e.preventDefault();
    try {
      await realizarTransferencia(
        parseFloat(transferencia.monto),
        transferencia.cuenta_destino
      );
      const [saldoData, historialData] = await Promise.all([
        getSaldo(),
        getHistorialTransacciones(),
      ]);
      setSaldo(saldoData.saldo);
      setHistorial(historialData);
      setTransferencia({ monto: '', cuenta_destino: '' });
      setError('');
    } catch (error) {
      setError('Error al realizar la transferencia'), error;
    }
  };

  const handlePrestamo = async (e) => {
    e.preventDefault();
    try {
      await solicitarPrestamo(parseFloat(prestamo.monto), parseInt(prestamo.plazo));
      const [saldoData, historialData] = await Promise.all([
        getSaldo(),
        getHistorialTransacciones(),
      ]);
      setSaldo(saldoData.saldo);
      setHistorial(historialData);
      setPrestamo({ monto: '', plazo: '' });
      setError('');
    } catch (error) {
      setError('Error al solicitar préstamo'), error;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Información de la cuenta */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#1976d2',
              color: 'white',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Bienvenido, {user?.nombre}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
              ${saldo?.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1">
              Saldo Disponible
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
              N° Cuenta: {numeroCuenta}
            </Typography>
          </Paper>
        </Grid>

        {/* Formulario de transferencia */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Realizar Transferencia
            </Typography>
            <Box component="form" onSubmit={handleTransferencia}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Monto"
                    type="number"
                    value={transferencia.monto}
                    onChange={(e) =>
                      setTransferencia({ ...transferencia, monto: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cuenta Destino"
                    value={transferencia.cuenta_destino}
                    onChange={(e) =>
                      setTransferencia({
                        ...transferencia,
                        cuenta_destino: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                  >
                    Transferir
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Formulario de préstamo */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Solicitar Préstamo
            </Typography>
            <Box component="form" onSubmit={handlePrestamo}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Monto"
                    type="number"
                    value={prestamo.monto}
                    onChange={(e) =>
                      setPrestamo({ ...prestamo, monto: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Plazo (meses)"
                    type="number"
                    value={prestamo.plazo}
                    onChange={(e) =>
                      setPrestamo({
                        ...prestamo,
                        plazo: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                  >
                    Solicitar Préstamo
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Historial de transacciones */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Historial de Transacciones
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Cuenta</TableCell>
                    <TableCell>Origen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historial.map((transaccion) => (
                    <TableRow key={transaccion.id}>
                      <TableCell>
                        {new Date(transaccion.fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaccion.tipo}</TableCell>
                      <TableCell>
                        ${transaccion.monto.toLocaleString()}
                      </TableCell>
                      <TableCell>{transaccion.tipo === 'DEPOSITO' ? transaccion.cuenta_origen : transaccion.cuenta_destino}</TableCell>
                      <TableCell>{transaccion.origen_nombre || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;