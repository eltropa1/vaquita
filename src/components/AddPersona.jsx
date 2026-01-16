import { useState } from "react";

/**
 * Añade una persona a la lista base
 */
export default function AddPersona({ onAddPersona }) {
  const [nombre, setNombre] = useState("");

  const handleAdd = () => {
    if (!nombre.trim()) return;
    onAddPersona(nombre.trim());
    setNombre("");
  };

  return (
    <section>
      <h2>Añadir persona</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button onClick={handleAdd}>Añadir</button>
    </section>
  );
}
