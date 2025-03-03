import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterCreation from "./components/CharacterCreation";
import GameScreen from "./components/GameScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterCreation />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
