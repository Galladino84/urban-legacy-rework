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
    sesso: "",
    percorso: "Goth",
    orientamento_sessuale: "Etero",
    strumento: "",
    band: "",
    avatar: "",
    statistiche: { status: 0, carisma: 0, intelligenza: 0, resistenza: 0, maestria_musicale: 0 },
    famiglia: {}
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setPlayer(prev => ({
      ...prev,
      avatar: prev.sesso && prev.percorso ? avatars[prev.percorso][prev.sesso] : "",
      famiglia: prev.sesso && prev.percorso ? families[prev.percorso][prev.sesso] : {},
      statistiche: prev.sesso && prev.percorso
        ? {
            ...stats[prev.percorso][prev.sesso],
            maestria_musicale: prev.strumento ? stats[prev.percorso][prev.sesso].maestria_musicale[prev.strumento] || 0 : 0
          }
        : { status: 0, carisma: 0, intelligenza: 0, resistenza: 0, maestria_musicale: 0 }
    }));
  }, [player.sesso, player.percorso, player.strumento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));  // Reset error on change
  };

  const handleBandName = () => {
    const defaultBand = bandNames[player.percorso][Math.floor(Math.random() * bandNames[player.percorso].length)];
    setPlayer(prev => ({ ...prev, band: defaultBand }));
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step < 7) setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    localStorage.setItem("urban_legacy_player", JSON.stringify(player));
    window.location.href = "/game";
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!player.nome) newErrors.nome = translations[lingua]?.campo_obbligatorio;
        if (!player.cognome) newErrors.cognome = translations[lingua]?.campo_obbligatorio;
        break;
      case 2:
        if (!player.sesso) newErrors.sesso = translations[lingua]?.campo_obbligatorio;
        if (!player.percorso) newErrors.percorso = translations[lingua]?.campo_obbligatorio;
        break;
      case 3:
        if (!player.orientamento_sessuale) newErrors.orientamento_sessuale = translations[lingua]?.campo_obbligatorio;
        break;
      case 4:
        if (player.percorso !== "Nerd" && !player.strumento) newErrors.strumento = translations[lingua]?.campo_obbligatorio;
        break;
      case 5:
        if (player.percorso !== "Nerd" && !player.band) newErrors.band = translations[lingua]?.campo_obbligatorio;
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Se ci sono errori, non passare al passo successivo
  };

  return (
    <div className="character-creation">
      <div className="sidebar">
        <h3>{translations[lingua]?.titolo}</h3>
        <p>{player.nome} {player.cognome}</p>
        <img src={`src/assets/avatars/${player.avatar}`} alt="Avatar" className="img-fluid"/>
        <p>{translations[lingua]?.status}: {player.statistiche.status} ⭐</p>
        <label>{translations[lingua]?.lingua}:</label>
        <select onChange={(e) => setLingua(e.target.value)} className="form-control">
          <option value="it">Italiano</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="main-panel">
        <div className="preview-section">
          <h3>{translations[lingua]?.percorso}</h3>
          <p>{translations[lingua]?.percorso_placeholder}: {player.percorso}</p>
          <p>{translations[lingua]?.sesso}: {player.sesso}</p>
          <img src={`src/assets/avatars/${player.avatar}`} alt="Avatar Preview" className="avatar-preview" />
        </div>

        {step === 1 && (
          <div>
            <h2>{translations[lingua]?.nome} & {translations[lingua]?.cognome}</h2>
            <input
              type="text"
              name="nome"
              placeholder={translations[lingua]?.nome}
              className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
              onChange={handleChange}
              value={player.nome}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
            <input
              type="text"
              name="cognome"
              placeholder={translations[lingua]?.cognome}
              className={`form-control ${errors.cognome ? 'is-invalid' : ''}`}
              onChange={handleChange}
              value={player.cognome}
            />
            {errors.cognome && <div className="invalid-feedback">{errors.cognome}</div>}
            <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>{translations[lingua]?.sesso} & {translations[lingua]?.percorso}</h2>
            <select
              name="sesso"
              onChange={handleChange}
              className={`form-control ${errors.sesso ? 'is-invalid' : ''}`}
              value={player.sesso}
            >
              <option value="">{translations[lingua]?.sesso_placeholder}</option>
              <option value="Maschio">Maschio</option>
              <option value="Femmina">Femmina</option>
            </select>
            {errors.sesso && <div className="invalid-feedback">{errors.sesso}</div>}
            <select
              name="percorso"
              onChange={handleChange}
              className={`form-control ${errors.percorso ? 'is-invalid' : ''}`}
              value={player.percorso}
            >
              <option value="">{translations[lingua]?.percorso_placeholder}</option>
              <option value="Goth">Goth</option>
              <option value="Tabboz">Tabboz</option>
              <option value="Metallaro">Metallaro</option>
              <option value="Nerd">Nerd</option>
            </select>
            {errors.percorso && <div className="invalid-feedback">{errors.percorso}</div>}
            <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
            <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>{translations[lingua]?.orientamento_sessuale}</h2>
            <select
              name="orientamento_sessuale"
              onChange={handleChange}
              className={`form-control ${errors.orientamento_sessuale ? 'is-invalid' : ''}`}
              value={player.orientamento_sessuale}
            >
              <option value="">{translations[lingua]?.orientamento_placeholder}</option>
              <option value="Etero">Eterosessuale</option>
              <option value="Bisessuale">Bisessuale</option>
              <option value="Omosessuale">Omosessuale</option>
            </select>
            {errors.orientamento_sessuale && <div className="invalid-feedback">{errors.orientamento_sessuale}</div>}
            <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
            <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
          </div>
        )}

        {step === 4 && player.percorso !== "Nerd" && (
          <div>
            <h2>{translations[lingua]?.strumento_musicale}</h2>
            <select
              name="strumento"
              onChange={handleChange}
              className={`form-control ${errors.strumento ? 'is-invalid' : ''}`}
              value={player.strumento}
            >
              <option value="">{translations[lingua]?.strumento_placeholder}</option>
              {instruments[player.percorso][player.sesso].map(instr => (
                <option key={instr} value={instr}>{instr}</option>
              ))}
            </select>
            {errors.strumento && <div className="invalid-feedback">{errors.strumento}</div>}
            <button onClick={prevStep} className="btn btn-secondary">{translations[lingua]?.indietro}</button>
            <button onClick={nextStep} className="btn btn-primary">{translations[lingua]?.avanti}</button>
          </div>
        )}

        {step === 5 && player.percorso !== "Nerd" && (
          <div>
            <h2>{translations[lingua]?.band_name}</h2>
            <input
              type="text"
              name="band"
              placeholder={translations[lingua]?.band_name}
              className={`form-control ${errors.band ? 'is-invalid' : ''}`}
              onChange={handleChange}
              value={player.band}
            />
            {errors.band && <div className="invalid-feedback">{errors.band}</div>}
            <button onClick={handleBandName} className="btn btn-info">{translations[lingua]?.genera_nome}</button>
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
  );
};

export default CharacterCreation;
