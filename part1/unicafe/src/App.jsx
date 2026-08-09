import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;

  const getAverage = () => {
    const stat = good + bad * -1;
    return stat / getAll();
  };

  const getPositivePercent = () => (good / getAll()) * 100;
  const showStatistics = () => getAll() !== 0;

  return (
    <div>
      <h2>statistics</h2>

      {showStatistics() ? (
        <>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {getAll()}</div>
          <div>average {getAverage()}</div>
          <div>positive {getPositivePercent()} %</div>
        </>
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
