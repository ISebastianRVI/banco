import "./Inicio.css";

const dataMetricas = [
  { id: "saldo", titulo: "Saldo", valor: "$2.382", delta: "+0%", tono: "morado" },
  { id: "deudas", titulo: "Deudas", valor: "$21.300", delta: "+4.44%", tono: "amarillo", nota: "Interes de deuda" }
];

const filas = [
  { id: "1", cliente: "Juan David Zamorano", email: "example@gmail.com", creado: "26-03-2022", valor: "$1,779.53" },
  { id: "2", cliente: "Maria Jose", email: "example@gmail.com", creado: "06-02-2022", valor: "$2,215.78" },
  { id: "3", cliente: "Sebastian", email: "example@gmail.com", creado: "06-09-2021",  valor: "$3,183.60" },
  { id: "4", cliente: "Juan pipi", email: "example@gmail.com", creado: "07-11-2021",  valor: "$2,587.86" },
  { id: "5", cliente: "Eber", email: "example@gmail.com", creado: "06-05-2022",  precio: "$3,840.73" },
  { id: "6", cliente: "Patricio Estrella", email: "example@gmail.com", creado: "14-02-2022", valor: "$4,764.18" },
  { id: "7", cliente: "Bob Esponja", email: "example@gmail.com", creado: "15-08-2022", valor: "$1,892.45" },
  { id: "8", cliente: "Calamardo Hermoso", email: "example@gmail.com", creado: "02-01-2022", valor: "$2,165.39" },
];

const Inicio = () => {
  return (
    <div className="contenedor">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <span className="logo">●●</span>
          <span>Estabanquito</span>
        </div>

        <nav className="menu">
          <p className="menu-title">MENÚ</p>
          <a className="item active" href="#">
            <span>🏠</span> Dashboard
          </a>
          <a className="item" href="#">
            <span>📊</span> Reportes Financieros
          </a>
          <a className="item" href="#">
            <span>📝</span> Solicitudes de Préstamos
          </a>
          <a className="item" href="#">
            <span>💳</span> Transacciones
          </a>
          <a className="item" href="#">
            <span>👤</span> Gestión de Cuentas
          </a>
        </nav>
      </aside>


      <main className="main">

        <header className="topbar">
          <div className="actions">
            <div className="avatar">🧑🏽‍💻</div>
          </div>
        </header>

        <section className="cards">
          {dataMetricas.map((m) => (
            <article key={m.id} className="card">
              <div className={`icon ${m.tono}`} />
              <h3 className="card-title">{m.titulo}</h3>
              <div className="card-value">{m.valor}</div>
              <div className="card-sub">
                <span className={`badge ${m.delta.startsWith("-") ? "down" : "up"}`}>
                  {m.delta}
                </span>
                <span className="muted">{m.nota}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="panel">
          <div className="panel-head">
            <h3>Últimas operaciones</h3>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Creado</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.id}>
                    <td className="link">{f.id}</td>
                    <td>
                      <div className="user">
                        <div>
                          <div className="name">{f.cliente}</div>
                        </div>
                      </div>
                    </td>
                    <td>{f.creado}</td>
                    <td>{f.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Inicio;