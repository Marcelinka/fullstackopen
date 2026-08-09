const Total = ({ parts }) => {
  const getExercisesSum = () =>
    parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <b>total of {getExercisesSum()} exercises</b>
    </p>
  );
};

export default Total;
