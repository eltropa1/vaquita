/**
 * Devuelve la próxima fecha que coincida con el día de la semana indicado
 * @param {Date} fechaInicio
 * @param {"jueves"|"viernes"} diaCobro
 */
export function calcularPrimerCobro(fechaInicio, diaCobro) {
  const target = diaCobro === "jueves" ? 4 : 5; // JS: 0=domingo
  const d = new Date(fechaInicio);
  const diff = (target + 7 - d.getDay()) % 7;
  d.setDate(d.getDate() + diff);
  return d;
}

/**
 * Suma semanas a una fecha
 * @param {Date} fecha
 * @param {number} semanas
 */
export function sumarSemanas(fecha, semanas) {
  const d = new Date(fecha);
  d.setDate(d.getDate() + semanas * 7);
  return d;
}
