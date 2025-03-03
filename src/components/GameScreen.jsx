import { useEffect, useState } from "react";

const GameScreen = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const savedPlayer = JSON.parse(localStorage.getItem("urban_legacy_player"));
    if (savedPlayer) {
      setPlayer(savedPlayer);
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      {player ? (
        <div>
          <h2>Benvenuto, {player.nome}!</h2>
          <img src={`/assets/${player.avatar}`} alt="Avatar" />
          <p>Status: {player.statistiche.status} ⭐</p>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default GameScreen;
