import React from "react";


const SidebarSinistra = ({ player }) => {
  if (!player) return null;

  // Assicura che lo status sia compreso tra 0 e 5
  const status = Math.max(0, Math.min(player.statistiche.status ?? 1, 5));
  const stellePiene = "★".repeat(status);
  const stelleVuote = "☆".repeat(5 - status);

  // Controllo pet (se presente)
  const hasPet = player.pet?.nome && player.pet?.affinita !== undefined;
  const affinitaPet = hasPet ? Math.max(0, Math.min(player.pet.affinita, 100)) : null;

  return (
    <div className="sidebar sidebar-sinistra">
      {/* Logo del percorso sopra il nome */}
      <img
        src={`/src/assets/logos/${player.percorso.toLowerCase()}.png`}
        alt={`${player.percorso} Logo`}
        className="logo-percorso"
      />

      <h2>{player.nome} {player.cognome}</h2>
      <p><strong>{player.percorso}</strong></p>

      {/* Avatar del personaggio */}
      <div className="avatar-container">
        <img
          src={`/src/assets/${player.avatar}`}
          alt="Avatar"
          className="avatar"
        />
      </div>

      {/* Fondi e status */}
      <div className="info-giocatore">
        <p><strong>Fondi (€):</strong> {player.fondi ?? 40}</p>
        <p><strong>Status:</strong> {stellePiene}{stelleVuote}</p>
      </div>

      {/* Mostra Affinità Pet se il pet è stato adottato */}
      {hasPet && (
        <div className="pet-info">
          <p><strong>🐾 {player.pet.nome}</strong></p>
          <p><strong>Affinità:</strong> {affinitaPet}/100</p>
        </div>
      )}

      {/* Accordion per le statistiche */}
      <div className="accordion" id="accordionStats">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingStats">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseStats"
              aria-expanded="false"
              aria-controls="collapseStats"
            >
              Statistiche
            </button>
          </h2>
          <div
            id="collapseStats"
            className="accordion-collapse collapse"
            aria-labelledby="headingStats"
            data-bs-parent="#accordionStats"
          >
            <div className="accordion-body">
              <p><strong>Carisma:</strong> {player.statistiche.carisma}</p>
              <p><strong>Intelligenza:</strong> {player.statistiche.intelligenza}</p>
              <p><strong>Resistenza:</strong> {player.statistiche.resistenza}</p>
              {player.percorso !== "Nerd" && (
                <p><strong>Maestria Musicale:</strong> {player.statistiche.maestria_musicale}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accordion per informazioni sul percorso */}
      <div className="accordion" id="accordionPercorso">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingPercorso">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePercorso"
              aria-expanded="false"
              aria-controls="collapsePercorso"
            >
              Informazioni sul Percorso
            </button>
          </h2>
          <div
            id="collapsePercorso"
            className="accordion-collapse collapse"
            aria-labelledby="headingPercorso"
            data-bs-parent="#accordionPercorso"
          >
            <div className="accordion-body">
              {player.percorso === "Goth" || player.percorso === "Metallaro" ? (
                <>
                  <p><strong>Band:</strong> {player.band}</p>
                  <p><strong>Strumento:</strong> {player.strumento}</p>
                </>
              ) : player.percorso === "Nerd" ? (
                player.tipo_gamer === "Videogiocatore" ? (
                  <>
                    <p><strong>Genere preferito:</strong> {player.genere_videogiochi}</p>
                    <p><strong>Piattaforma:</strong> {player.piattaforma}</p>
                  </>
                ) : player.tipo_gamer === "Giocatore di Ruolo" ? (
                  <>
                    <p><strong>GDR preferito:</strong> {player.gdr_preferito}</p>
                    <p><strong>Ruolo abituale:</strong> {player.ruolo_gdr}</p>
                  </>
                ) : (
                  <p>Nessuna informazione specifica per questo percorso.</p>
                )
              ) : (
                <p>Nessuna informazione specifica per questo percorso.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSinistra;
