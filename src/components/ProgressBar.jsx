function ProgressBar({ questions, curQuestion }) {
  const length = questions.length;
  if (curQuestion === null) return;
  return (
    <div className="progress-bar">
      <progress max={length} value={curQuestion + 1} />
      <span className="points">
        {curQuestion + 1}/{length}
      </span>
    </div>
  );
}

export default ProgressBar;
