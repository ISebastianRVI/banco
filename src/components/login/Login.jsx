import { useNavigate } from 'react-router-dom'
import './Login.css';
import { useState } from 'react';

const Login = ({ valor }) => {
  const navigate = useNavigate();
  const [campo, setCampo] = useState('');
  const [pass, setPass] = useState('');

  const validateUser = () => {
    campo == 'Sebas' ? navigate('/dashboard', {state: { nombreUsuario: {campo}}}) : alert('No acceso')
  }

  return (
    <div id='contenedorLogin'>
      <h1>Hola, Bienvenido al Banco Estebanquito</h1>
      <input type="text" value={campo} onChange={(e) => setCampo(e.target.value)} placeholder="Usuario" className='inputLogin' />
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" className='inputLogin' />
      <button onClick={validateUser} className='button'>Iniciar Sesión</button>
      <button onClick={() => navigate('/register')} className='button'>Crear Cuenta</button>

      <h2>{valor}</h2>

    </div>
  )
}

export default Login;