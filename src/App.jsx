import { useState } from "react";
import { calcularPrimerCobro, sumarSemanas } from "./utils/dateUtils";

// Componentes
import ConfigVaquita from "./components/ConfigVaquita";
import AddPersona from "./components/AddPersona";
import SeleccionParticipantes from "./components/SeleccionParticipantes";
import OrdenCobro from "./components/OrdenCobro";
import ResumenPreInicio from "./components/ResumenPreInicio";
import VaquitaActiva from "./components/VaquitaActiva";
import PantallaFinalVaquita from "./components/PantallaFinalVaquita";
import HistoricoVaquitas from "./components/HistoricoVaquitas";

/**
 * Estados posibles de la vaquita
 */
const ESTADOS = {
  NO_INICIADA: "NO_INICIADA",
  ACTIVA: "ACTIVA",
  FINAL_FELIZ: "FINAL_FELIZ",
  CERRADA: "CERRADA",
};

export default function App() {
  // =========================
  // ESTADOS
  // =========================

  const [estado, setEstado] = useState(ESTADOS.NO_INICIADA);
  const [personas, setPersonas] = useState([]);
  const [config, setConfig] = useState({
    monto: "",
    frecuencia: "semanal",
    diaCobro: "viernes",
    fechaInicio: new Date(),
  });
  const [participantes, setParticipantes] = useState([]);
  const [historico, setHistorico] = useState([]);

  // =========================
  // FUNCIONES DE NEGOCIO
  // =========================

  const onAddPersona = (nombre) => {
    setPersonas((prev) => [
      ...prev,
      { id: Date.now(), nombre, participa: false },
    ]);
  };

  const toggleParticipa = (id) => {
    setPersonas((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, participa: !p.participa } : p
      )
    );
  };

  const construirParticipantes = () => {
    const seleccionados = personas.filter((p) => p.participa);
    setParticipantes(
      seleccionados.map((p) => ({
        personaId: p.id,
        nombre: p.nombre,
        ordenCobro: null,
      }))
    );
  };

  const iniciarVaquita = () => {
    setEstado(ESTADOS.ACTIVA);
  };

  /**
   * Guarda la vaquita y pasa a pantalla final
   */
  const irAFinalFeliz = () => {
    setHistorico((prev) => [
      ...prev,
      {
        id: Date.now(),
        config,
        participantes,
      },
    ]);
    setEstado(ESTADOS.FINAL_FELIZ);
  };

  /**
   * Vuelve al inicio manteniendo las personas
   */
  const volverAlInicio = () => {
    setEstado(ESTADOS.NO_INICIADA);

    setPersonas((prev) =>
      prev.map((p) => ({ ...p, participa: false }))
    );

    setParticipantes([]);
    setConfig({
      monto: "",
      frecuencia: "semanal",
      diaCobro: "viernes",
      fechaInicio: new Date(),
    });
  };

  /**
   * Validación antes de iniciar la vaquita
   */
  const puedeIniciarVaquita = () => {
    if (!config.monto || Number(config.monto) <= 0) return false;
    if (!config.diaCobro) return false;
    if (participantes.length === 0) return false;

    const ordenes = participantes.map((p) => p.ordenCobro);
    if (ordenes.some((o) => !o)) return false;

    const unicos = new Set(ordenes);
    if (unicos.size !== ordenes.length) return false;

    return true;
  };

  /**
   * Cálculo de fechas (derivado)
   */
  const participantesConFechas = () => {
    const primerCobro = calcularPrimerCobro(
      config.fechaInicio,
      config.diaCobro
    );

    return participantes
      .slice()
      .sort((a, b) => a.ordenCobro - b.ordenCobro)
      .map((p, index) => ({
        ...p,
        fechaCobro: sumarSemanas(primerCobro, index),
      }));
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>💰 Vaquita</h1>

      {estado === ESTADOS.NO_INICIADA && (
        <>
          <ConfigVaquita config={config} setConfig={setConfig} />
          <AddPersona onAddPersona={onAddPersona} />

          <SeleccionParticipantes
            personas={personas}
            toggleParticipa={toggleParticipa}
            onConfirmar={construirParticipantes}
          />

          {participantes.length > 0 && (
            <>
              <OrdenCobro
                participantes={participantes}
                setParticipantes={setParticipantes}
              />

              <ResumenPreInicio
                config={config}
                participantes={participantes}
              />

              {!puedeIniciarVaquita() && (
                <p style={{ color: "red" }}>
                  Completa el monto, el día de cobro y el orden de todos
                  los participantes
                </p>
              )}

              <button
                onClick={iniciarVaquita}
                disabled={!puedeIniciarVaquita()}
              >
                Iniciar Vaquita
              </button>
            </>
          )}

          <hr />
          <HistoricoVaquitas historico={historico} />
        </>
      )}

      {estado === ESTADOS.ACTIVA && (
        <VaquitaActiva
          config={config}
          participantes={participantesConFechas()}
          onFinalizar={irAFinalFeliz}
        />
      )}

      {estado === ESTADOS.FINAL_FELIZ && (
        <PantallaFinalVaquita onVolverInicio={volverAlInicio} />
      )}
    </div>
  );
}
