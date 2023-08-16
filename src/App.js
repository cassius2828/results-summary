import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faBoltLightning,
  faBrain,
  faComment,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import scores from "./peerResults.json";
import tachyons from "tachyons";

function App() {
  const [reaction, setReaction] = useState("--");
  const [memory, setMemory] = useState("--");
  const [verbal, setVerbal] = useState("--");
  const [visual, setVisual] = useState("--");
  const [avg, setAvg] = useState("--");
  const [falseAvg, setFalseAvg] = useState(0);
  const [competition, setCompetition] = useState(" --");

  // button click restriction state
  const [toggleScore, setToggleScore] = useState(false);
  const [toggleResults, setToggleResults] = useState(true);

  // global var

  useEffect(() => {
    setFalseAvg((reaction + memory + verbal + visual) / 4);
  });

  // button funcitons
  const randomScore = () => {
    setReaction(Math.floor(Math.random() * (100 - 40) + 40));
    setMemory(Math.floor(Math.random() * (100 - 40) + 40));
    setVerbal(Math.floor(Math.random() * (100 - 40) + 40));
    setVisual(Math.floor(Math.random() * (100 - 40) + 40));
    setToggleScore(true);
    setToggleResults(false);
  };

  const getResults = () => {
    // for the percentage of the class you did better than
    setFalseAvg((reaction + memory + verbal + visual) / 4);
    let shallowScores = scores.map((item) => item.score);
    shallowScores.push(falseAvg);
    shallowScores.sort((a, b) => a - b);
    let indexOfScore = shallowScores.indexOf(falseAvg) + 1;
    setCompetition(Math.floor((indexOfScore / 34) * 100));

    // to display the correct avg you got
    setAvg((reaction + memory + verbal + visual) / 4 + "%");
    setToggleScore(false);
    setToggleResults(true);
  };

  return (
    <div className="main-container">
      <Results
        avg={avg}
        competition={competition}
        falseAvg={falseAvg}
        toggleResults={toggleResults}
      />
      <Summary
        reaction={reaction}
        memory={memory}
        verbal={verbal}
        visual={visual}
        handleScore={randomScore}
        handleResults={getResults}
        toggleResults={toggleResults}
        toggleScore={toggleScore}
      />
    </div>
  );
}

export default App;

export const Results = ({ avg, competition, msg, falseAvg, toggleResults }) => {
  if (falseAvg < 60) {
    msg = `Better Luck Next Time`;
  } else if (falseAvg >= 60 && falseAvg < 70) {
    msg = `You're Getting There`;
  } else if (falseAvg >= 70 && falseAvg < 80) {
    msg = "Good Job!";
  } else if (falseAvg >= 80 && falseAvg < 90) {
    msg = "Great Job!";
  } else if (falseAvg >= 90 && falseAvg < 100) {
    msg = `You Ace'd It!!`;
  } else if (falseAvg === 100) {
    msg = "You are Not Human! O_o";
  } else {
    msg = "--";
  }

  return (
    <div className="results-container">
      <div>
        <h5>Your Results</h5>
        <div>
          <div className="score-container">
            <h1>{toggleResults ? avg : '--'}</h1>
            <p>of 100</p>
          </div>
        </div>
        <h3>
          {toggleResults ? msg : "--"}
          {/* {avg < 60
            ? "Better Luck Next Time"
            : avg >= 60 || avg < 70
            ? `You're Getting There`
            : avg >= 70 || avg < 80
            ? `Good Job!`
            : avg >= 80 || avg < 90
            ? `Great Job!`
            : avg >= 90 || avg < 100
            ? `You Ace'd it!`
            : avg === 100
            ? `You are Not Human! O_o`
            : `--`} */}
        </h3>
        
        <p className="description">
          You scored higher than {toggleResults ? competition : "--"} % of the
          people who have taken these tests.
        </p>
      </div>
    </div>
  );
};

export const Summary = ({
  reaction,
  memory,
  verbal,
  visual,
  handleScore,
  handleResults,
  toggleScore,
  toggleResults,
}) => {
  return (
    <div className="summary-container">
      <h4>Summary</h4>
      <div className="row-container">
        {/* row 1 */}
        <div class="score-rows red">
          <div>
            <FontAwesomeIcon icon={faBoltLightning} />
            <span> Reaction </span>
          </div>
          <div>
            <span className="b">{reaction}</span> /100
          </div>
        </div>
        {/* row 2 */}
        <div className="score-rows custom-yellow">
          <div>
            <FontAwesomeIcon icon={faBrain} />
            <span> Memory </span>
          </div>
          <div>
            <span className="b">{memory}</span> /100
          </div>
        </div>
        {/* row 3 */}
        <div class="score-rows green">
          <div>
            <FontAwesomeIcon icon={faComment} />
            <span> Verbal </span>
          </div>
          <div>
            <span className="b">{verbal}</span> /100
          </div>
        </div>
        {/* row 4 */}
        <div class="score-rows blue">
          <div>
            <FontAwesomeIcon icon={faEye} />
            <span> Visual </span>
          </div>
          <div>
            <span className="b">{visual}</span> /100
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="btn-container">
        <div className="indy-btns">
          {toggleScore === true ? (
            <button style={{ opacity: ".5" }} className="br-pill">
              Get Random Score
            </button>
          ) : (
            <button onClick={handleScore} className="br-pill">
              Get Random Score
            </button>
          )}
        </div>

        <div className="indy-btns">
          {toggleResults === true ? (
            <button style={{ opacity: ".5" }} className="br-pill">
              Continue
            </button>
          ) : (
            <button onClick={handleResults} className="br-pill">
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
