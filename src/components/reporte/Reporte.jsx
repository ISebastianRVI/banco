import './Reporte.css'
import { Link } from 'react-router-dom'

const Reporte = () => {
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
          <Link className="item active" to="/reporte">📊 Reportes Financieros</Link>
          <Link className="item" to="/prestamos">📝 Solicitudes de Préstamos</Link>
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
          <h2>Reportes Financieros</h2>
          <p className="muted">Resumen y gráficos de estado financiero.</p>

          <div className="cards">
            <div className="card">
              <h3 className="card-title">Ingresos Totales</h3>
              <div className="card-value">$12,345</div>
            </div>
            <div className="card">
              <h3 className="card-title">Egresos</h3>
              <div className="card-value">$4,321</div>
            </div>
            <div className="card">
              <h3 className="card-title">Balance</h3>
              <div className="card-value">$8,024</div>
            </div>
            <div className="card">
              <h3 className="card-title">Clientes Activos</h3>
              <div className="card-value">1,234</div>
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Reporte
