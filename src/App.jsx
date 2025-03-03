import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CharacterCreation from "./components/CharacterCreation";
import GameUi from "./components/GameUi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterCreation />} />
        <Route path="/game" element={<GameUi />} />
      </Routes>
    </Router>
  );
}

export default App;
