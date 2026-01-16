/**
 * Muestra el histórico de vaquitas cerradas
 * Solo lectura
 */
export default function HistoricoVaquitas({ historico }) {
  if (historico.length === 0) {
    return (
      <section>
        <h2>Histórico</h2>
        <p>No hay vaquitas anteriores todavía</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Histórico de vaquitas</h2>

      <ul>
        {historico.map((v) => (
          <li key={v.id} style={{ marginBottom: 10 }}>
            <strong>{v.config.monto} €</strong> —{" "}
            {v.participantes.length} participantes —{" "}
            {v.config.diaCobro}
          </li>
        ))}
      </ul>
    </section>
  );
}
