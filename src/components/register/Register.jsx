import { useNavigate } from 'react-router-dom'
import "./Register.css";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const createUser = () => {

    if (!nombre, !apellidos, !telefono, !email, !pass) {
      alert('Todos los campos sin requeridos')
    } else {
      alert(`Bienvenido ${nombre} ${apellidos}`)
      navigate('/inicio')
    }
    
  }

  return (
    <div className="contenedor">
      <div id="contenedorRegister">
        <h3>Llena la siguiente informacion para registrarte y continuar.</h3>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="inputRegister"
        />
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellidos"
          className="inputRegister"
        />
        <input
          type="number"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Telefono"
          className="inputRegister"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          className="inputRegister"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Contraseña"
          className="inputRegister"
        />
        <button onClick={() => createUser()} className="button">Iniciar Cuenta</button>

      </div>
    </div>
  );
};

export default Register;
