function Option({ option, dispatch, isCorrect, userAnswer }) {
  return (
    <button
      key={option}
      className={`btn btn-option ${
        userAnswer && (isCorrect ? 'correct' : 'wrong')
      }`}
      onClick={() => dispatch({ type: 'submitAnswer', payload: option })}
      disabled={userAnswer ? true : false}
    >
      {option}
    </button>
  );
}

export default Option;
