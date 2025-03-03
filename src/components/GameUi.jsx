import React, { useState, useEffect } from "react";
import SidebarSinistra from "./SidebarSinistra";
import SidebarDestra from "./SidebarDestra";
import SezioneCentrale from "./SezioneCentrale";


const GameUI = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const savedPlayer = JSON.parse(localStorage.getItem("urban_legacy_player"));
    if (savedPlayer) {
      setPlayer(savedPlayer);
    } else {
      window.location.href = "/"; // Reindirizza se il personaggio non è stato creato
    }
  }, []);

  return (
    <div
      className={`game-container ${player ? `tema_${player.percorso.toLowerCase()}` : ""} ${player ? `tema_${player.percorso.toLowerCase()}_${player.sesso.toLowerCase()}` : ""}`}
    >
      {player && (
        <>
          <SidebarSinistra player={player} />
          <SezioneCentrale player={player} />
          <SidebarDestra player={player} />
        </>
      )}
    </div>
  );
};

export default GameUI;
