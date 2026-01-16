/**
 * Muestra la vaquita ya activa
 * Solo lectura: participantes + fechas de cobro
 */
export default function VaquitaActiva({
  config,
  participantes,
  onFinalizar,
}) {
  const hoy = new Date();

  const ultimoCobro =
    participantes[participantes.length - 1].fechaCobro;

  const esUltimoDia =
    hoy.toDateString() === ultimoCobro.toDateString();

  return (
    <section>
      <h2>Vaquita en curso</h2>

      <p>
        Monto semanal: <strong>{config.monto} €</strong>
      </p>

      <p>
        Día de cobro: <strong>{config.diaCobro}</strong>
      </p>

      <ul>
        {participantes.map((p) => (
          <li key={p.personaId}>
            {p.ordenCobro}. {p.nombre} —{" "}
            {p.fechaCobro.toLocaleDateString()}
          </li>
        ))}
      </ul>

      {esUltimoDia && (
        <button onClick={onFinalizar}>
          🎉 Cerrar vaquita
        </button>
      )}
    </section>
  );
}
