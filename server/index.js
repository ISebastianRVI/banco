import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const { Pool } = pg;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  password: '27054',
  host: 'localhost',
  port: 5432,
  database: 'banca_estebanquito'
});

pool.connect(async (err, client, release) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida correctamente');
  release();
  
  // try {
  //   await client.query(`
  //     ALTER TABLE transacciones 
  //     ADD COLUMN IF NOT EXISTS cuenta_origen VARCHAR(255),
  //     ADD COLUMN IF NOT EXISTS origen_nombre VARCHAR(255)
  //   `);
  //   console.log('Columnas agregadas correctamente a la tabla transacciones');

  //   // Crear tabla de préstamos
  //   await client.query(`
  //     CREATE TABLE IF NOT EXISTS prestamos (
  //       id SERIAL PRIMARY KEY,
  //       usuario_id INT NOT NULL,
  //       monto DECIMAL(10, 2) NOT NULL,
  //       plazo INT NOT NULL,
  //       estado VARCHAR(50) NOT NULL DEFAULT 'pendiente',
  //       fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //       FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  //     )
  //   `);
  //   console.log('Tabla prestamos creada correctamente');
  // } catch (error) {
  //   console.error('Error al crear tabla o agregar columnas:', error);
  // } finally {
  //   release();
  // }
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 


app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Recibida solicitud de registro:', req.body);
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
      console.log('Campos faltantes:', { nombre: !!nombre, email: !!email, password: !!password });
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    console.log('Verificando email existente...');

    const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      console.log('Email ya registrado:', email);
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
    
    console.log('Generando hash de contraseña...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Insertando nuevo usuario...');
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
      [nombre, email, hashedPassword]
    );
    
    console.log('Usuario creado exitosamente:', result.rows[0]);
    
    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET, { expiresIn: '1d' });
    
    res.json({
      user: result.rows[0],
      token
    });
  } catch (error) {
    console.error('Error detallado en el registro:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail
    });
    
    if (error.code === '23505') { 
      res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    } else if (error.code === '42P01') {
      res.status(500).json({ error: 'Error: La tabla usuarios no existe. Por favor, verifica la estructura de la base de datos.' });
    } else {
      res.status(500).json({ 
        error: 'Error al registrar usuario. Por favor, intente nuevamente.',
        details: error.message
      });
    }
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

app.get('/api/cuenta/saldo', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT saldo, numero_cuenta FROM cuentas WHERE usuario_id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener saldo' });
  }
});

app.post('/api/transacciones/transferir', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { monto, cuenta_destino } = req.body;
    
    const saldoResult = await client.query(
      'SELECT saldo FROM cuentas WHERE usuario_id = $1',
      [req.user.id]
    );
    
    const saldoActual = saldoResult.rows[0].saldo;
    if (saldoActual < monto) {
      throw new Error('Saldo insuficiente');
    }
    
    await client.query(
      'UPDATE cuentas SET saldo = saldo - $1 WHERE usuario_id = $2',
      [monto, req.user.id]
    );
    
    await client.query(
      'UPDATE cuentas SET saldo = saldo + $1 WHERE numero_cuenta = $2',
      [monto, cuenta_destino]
    );
    
    const senderResult = await client.query(
      'SELECT usuarios.nombre, cuentas.numero_cuenta FROM usuarios JOIN cuentas ON usuarios.id = cuentas.usuario_id WHERE usuarios.id = $1',
      [req.user.id]
    );
    const sender = senderResult.rows[0];

    await client.query(
      'INSERT INTO transacciones (usuario_id, tipo, monto, cuenta_destino) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'TRANSFERENCIA', monto, cuenta_destino]
    );

    const recipientResult = await client.query(
      'SELECT usuario_id FROM cuentas WHERE numero_cuenta = $1',
      [cuenta_destino]
    );

    if (recipientResult.rows.length > 0) {
      await client.query(
        'INSERT INTO transacciones (usuario_id, tipo, monto, cuenta_origen, origen_nombre, cuenta_destino) VALUES ($1, $2, $3, $4, $5, $6)',
        [recipientResult.rows[0].usuario_id, 'DEPOSITO', monto, sender.numero_cuenta, sender.nombre, cuenta_destino]
      );
    }
    
    await client.query('COMMIT');
    res.json({ message: 'Transferencia exitosa' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/transacciones/historial', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transacciones WHERE usuario_id = $1 ORDER BY fecha DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

app.post('/api/prestamos/solicitar', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { monto, plazo } = req.body;

    if (!monto || !plazo) {
      return res.status(400).json({ error: 'Monto y plazo son requeridos' });
    }

    const prestamResult = await client.query(
      'INSERT INTO prestamos (usuario_id, monto, plazo, estado) VALUES ($1, $2, $3, $4) RETURNING id',
      [req.user.id, monto, plazo, 'pendiente']
    );

    await client.query(
      'UPDATE cuentas SET saldo = saldo + $1 WHERE usuario_id = $2',
      [monto, req.user.id]
    );

    await client.query(
      'UPDATE prestamos SET estado = $1 WHERE id = $2',
      ['aprobado', prestamResult.rows[0].id]
    );

    const userResult = await client.query(
      'SELECT nombre FROM usuarios WHERE id = $1',
      [req.user.id]
    );
    const userName = userResult.rows[0].nombre;

    await client.query(
      'INSERT INTO transacciones (usuario_id, tipo, monto, cuenta_destino, origen_nombre) VALUES ($1, $2, $3, $4, $5)',
      [req.user.id, 'PRESTAMO', monto, 'Préstamo Personal', userName]
    );

    await client.query('COMMIT');
    res.json({ 
      message: 'Préstamo solicitado y aprobado exitosamente',
      prestamo_id: prestamResult.rows[0].id
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get('/api/prestamos/historial', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM prestamos WHERE usuario_id = $1 ORDER BY fecha_solicitud DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener historial de préstamos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});