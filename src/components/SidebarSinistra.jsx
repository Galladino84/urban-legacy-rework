import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SidebarSinistra = ({ player, onOpenInventory }) => {
  const [aspettoPet, setAspettoPet] = useState(player.pet?.immagine.replace(".png", "") || "cat1");

  if (!player) return null;

  const cambiaAspetto = (aspetto) => {
    setAspettoPet(aspetto);
    const updatedPlayer = { ...player, pet: { ...player.pet, immagine: `${aspetto}.png` } };
    localStorage.setItem("urban_legacy_player", JSON.stringify(updatedPlayer));
  };

  const getProgressBarColor = (affinita) => {
    if (affinita < 40) return "bg-danger";
    if (affinita < 60) return "bg-warning";
    return "bg-success";
  };

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
        <p><strong>Status:</strong> {"★".repeat(player.statistiche.status ?? 1) + "☆".repeat(5 - (player.statistiche.status ?? 1))}</p>
      </div>

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
                <p><strong>Tipo di Nerd:</strong> {player.tipo_gamer}</p>
              ) : (
                <p>Nessuna informazione specifica per questo percorso.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🐱 Se il giocatore ha un pet, mostra il box con l'affinità */}
      {player.pet && (
        <div className="accordion" id="accordionPet">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingPet">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePet"
                aria-expanded="false"
                aria-controls="collapsePet"
              >
                Il tuo Pet: {player.pet.nome}
              </button>
            </h2>
            <div
              id="collapsePet"
              className="accordion-collapse collapse"
              aria-labelledby="headingPet"
              data-bs-parent="#accordionPet"
            >
              <div className="accordion-body text-center">
                <img
                  src={`/src/assets/pets/${aspettoPet}.png`}
                  alt="Pet"
                  className="pet-avatar"
                />
                <p>
                  <strong>Affinità:</strong> {player.pet.affinita}/100
                  <span
                    className="ms-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="L'affinità del pet aumenta con le interazioni e il tempo!"
                  >
                    🛈
                  </span>
                </p>

                {/* Barra di progressione animata */}
                <div className="progress">
                  <div
                    className={`progress-bar progress-bar-striped progress-bar-animated ${getProgressBarColor(player.pet.affinita)}`}
                    role="progressbar"
                    style={{ width: `${player.pet.affinita}%` }}
                    aria-valuenow={player.pet.affinita}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                {/* Bottoni radio con anteprima mini del pet */}
                <div className="pet-selection mt-2 d-flex justify-content-center">
                  {["cat1", "cat2", "cat3"].map((cat) => (
                    <label key={cat} className="d-flex flex-column align-items-center mx-2">
                      <input
                        type="radio"
                        name="petAspetto"
                        value={cat}
                        checked={aspettoPet === cat}
                        onChange={() => cambiaAspetto(cat)}
                        className=""
                      />
                      <img src={`/src/assets/pets/${cat}.png`} alt={cat} className="pet-thumbnail" />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🗃️ Bottone per aprire l'inventario */}
      <div className="inventory-button-container mt-3">
        <button className="btn btn-primary w-100" onClick={onOpenInventory}>
          📦 Apri Inventario
        </button>
      </div>
    </div>
  );
};

export default SidebarSinistra;
