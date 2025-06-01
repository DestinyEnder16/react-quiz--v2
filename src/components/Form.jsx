import { useState } from 'react';
import Button from './Button';

const rand = `https://the-trivia-api.com/api/questions?limit=${3}&categories=${'science'}&difficulties=${'hard'}`;

function Form({ dispatch }) {
  const [limit, setLimit] = useState(1);
  const [category, setCategory] = useState('science');
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <form>
      <div className="field">
        <label>Number of Questions:</label>
        <input
          type="number"
          min={1}
          max={30}
          required
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Categories:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={'science'}>Science</option>
          <option value={'history'}>History</option>
          <option value={'music'}>Music</option>
          <option value={'geography'}>Geography</option>
          <option value={'sport_and_leisure'}>Sports and leisure</option>
          <option value={'general_knowledge'}>General Knowledge</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => e.target.value}
          id="difficulty"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: 'start', payload: { limit, category, difficulty } });
        }}
      >
        Submit
      </Button>
    </form>
  );
}

export default Form;
