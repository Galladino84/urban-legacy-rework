import React, { useState, useEffect } from "react";
import SidebarSinistra from "./SidebarSinistra";
import SidebarDestra from "./SidebarDestra";
import SezioneCentrale from "./SezioneCentrale";
import InventoryModal from "./InventoryModal";
import { loadGoogleFont } from "../utils/loadFont"; // Funzione per caricare i font dinamicamente

const GameUI = () => {
  const [player, setPlayer] = useState(null);
  const [showInventory, setShowInventory] = useState(false);

  useEffect(() => {
    const savedPlayer = JSON.parse(localStorage.getItem("urban_legacy_player"));
    
    if (savedPlayer) {
      setPlayer(savedPlayer);

      // Mappa dei font per ogni percorso e genere
      const fonts = {
        goth: {
          maschio: "League Gothic",
          femmina: "League Gothic",
        },
        tabboz: {
          maschio: "Oswald",
          femmina: "Raleway",
        },
        metallaro: {
          maschio: "Bebas Neue",
          femmina: "Lobster",
        },
        nerd: {
          maschio: "Press Start 2P",
          femmina: "Pixelify Sans",
        },
      };

      // Prende il font corretto in base al percorso e sesso del giocatore
      const fontName = fonts[savedPlayer.percorso]?.[savedPlayer.sesso] || "Gothic A1";
      loadGoogleFont(fontName); // Carica dinamicamente il font
    } else {
      window.location.href = "/"; // Reindirizza se il personaggio non è stato creato
    }
  }, []);

  return (
    <div
      className={`game-container ${player ? `tema_${player.percorso.toLowerCase()}` : ""} 
                                  ${player ? `tema_${player.percorso.toLowerCase()}_${player.sesso.toLowerCase()}` : ""}`}
    >
      {player && (
        <>
          {/* Sidebar sinistra con il pulsante per aprire l'inventario */}
          <SidebarSinistra 
            player={player} 
            onOpenInventory={() => setShowInventory(true)} 
          />

          {/* Sezione centrale dove viene mostrato il contenuto del gioco */}
          <SezioneCentrale player={player} />

          {/* Sidebar destra */}
          <SidebarDestra player={player} />

          {/* Modal dell'inventario */}
          <InventoryModal 
            show={showInventory} 
            onClose={() => setShowInventory(false)} 
            inventory={player.inventory || []} 
          />
        </>
      )}
    </div>
  );
};

export default GameUI;