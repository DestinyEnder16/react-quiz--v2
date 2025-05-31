import Button from './Button';

function FinishScreen({ points, totalPoints, dispatch }) {
  return (
    <section className="finish">
      <h4 className="results">
        You scored {points} points out of a possible {totalPoints} points.
      </h4>

      <Button onClick={() => dispatch({ type: 'reset' })}>Restart Quiz</Button>
    </section>
  );
}

export default FinishScreen;
