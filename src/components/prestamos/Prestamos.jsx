import './Prestamos.css'
import { Link } from 'react-router-dom'

const solicitudes = [
  { id: 'P-001', nombre: 'Ana Lopez', monto: '$5,000', estado: 'Pendiente' },
  { id: 'P-002', nombre: 'Carlos Perez', monto: '$12,000', estado: 'Aprobado' },
]

const Prestamos = () => {
  return (
    <div className="contenedor">
      <aside className="sidebar">
        <div className="brand">
          <span className="logo">●●</span>
          <span>Estabanquito</span>
        </div>

        <nav className="menu">
          <p className="menu-title">MENÚ</p>
          <Link className="item" to="/inicio">🏠 Dashboard</Link>
          <Link className="item" to="/reporte">📊 Reportes Financieros</Link>
          <Link className="item active" to="/prestamos">📝 Solicitudes de Préstamos</Link>
          <Link className="item" to="/transacciones">💳 Transacciones</Link>
          <Link className="item" to="/gestion">👤 Gestión de Cuentas</Link>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="actions">
            <div className="avatar">🧑🏽‍💻</div>
          </div>
        </header>

        <section className="panel">
          <h2>Solicitudes de Préstamos</h2>
          <p className="muted">Revisa y gestiona las solicitudes.</p>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Montó</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map(s => (
                  <tr key={s.id}>
                    <td className="link">{s.id}</td>
                    <td>{s.nombre}</td>
                    <td>{s.monto}</td>
                    <td>{s.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Prestamos
