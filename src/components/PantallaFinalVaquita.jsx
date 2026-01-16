/**
 * Pantalla final de celebración
 * La vaquita ya está guardada
 */
export default function PantallaFinalVaquita({ onVolverInicio }) {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <h1>🎉 Vaquita completada 🎉</h1>

      <p>
        Todos habéis cumplido.
        <br />
        Orgullo de grupo 💚
      </p>

      <div style={{ fontSize: 40, margin: "20px 0" }}>
        ✨ 🎆 ✨
      </div>

      <button onClick={onVolverInicio}>
        Empezar nueva vaquita
      </button>
    </section>
  );
}
