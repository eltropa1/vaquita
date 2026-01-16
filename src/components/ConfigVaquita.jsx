/**
 * Configuración básica de la vaquita
 * - Monto
 * - Frecuencia (dejamos semanal fija por ahora)
 * - Día de cobro
 * - Fecha de inicio
 */
export default function ConfigVaquita({ config, setConfig }) {
  return (
    <section>
      <h2>Configuración de la vaquita</h2>

      <label>
        Monto (€):
        <input
          type="number"
          value={config.monto}
          onChange={(e) => setConfig({ ...config, monto: e.target.value })}
        />
      </label>

      <br />

      <label>
        Día de cobro:
        <select
          value={config.diaCobro}
          onChange={(e) => setConfig({ ...config, diaCobro: e.target.value })}
        >
          <option value="domingo">Domingo</option>
          <option value="lunes">Lunes</option>
          <option value="martes">Martes</option>
          <option value="miercoles">Miercoles</option>
          <option value="jueves">Jueves</option>
          <option value="viernes">Viernes</option>
                    <option value="sabado">Sabado</option>
        </select>
      </label>

      <br />

      <label>
        Fecha de inicio:
        <input
          type="date"
          value={config.fechaInicio.toISOString().substring(0, 10)}
          onChange={(e) =>
            setConfig({
              ...config,
              fechaInicio: new Date(e.target.value),
            })
          }
        />
      </label>
    </section>
  );
}
