import { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Question from './components/Question';
import Navigation from './components/Navigation';
import ProgressBar from './components/ProgressBar';
import FinishScreen from './components/FinishScreen';
import Form from './components/Form';

function App() {
  function reducer(state, action) {
    switch (action.type) {
      case 'dataReceived':
        return {
          ...state,
          status: 'dataReceived',
          questions: action.payload,
          curQuestion: 0,
        };
      case 'init':
        return { ...state, status: 'init' };
      case 'start':
        return {
          ...state,
          status: 'start',
          limit: action.payload.limit,
          category: action.payload.category,
          difficulty: action.payload.difficulty,
        };
      case 'next':
        if (state.curQuestion === state.questions.length - 1)
          return { ...state, status: 'end' };

        return {
          ...state,
          curQuestion: state.curQuestion + 1,
          userAnswer: null,
        };
      case 'submitAnswer':
        return {
          ...state,
          userAnswer: action.payload,
          points:
            action.option === 'correct'
              ? state.pointsPerQuestion + state.points
              : state.points,
        };
      case 'reset':
        return {
          ...state,
          status: 'load',
          curQuestion: null,
          userAnswer: null,
          points: 0,
        };

      default:
        return state;
    }
  }

  const initialState = {
    status: 'load',
    questions: [],
    curQuestion: null,
    userAnswer: null,
    points: 0,
    pointsPerQuestion: 5,
    limit: 0,
    category: '',
    difficulty: '',
  };

  const [isLoading, setIsLoading] = useState(false);

  const [
    {
      status,
      questions,
      curQuestion,
      userAnswer,
      points,
      pointsPerQuestion,
      limit,
      category,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function getQuestions() {
        try {
          setIsLoading(true);
          if (limit === 0) {
            throw new Error('No data found');
          }

          const response = await fetch(
            `https://the-trivia-api.com/api/questions?limit=${limit}&categories=${category}&difficulties=${difficulty}`
          );
          const data = await response.json();
          dispatch({ type: 'dataReceived', payload: data });
        } catch (err) {
          console.warn(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (status === 'start') {
        getQuestions();
      }
    },
    [status]
  );
  return (
    <>
      <Header />
      <main>
        {status === 'load' && <Start dispatch={dispatch} />}
        {status === 'init' && <Form dispatch={dispatch} />}
        {status === 'start' && isLoading && <Loader />}
        {status === 'dataReceived' && (
          <>
            <Quiz>
              <ProgressBar questions={questions} curQuestion={curQuestion} />
              <Question
                question={questions[curQuestion]}
                dispatch={dispatch}
                userAnswer={userAnswer}
              />
              <Navigation
                dispatch={dispatch}
                text={curQuestion < questions.length - 1 ? 'Next' : 'Finish'}
                isAble={userAnswer ? false : true}
              />
            </Quiz>
          </>
        )}
        {status === 'end' && (
          <FinishScreen
            points={points}
            totalPoints={questions.length * pointsPerQuestion}
            dispatch={dispatch}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
