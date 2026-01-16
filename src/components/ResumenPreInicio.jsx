import {
  calcularPrimerCobro,
  sumarSemanas,
} from "../utils/dateUtils";

/**
 * Resumen final antes de iniciar la vaquita
 */
export default function ResumenPreInicio({
  config,
  participantes,
}) {
  if (participantes.some((p) => !p.ordenCobro)) {
    return <p>Falta asignar algún orden</p>;
  }

  const primerCobro = calcularPrimerCobro(
    config.fechaInicio,
    config.diaCobro
  );

  const ordenados = participantes
    .slice()
    .sort((a, b) => a.ordenCobro - b.ordenCobro);

  return (
    <section>
      <h2>Resumen antes de iniciar</h2>

      <p>Monto: {config.monto} €</p>
      <p>Día de cobro: {config.diaCobro}</p>

      <ul>
        {ordenados.map((p, index) => (
          <li key={p.personaId}>
            {p.ordenCobro}. {p.nombre} →
            {sumarSemanas(primerCobro, index).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </section>
  );
}
