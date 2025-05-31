import Option from './Option';

function Question({ question, dispatch, userAnswer }) {
  const options = [...question.incorrectAnswers, question.correctAnswer];
  //   options.push(question.incorrectAnswers, question.correctAnswer);

  return (
    <div className="question">
      <h3 style={{ marginBottom: '3rem' }}>{question.question}</h3>

      <div className="options">
        {options.map((option) => (
          <Option
            option={option}
            key={option}
            dispatch={dispatch}
            isCorrect={option === question.correctAnswer}
            userAnswer={userAnswer}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
