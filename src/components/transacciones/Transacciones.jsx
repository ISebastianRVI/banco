import './Transacciones.css'
import { Link } from 'react-router-dom'

const movimientos = [
  { id: 'T-1001', tipo: 'Depósito', cuenta: 'Ahorros', monto: '$500', fecha: '2025-10-10' },
  { id: 'T-1002', tipo: 'Retiro', cuenta: 'Corriente', monto: '$200', fecha: '2025-10-12' },
]

const Transacciones = () => {
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
          <Link className="item" to="/prestamos">📝 Solicitudes de Préstamos</Link>
          <Link className="item active" to="/transacciones">💳 Transacciones</Link>
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
          <h2>Transacciones</h2>
          <p className="muted">Historial de movimientos.</p>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Cuenta</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map(m => (
                  <tr key={m.id}>
                    <td className="link">{m.id}</td>
                    <td>{m.tipo}</td>
                    <td>{m.cuenta}</td>
                    <td>{m.monto}</td>
                    <td>{m.fecha}</td>
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

export default Transacciones
