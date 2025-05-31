import { useState } from 'react';
import Button from './Button';

const rand = `https://the-trivia-api.com/api/questions?limit=${3}&categories=${'science'}&difficulties=${'hard'}`;

function Form({ dispatch }) {
  const [limit, setLimit] = useState(1);
  const [category, setCategory] = useState('science');
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="field">
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
        <label>Categories</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={'science'}>Science</option>
          <option value={'mathematics'}>Mathematics</option>
        </select>
      </div>
      <div className="field">
        <select value={difficulty} onChange={(e) => e.target.value}>
          <option value="easy">Easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
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
