import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faBoltLightning,
  faBrain,
  faComment,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <div className="main-contaienr">
        <Results/>
        <Summary/>
      </div>
    </div>
  );
}

export default App;

export const Results = () => {
  return (
    <div className="results-container">
      <h5>your result</h5>
      <div>
        <h1>76</h1>
        <p>of 100</p>
      </div>
      <h3>Great</h3>
      <p>lorem sati hale fhns ifodhsa nfdksjlahf fhdsuf s fndsk hfdso fhs</p>
    </div>
  );
};

export const Summary = () => {
  return (
    <div className="summary-container">
      <h4></h4>
      <div>
        <div class="score-rows">
          <FontAwesomeIcon style={{ color: "red" }} icon={faBoltLightning} />
        </div>
        <div class="score-rows">
          <FontAwesomeIcon style={{ color: "yellow" }} icon={faBrain} />
        </div>
        <div class="score-rows">
          <FontAwesomeIcon style={{ color: "green" }} icon={faComment} />
        </div>
        <div class="score-rows">
          <FontAwesomeIcon style={{ color: "blue" }} icon={faEye} />
        </div>
      </div>
      <button>Get Random Score</button>
      <button>Continue</button>
    </div>
  );
};
