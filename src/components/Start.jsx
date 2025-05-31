function Start({ dispatch }) {
  return (
    <aside className="intro">
      <p>
        Test your knowledge in different fields by answering some questions!
      </p>

      <button className="btn" onClick={() => dispatch({ type: 'start' })}>
        Start the Quiz!
      </button>
    </aside>
  );
}

export default Start;
