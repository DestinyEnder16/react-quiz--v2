import Button from './Button';

function FinishScreen({ points, totalPoints, dispatch }) {
  return (
    <section className="finish">
      <h4 className="results">
        You scored <b>{points}</b> points out of a possible <b>{totalPoints}</b>{' '}
        points.
      </h4>

      <Button onClick={() => dispatch({ type: 'reset' })}>Restart Quiz</Button>
    </section>
  );
}

export default FinishScreen;
