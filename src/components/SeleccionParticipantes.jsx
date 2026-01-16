/**
 * Selección de participantes de la vaquita
 */
export default function SeleccionParticipantes({
  personas,
  toggleParticipa,
  onConfirmar,
}) {
  return (
    <section>
      <h2>Seleccionar participantes</h2>

      {personas.length === 0 && <p>No hay personas aún</p>}

      <ul>
        {personas.map((p) => (
          <li key={p.id}>
            <label>
              <input
                type="checkbox"
                checked={p.participa}
                onChange={() => toggleParticipa(p.id)}
              />
              {p.nombre}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={onConfirmar}>
        Confirmar participantes
      </button>
    </section>
  );
}
