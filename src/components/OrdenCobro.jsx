/**
 * Asignación manual del orden de cobro
 */
export default function OrdenCobro({
  participantes,
  setParticipantes,
}) {
  const updateOrden = (id, orden) => {
    setParticipantes((prev) =>
      prev.map((p) =>
        p.personaId === id
          ? { ...p, ordenCobro: Number(orden) }
          : p
      )
    );
  };

  return (
    <section>
      <h2>Orden de cobro</h2>

      <p>
        Introduce el orden decidido en el sorteo
      </p>

      <ul>
        {participantes.map((p) => (
          <li key={p.personaId}>
            {p.nombre} →
            <input
              type="number"
              min="1"
              value={p.ordenCobro || ""}
              onChange={(e) =>
                updateOrden(p.personaId, e.target.value)
              }
              style={{ width: 60, marginLeft: 10 }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
