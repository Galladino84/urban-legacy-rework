import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss";

// Import JSON
import translations from "../data/translations.json";
import avatars from "../data/avatars.json";
import families from "../data/families.json";
import stats from "../data/stats_coefficients.json";
import instruments from "../data/instruments.json";
import bandNames from "../data/band_names.json";

const CharacterCreation = () => {
  const [step, setStep] = useState(1);
  const [lingua, setLingua] = useState("it");
  const [player, setPlayer] = useState({
    nome: "",
    cognome: "",
    sesso: "Maschio",
    percorso: "Goth",
    orientamento_sessuale: "Etero",
    strumento: "",
    band: "",
    avatar: "",
    statistiche: { status: 0, carisma: 0, intelligenza: 0, resistenza: 0 },
    famiglia: {}
  });

  useEffect(() => {
    setPlayer(prev => ({
      ...prev,
      avatar: avatars[prev.percorso][prev.sesso],
      famiglia: families[prev.percorso][prev.sesso],
      statistiche: stats[prev.percorso][prev.sesso]
    }));
  }, [player.sesso, player.percorso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer(prev => ({ ...prev, [name]: value }));
  };

  const handleBandName = () => {
    const defaultBand = bandNames[player.percorso][Math.floor(Math.random() * bandNames[player.percorso].length)];
    setPlayer(prev => ({ ...prev, band: defaultBand }));
  };

  const nextStep = () => {
    if (step < 7) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    localStorage.setItem("urban_legacy_player", JSON.stringify(player));
    window.location.href = "/game";
  };

  return (
    <div className="character-creation container">
      <div className="row">
        <div className="col-md-4 sidebar">
          <h3>{translations[lingua]?.titolo}</h3>
          <p>{player.nome} {player.cognome}</p>
          <img src={`/assets/${player.avatar}`} alt="Avatar" className="img-fluid"/>
          <p>{translations[lingua]?.status}: {player.statistiche.status} ⭐</p>
          <label>{translations[lingua]?.lingua}:</label>
          <select onChange={(e) => setLingua(e.target.value)} className="form-control">
            <option value="it">Italiano</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="col-md-8 main-panel">
          {step === 1 && (
            <div>
              <h2>{translations[lingua]?.nome} & {translations[lingua]?.cognome}</h2>
              <input type="text" name="nome" placeholder={translations[lingua]?.nome} className="form-control" onChange={handleChange} value={player.nome} />
              <input type="text" name="cognome" placeholder={translations[lingua]?.cognome} className="form-control" onChange={handleChange} value={player.cognome} />
              <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>{translations[lingua]?.sesso} & {translations[lingua]?.percorso}</h2>
              <select name="sesso" onChange={handleChange} className="form-control" value={player.sesso}>
                <option value="Maschio">Maschio</option>
                <option value="Femmina">Femmina</option>
              </select>
              <select name="percorso" onChange={handleChange} className="form-control" value={player.percorso}>
                <option value="Goth">Goth</option>
                <option value="Tabboz">Tabboz</option>
                <option value="Metallaro">Metallaro</option>
                <option value="Nerd">Nerd</option>
              </select>
              <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
              <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>{translations[lingua]?.orientamento_sessuale}</h2>
              <select name="orientamento_sessuale" onChange={handleChange} className="form-control" value={player.orientamento_sessuale}>
                <option value="Etero">Eterosessuale</option>
                <option value="Bisessuale">Bisessuale</option>
                <option value="Omosessuale">Omosessuale</option>
              </select>
              <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
              <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
            </div>
          )}

          {step === 4 && player.percorso !== "Nerd" && (
            <div>
              <h2>{translations[lingua]?.strumento_musicale}</h2>
              <select name="strumento" onChange={handleChange} className="form-control" value={player.strumento}>
                {instruments[player.percorso][player.sesso].map(instr => (
                  <option key={instr} value={instr}>{instr}</option>
                ))}
              </select>
              <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
              <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
            </div>
          )}

          {step === 5 && player.percorso !== "Nerd" && (
            <div>
              <h2>{translations[lingua]?.band_name}</h2>
              <input type="text" name="band" placeholder={translations[lingua]?.band_name} className="form-control" onChange={handleChange} value={player.band} />
              <button onClick={handleBandName} className="btn btn-info">Genera Nome</button>
              <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
              <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2>{translations[lingua]?.conferma}</h2>
              <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
              <button onClick={handleConfirm} className="btn btn-success">{translations[lingua]?.conferma}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
