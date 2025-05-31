import { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Question from './components/Question';
import Navigation from './components/Navigation';
import ProgressBar from './components/ProgressBar';

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
      case 'start':
        return { ...state, status: 'start' };
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
  };

  const [{ status, questions, curQuestion, userAnswer, points }, dispatch] =
    useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getQuestions() {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://the-trivia-api.com/api/questions?limit=${5}&categories=${'science'}&difficulties=${'hard'}`
          );
          const data = await response.json();
          dispatch({ type: 'dataReceived', payload: data });
          console.log(data);
        } catch {
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
        <ProgressBar questions={questions} curQuestion={curQuestion} />
        {status === 'load' && <Start dispatch={dispatch} />}
        {status === 'start' && isLoading && <Loader />}
        {status === 'dataReceived' && (
          <>
            <Quiz>
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
        {status === 'end' && <p>End of Quiz</p>}
      </main>
      <Footer />
    </>
  );
}

export default App;
