import React, { useState, useEffect } from "react";
//import "../styles/sezionecentrale.scss";

const SezioneCentrale = ({ player }) => {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    // Recupera l'evento corrente da localStorage o imposta un evento di default
    const savedEvento = JSON.parse(localStorage.getItem("urban_legacy_evento"));
    if (savedEvento) {
      setEvento(savedEvento);
    } else {
      setEvento({ testo: "Nessun evento disponibile al momento." }); // Fallback
    }
  }, []);

  return (
    <div className="sezione-centrale">
      <h2>Evento in corso</h2>
      <p>{evento ? evento.testo : "Caricamento..."}</p> {/* Controllo di sicurezza */}
    </div>
  );
};

export default SezioneCentrale;
