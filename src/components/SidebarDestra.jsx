import React, { useState, useEffect } from "react";
//import "../styles/sidebardestra.scss";

const SidebarDestra = ({ player }) => {
  const [materie, setMaterie] = useState(null);

  useEffect(() => {
    const savedMaterie = JSON.parse(localStorage.getItem("urban_legacy_materie"));
    if (savedMaterie) {
      setMaterie(savedMaterie);
    } else {
      setMaterie([]); // Fallback per evitare errori
    }
  }, []);

  return (
    <div className="sidebar sidebar-destra">
      <h2>Notifiche</h2>
      <p>Prossima verifica: {materie?.prossima_verifica || "Nessuna verifica imminente"}</p>
      <p>Materie di oggi: {materie?.materia ? materie.materia.join(", ") : "Non disponibile"}</p>

      <h3>Valutazioni Scolastiche</h3>
      <ul>
        {materie && materie.voti ? (
          Object.entries(materie.voti).map(([materia, voto]) => (
            <li key={materia}>
              {materia}: {voto}
            </li>
          ))
        ) : (
          <p>Nessun voto registrato</p>
        )}
      </ul>
    </div>
  );
};

export default SidebarDestra;
