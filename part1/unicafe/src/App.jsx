import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

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
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={getAll()} />
            <StatisticLine text="average" value={getAverage()} />
            <StatisticLine text="positive" value={getPositivePercent()} />
          </tbody>
        </table>
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => setGood(good + 1)}>good</Button>
      <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onClick={() => setBad(bad + 1)}>bad</Button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
